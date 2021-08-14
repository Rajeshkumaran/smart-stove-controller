import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CircleSlider } from 'react-circle-slider';

import Tab from '../../components/Tab';

import StoveButtons from '../../components/StoveButtons';
import Timer from '../../components/Timer';
import TimerConfigModal from '../../components/TimerConfigModal';

import { primary, primary_bg, white, slider_bg } from '../../constants';
import { selectHomePageState } from '../../selectors';

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
  }
`;

const HeatText = styled('span')`
  position: relative;
  right: -80px;
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
      heatSlider: 30,
      heatLevel: 5,
      showTimerConfig: false,
      timers: {
        stove1: {
          initialTimerState: 600,
          pause: true,
          stop: false,
        },
        stove2: {
          initialTimerState: 600,
          pause: true,
          stop: false,
        },
        stove3: {
          initialTimerState: 600,
          pause: true,
          stop: false,
        },
        stove4: {
          initialTimerState: 600,
          pause: true,
          stop: false,
        },
      },
    };
  }

  onSelectTab = (selectedIndex) =>
    this.setState({
      activeTabIndex: selectedIndex,
    });

  onPauseOrPlay = () => {
    const { activeStoveIndex } = this.props;
    const { timers } = this.state;

    const stoveTimerConfig = timers[`stove${activeStoveIndex + 1}`];
    this.setState((oldState) => ({
      timers: {
        ...oldState.timers,
        [`stove${activeStoveIndex + 1}`]: {
          ...stoveTimerConfig,
          pause: !stoveTimerConfig.pause,
          stop: false,
        },
      },
    }));
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
    const { activeTabIndex, heatSlider, heatLevel, timers } = this.state;
    const { activeStoveIndex, onStoveSelect, onEditStoveConfig } = this.props;

    switch (activeTabIndex) {
      case 1: {
        const stoveTimerConfig = timers[`stove${activeStoveIndex + 1}`];

        return (
          <>
            <Timer
              key={`stove${activeStoveIndex}+1-${stoveTimerConfig.initialTimerState}`}
              initialTimerState={stoveTimerConfig.initialTimerState}
              pause={stoveTimerConfig.pause}
              stop={stoveTimerConfig.stop}
              onPauseOrPlay={this.onPauseOrPlay}
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
              <HeatText>{heatLevel}</HeatText>
              <CircleSlider
                value={heatSlider}
                stepSize={26}
                onChange={(value) => {
                  console.log('value', value);
                  this.setState({
                    heatSlider: value,
                  });
                }}
                circleWidth={20}
                progressWidth={20}
                knobRadius={10}
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
