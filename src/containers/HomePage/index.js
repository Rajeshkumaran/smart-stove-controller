import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CircleSlider } from 'react-circle-slider';

import Tab from '../../components/Tab';

import { selectHomePageState } from '../../selectors';
import { primary, primary_bg, white, slider_bg } from '../../constants';
import StoveButtons from '../../components/StoveButtons';

const Container = styled('div')`
  width: 100%;
`;
const SliderWrapper = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px 0;
  height: 320px;
  > svg {
    position: relative;
    left: -21px;
  }
`;

const HeatText = styled('span')`
  position: relative;
  right: -97px;
  font-size: 18px;
  font-weight: bold;
  padding: 5px;
`;
const StoveConfigEdit = styled('button')`
  box-shadow: 3px 2px 4px #e9e9e9;
  padding: 12px;
`;

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: 0,
      heatSlider: 30,
    };
  }

  onSelectTab = (selectedIndex) =>
    this.setState({
      activeTabIndex: selectedIndex,
    });

  render() {
    const { activeTabIndex, heatSlider } = this.state;
    const { activeStoveIndex, onStoveSelect, onEditStoveConfig } = this.props;
    return (
      <Container>
        <Tab activeTab={activeTabIndex} onSelectTab={this.onSelectTab} />
        <>
          <SliderWrapper>
            <HeatText>HEAT</HeatText>
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
          <div
            className={css`
              display: flex;
              width: 100%;
              justify-content: center;
            `}
          >
            <StoveConfigEdit onClick={onEditStoveConfig}>SET CONFIG</StoveConfigEdit>
          </div>

          <StoveButtons
            activeStoveIndex={activeStoveIndex}
            onClick={({ stoveRowIndex, stoveIndex }) => {
              onStoveSelect(2 * stoveRowIndex + stoveIndex);
            }}
          />
        </>
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
