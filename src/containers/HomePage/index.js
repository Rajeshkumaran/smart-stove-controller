import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CircleSlider } from 'react-circle-slider';

import Tab from '../../components/Tab';

import StoveButtons from '../../components/StoveButtons';
import Timer from '../../components/Timer';
import TimerConfigModal from '../../components/TimerConfigModal';

import { primary, slider_bg } from '../../constants';
import { selectHomePageState } from '../../selectors';
import RecipePage from '../RecipePage';
import { toast } from 'react-toastify';
import axiosWrapper from '../../utils/requestWrapper';
import { get, getItemFromLocalStorage } from '../../utils/helpers';

const Container = styled('div')`
  width: 100%;
`;
const SliderWrapper = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px 0;
  height: 200px;
  > svg {
    position: relative;
    left: -21px;
    width: 220px;
    height: 220px;
  }
`;

const HeatText = styled('span')`
  position: relative;
  right: -100px;
  font-size: 18px;
  font-weight: bold;
  padding: 5px;
`;
const StoveConfigEdit = styled('button')`
  box-shadow: 3px 2px 4px #e9e9e9;
  padding: 12px;
  margin-top: 16px;
  color: ${primary};
`;

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: 0,
      showTimerConfig: false,
      timers: {
        stove1: {
          initialTimerState: 0,
          pause: true,
          stop: false,
        },
        stove2: {
          initialTimerState: 0,
          pause: true,
          stop: false,
        },
        stove3: {
          initialTimerState: 0,
          pause: true,
          stop: false,
        },
        stove4: {
          initialTimerState: 0,
          pause: true,
          stop: false,
        },
      },
    };
    this.bgTimerId = null;
  }

  onSelectTab = (selectedIndex) =>
    this.setState({
      activeTabIndex: selectedIndex,
    });

  resetTimerState = () => {
    const { activeStoveIndex } = this.props;
    const { timers } = this.state;
    console.log('resetTimerState called');
    const stoveTimerConfig = timers[`stove${activeStoveIndex + 1}`];
    this.setState((oldState) => ({
      timers: {
        ...oldState.timers,
        [`stove${activeStoveIndex + 1}`]: {
          ...stoveTimerConfig,
          pause: true,
          stop: false,
        },
      },
    }));
  };
  onPauseOrPlay = () => {
    const { activeStoveIndex } = this.props;
    const { timers } = this.state;

    const stoveTimerConfig = timers[`stove${activeStoveIndex + 1}`];
    if (stoveTimerConfig.initialTimerState === 0) {
      return;
    }

    const stoveConfigs = getItemFromLocalStorage('stoves');
    const stoveConfig = stoveConfigs[`stove${activeStoveIndex + 1}`];
    const { key: apiKey } = stoveConfig || {};

    if (!apiKey) {
      toast.dark('Please calibrate and start timer');
      return;
    }

    this.setState(
      (oldState) => ({
        timers: {
          ...oldState.timers,
          [`stove${activeStoveIndex + 1}`]: {
            ...stoveTimerConfig,
            pause: !stoveTimerConfig.pause,
            stop: false,
          },
        },
      }),
      () => this.fetchStoveAngleInBackground(activeStoveIndex + 1),
    );
  };

  onStop = () => {
    const { activeStoveIndex } = this.props;
    const { timers } = this.state;
    const stoveTimerConfig = timers[`stove${activeStoveIndex + 1}`];
    this.setState((oldState) => ({
      timers: {
        ...oldState.timers,
        [`stove${activeStoveIndex + 1}`]: { ...stoveTimerConfig, stop: true, pause: true },
      },
    }));
    this.stopBGTimer();
  };

  editTimerConfig = () => {
    this.setState({
      showTimerConfig: true,
    });
  };

  onSaveTimerConfig = (minutes, seconds) => {
    const { activeStoveIndex } = this.props;
    const { timers } = this.state;
    const stoveTimerConfig = timers[`stove${activeStoveIndex + 1}`];
    this.setState((oldState) => ({
      timers: {
        ...oldState.timers,
        [`stove${activeStoveIndex + 1}`]: {
          ...stoveTimerConfig,
          initialTimerState: Number(minutes) * 60 + Number(seconds),
        },
      },
    }));
  };

  renderTabContent = () => {
    const { activeTabIndex, timers } = this.state;
    const { activeStoveIndex, onStoveSelect, onEditStoveConfig, currentHeatLevel, maxHeatLevel } =
      this.props;

    switch (activeTabIndex) {
      case 1: {
        const stoveTimerConfig = timers[`stove${activeStoveIndex + 1}`];
        console.log('stoveTimerConfig', timers, stoveTimerConfig);
        return (
          <>
            <Timer
              key={`stove${activeStoveIndex}+1-${stoveTimerConfig.initialTimerState}`}
              initialTimerState={stoveTimerConfig.initialTimerState}
              pause={stoveTimerConfig.pause}
              stop={stoveTimerConfig.stop}
              onPauseOrPlay={this.onPauseOrPlay}
              resetTimerState={this.resetTimerState}
              onStop={this.onStop}
              editTimerConfig={this.editTimerConfig}
            />
            <StoveButtons
              activeStoveIndex={activeStoveIndex}
              onClick={({ stoveRowIndex, stoveIndex }) => {
                onStoveSelect(2 * stoveRowIndex + stoveIndex);
              }}
            />
          </>
        );
      }
      case 2:
        return <RecipePage onItemSelect={this.goToTimerPageWhenRecipeSelected} />;
      case 0:
      default: {
        return (
          <>
            <div
              className={css`
                display: flex;
                width: 100%;
                justify-content: center;
              `}
            >
              <StoveConfigEdit onClick={onEditStoveConfig}>EDIT CONFIG</StoveConfigEdit>
            </div>
            <SliderWrapper>
              <HeatText>{currentHeatLevel || 0}</HeatText>
              <CircleSlider
                key={`slider-${currentHeatLevel}`}
                min={0}
                max={maxHeatLevel}
                value={currentHeatLevel}
                stepSize={1}
                circleWidth={20}
                progressWidth={20}
                knobRadius={20}
                circleColor={slider_bg}
                progressColor={primary}
                disabled
              />
            </SliderWrapper>

            <StoveButtons
              activeStoveIndex={activeStoveIndex}
              onClick={({ stoveRowIndex, stoveIndex }) => {
                onStoveSelect(2 * stoveRowIndex + stoveIndex);
              }}
            />
          </>
        );
      }
    }
  };

  goToTimerPageWhenRecipeSelected = (timerState) => {
    this.onSelectTab(1);
    const { activeStoveIndex } = this.props;
    console.log('timerState', timerState, activeStoveIndex);

    this.setState({
      timers: {
        ...this.state.timers,
        [`stove${activeStoveIndex + 1}`]: {
          ...this.state.timers[`stove${activeStoveIndex + 1}`],
          initialTimerState: timerState,
        },
      },
    });
  };

  fetchStoveAngleInBackground = (stoveIndex) => {
    const stoveConfigs = getItemFromLocalStorage('stoves');
    const stoveConfig = stoveConfigs[`stove${stoveIndex}`];
    const { key: apiKey } = stoveConfig || {};
    const { timers } = this.state;
    if (timers[`stove${stoveIndex}`].pause) {
      this.stopBGTimer();
      return;
    }

    // start timer
    this.bgTimerId = setInterval(async () => {
      try {
        const response = await axiosWrapper({
          url: `https://api.thingspeak.com/channels/1309022/fields/${stoveIndex}.json?api_key=${apiKey}&results=`,
        });
        const { timers } = this.state;

        if (timers[`stove${stoveIndex}`].pause) {
          this.stopBGTimer();
          return;
        }
        const parseResponse = get(response, 'data');
        const feeds = get(parseResponse, 'feeds', []);
        const feedsLength = feeds.length;
        const angle = get(feeds[feedsLength - 1], 'field1', 0);
        if (angle == 0) {
          // when angle reaches 0 stop timer
          this.onStop();
        }
      } catch (err) {
        console.error('Error in fetchStoveAngleInBackground', err);
      }
    }, 5000);
  };

  stopBGTimer = () => {
    if (this.bgTimerId) clearInterval(this.bgTimerId);
    this.bgTimerId = null;
  };

  render() {
    const { activeTabIndex, showTimerConfig } = this.state;
    return (
      <Container>
        {this.renderTabContent()}
        <Tab activeTab={activeTabIndex} onSelectTab={this.onSelectTab} />
        <TimerConfigModal
          show={showTimerConfig}
          onSave={this.onSaveTimerConfig}
          onCancel={() =>
            this.setState({
              showTimerConfig: false,
            })
          }
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    homePage: selectHomePageState(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};
HomePage.propTypes = {
  route: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
