import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CircleSlider } from 'react-circle-slider';

import Tab from '../../components/Tab';

import StoveButtons from '../../components/StoveButtons';
import Timer from '../../components/Timer';

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
    };
  }

  onSelectTab = (selectedIndex) =>
    this.setState({
      activeTabIndex: selectedIndex,
    });

  renderTabContent = () => {
    const { activeTabIndex, heatSlider, heatLevel } = this.state;
    const { activeStoveIndex, onStoveSelect, onEditStoveConfig } = this.props;

    switch (activeTabIndex) {
      case 1: {
        return <Timer initialTimerState={600} />;
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
              <StoveConfigEdit onClick={onEditStoveConfig}>SET CONFIG</StoveConfigEdit>
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
    const { activeTabIndex } = this.state;
    return (
      <Container>
        {this.renderTabContent()}
        <Tab activeTab={activeTabIndex} onSelectTab={this.onSelectTab} />
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
