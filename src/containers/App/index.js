import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

import BackIcon from '../../images/back.png';

import HomePage from '../HomePage';
import StoveConfigPage from '../StoveConfigPage';

import { primary, primary_bg } from '../../constants';

import '../../../globalStyles';
import Loader from '../../components/Loader';
import { get, setItemInLocalStorage, getItemFromLocalStorage } from '../../utils/helpers';
import axiosWrapper from '../../utils/requestWrapper';

const Wrap = styled('div')`
  background: ${primary_bg};
  height: 100vh;
  position: relative;
`;
const AppName = styled('div')`
  color: ${primary};
  text-align: center;
  font-size: 16px;
  padding: 16px;
  font-family: Montserrat;
`;
const BackArrow = styled('span')`
  position: absolute;
  left: 20px;
  top: 20px;
  width: 16px;
  height: 16px;
`;
const PAGES = {
  STOVE_INFO: 'STOVE_INFO',
  STOVE_CONFIG: 'STOVE_CONFIG',
};
if (typeof window !== 'undefined') {
  injectStyle();
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: PAGES.STOVE_INFO,
      activeStoveIndex: 0,
      showBackArrow: false,
      stoveConfigs: {},
      showLoader: true,
      stoveKeyInput: '',
      bgProcessStates: {
        stove1: {
          processRunning: false,
          processId: null,
        },
        stove2: {
          processRunning: false,
          processId: null,
        },
        stove3: {
          processRunning: false,
          processId: null,
        },
        stove4: {
          processRunning: false,
          processId: null,
        },
      },
    };
  }

  initConfigs = () => {
    const configs = getItemFromLocalStorage('stoves');
    console.log('stoves', configs);

    const stoveConfigs = {
      ...(configs
        ? { ...configs }
        : {
            stove1: {
              no_of_heat_levels: 7,
              angles: {
                1: '',
                2: '',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '',
              },
            },
            stove2: {
              no_of_heat_levels: 7,
              angles: {
                1: '',
                2: '',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '',
              },
            },
            stove3: {
              no_of_heat_levels: 7,
              angles: {
                1: '',
                2: '',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '',
              },
            },
            stove4: {
              no_of_heat_levels: 7,
              angles: {
                1: '',
                2: '',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '',
              },
            },
          }),
    };

    setItemInLocalStorage('stoves', stoveConfigs);
    this.setState({
      showLoader: false,
      stoveConfigs,
    });
  };

  componentDidMount() {
    this.initConfigs();
  }

  showStoveConfigPage = () => {
    this.setState({
      page: PAGES.STOVE_CONFIG,
      showBackArrow: true,
    });
  };

  updateStoveKey = (stoveKey) => {
    this.setState({
      stoveKeyInput: stoveKey,
    });
  };

  registerApiKey = () => {
    const { activeStoveIndex, stoveKeyInput } = this.state;
    const stoves = getItemFromLocalStorage('stoves');
    const newConfigs = {
      ...(stoves ? { ...stoves } : {}),
      [`stove${activeStoveIndex + 1}`]: {
        ...get(stoves, `stove${activeStoveIndex + 1}`, {}),
        key: stoveKeyInput,
      },
    };
    setItemInLocalStorage('stoves', newConfigs);
    this.notifyKeyPaired();
  };

  onCalibrate = async (heatLevel) => {
    const { activeStoveIndex } = this.state;
    console.log('onCalibrate called');
    const stoveConfigs = getItemFromLocalStorage('stoves');
    const stoveConfig = stoveConfigs[`stove${activeStoveIndex + 1}`];
    console.log('stoveConfig', stoveConfig);
    try {
      const response = await axiosWrapper({
        url: `https://api.thingspeak.com/channels/1309022/fields/${
          activeStoveIndex + 1
        }.json?api_key=${stoveConfig.key}&results=`,
      });
      const parseResponse = get(response, 'data');
      const feeds = get(parseResponse, 'feeds', []);
      const feedsLength = feeds.length;
      const angle = get(feeds[feedsLength - 1], `field${activeStoveIndex + 1}`, 0);
      this.updateStoveConfig('angles', {
        ...stoveConfig.angles,
        [heatLevel]: angle,
      });
    } catch (err) {
      console.error('Error in calibration', err);
    }
  };

  updateStoveConfig = (key, value) => {
    const { activeStoveIndex } = this.state;

    let stoveConfigs = getItemFromLocalStorage('stoves');
    let stoveConfig = stoveConfigs[`stove${activeStoveIndex + 1}`];
    stoveConfig = {
      ...stoveConfig,
      [key]: value,
    };
    stoveConfigs = {
      ...stoveConfigs,
      [`stove${activeStoveIndex + 1}`]: stoveConfig,
    };
    setItemInLocalStorage('stoves', stoveConfigs);
    this.setState({
      stoveConfigs,
    });
  };

  syncApi = async ({ stoveId, stoveIndex }) => {
    try {
      const stoveConfigs = getItemFromLocalStorage('stoves');
      const stoveConfig = stoveConfigs[stoveId];

      const response = await axiosWrapper({
        url: `https://api.thingspeak.com/channels/1309022/fields/${stoveIndex}.json?api_key=${stoveConfig.key}&results=`,
      });
      const parseResponse = get(response, 'data');
      const feeds = get(parseResponse, 'feeds', []);
      const feedsLength = feeds.length;
      const fieldName = `field${stoveIndex + 1}`;
      const angle = get(feeds[feedsLength - 1], fieldName, 0);
      console.log('stoveConfig', stoveConfig, angle);
      const { angles } = stoveConfig || {};
      let requiredHeatLevel = -1;
      Object.keys(angles).map((heatLevel) => {
        if (requiredHeatLevel === -1 && angle <= angles[heatLevel]) {
          const angle1 = Math.abs(angles[heatLevel - 1] || 0 - angle);
          const angle2 = Math.abs(angles[heatLevel] - angle);
          if (angle1 < angle2) requiredHeatLevel = heatLevel - 1;
          requiredHeatLevel = heatLevel;
        }
      });
      this.setState({
        stoveConfigs: {
          ...this.state.stoveConfigs,
          [`stove${stoveIndex}`]: {
            ...stoveConfig,
            currentHeatLevel: requiredHeatLevel,
          },
        },
      });
    } catch (err) {
      console.error('Error in calibration', err);
    }
  };
  onSyncStove = () => {
    const { activeStoveIndex, bgProcessStates } = this.state;
    const stoveConfigs = getItemFromLocalStorage('stoves');

    const stoveAngles = stoveConfigs[`stove${activeStoveIndex + 1}`].angles;

    // all the angles should be calibrated before making sync
    let allowSync = true;
    console.log('stoveAngles', stoveAngles);
    Object.keys(stoveAngles).map((heatLevel) => {
      const angle = stoveAngles[heatLevel];
      if (!angle) {
        allowSync = false;
      }
    });

    if (!bgProcessStates[`stove${activeStoveIndex + 1}.processRunning`] && allowSync) {
      const timerId = setInterval(() => {
        this.syncApi({ stoveId: `stove${activeStoveIndex + 1}`, stoveIndex: activeStoveIndex + 1 });
      }, 5000);
      this.setState({
        bgProcessStates: {
          ...this.state.bgProcessStates,
          [`stove${activeStoveIndex + 1}`]: {
            processRunning: true,
            processId: timerId,
          },
        },
      });
    }
  };

  notifyKeyPaired = async () => {
    const { activeStoveIndex } = this.state;

    const stoveConfigs = getItemFromLocalStorage('stoves');
    const stoveConfig = stoveConfigs[`stove${activeStoveIndex + 1}`];

    if (!stoveConfig.key) {
      toast.dark('Invalid API key');
      return;
    }

    try {
      await axiosWrapper({
        url: `https://api.thingspeak.com/channels/1309022/fields/${
          activeStoveIndex + 1
        }.json?api_key=${stoveConfig.key}&results=`,
      });
      toast.dark('Stove is paired');
    } catch (err) {
      toast.dark('Invalid API key');
    }
  };

  renderPages = () => {
    const { activeStoveIndex, page, stoveConfigs, stoveKeyInput } = this.state;

    const stoveConfigsFromStorage = getItemFromLocalStorage('stoves');

    const apiKey = stoveConfigsFromStorage[`stove${activeStoveIndex + 1}`].key || stoveKeyInput;
    switch (page) {
      case PAGES.STOVE_CONFIG:
        return (
          <StoveConfigPage
            stoveId={activeStoveIndex}
            stoveConfigs={stoveConfigs[`stove${activeStoveIndex + 1}`]}
            stoveKeyInput={apiKey}
            updateStoveKey={this.updateStoveKey}
            registerApiKey={this.registerApiKey}
            onCalibrate={this.onCalibrate}
            onSyncStove={this.onSyncStove}
          />
        );

      case PAGES.STOVE_INFO:
      default: {
        const { activeStoveIndex, stoveConfigs } = this.state;
        const currentSelectedStove = stoveConfigs[`stove${activeStoveIndex + 1}`] || {};
        console.log('PAGES.STOVE_INFO > stoveConfigs', stoveConfigs, currentSelectedStove);
        return (
          <HomePage
            activeStoveIndex={activeStoveIndex}
            currentHeatLevel={currentSelectedStove.currentHeatLevel}
            maxHeatLevel={currentSelectedStove.no_of_heat_levels}
            onStoveSelect={(stoveId) => this.setState({ activeStoveIndex: stoveId })}
            onEditStoveConfig={this.showStoveConfigPage}
          />
        );
      }
    }
  };
  render() {
    const { showBackArrow, showLoader } = this.state;
    return showLoader ? (
      <Loader />
    ) : (
      <Wrap>
        {showBackArrow && (
          <BackArrow
            onClick={() =>
              this.setState({
                showBackArrow: false,
                page: PAGES.STOVE_INFO,
                stoveKeyInput: '',
              })
            }
          >
            <img
              src={BackIcon}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </BackArrow>
        )}
        <AppName>Zetta</AppName>
        {this.renderPages()}
        <ToastContainer />
      </Wrap>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  route: PropTypes.object,
};
