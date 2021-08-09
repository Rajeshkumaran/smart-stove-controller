import React, { useEffect, useState } from 'react';
import { CircleSlider } from 'react-circle-slider';
import styled from 'react-emotion';

import { primary, slider_bg } from '../../constants';

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
  right: -105px;
  font-size: 18px;
  font-weight: bold;
  padding: 5px;
`;
function Timer({ initialTimerState }) {
  const [timerState, setTimerState] = useState(initialTimerState);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimerState((prevTimerState) => prevTimerState - 1);
    }, 1000);
  }, []);

  const addLeadingZeros = (time) => {
    if (time.toString().length < 2) return `0${time}`;
    return time;
  };
  const addTrailingZeros = (time) => {
    if (time.toString().length < 2) return `${time}0`;
    return time;
  };

  const formatTime = () => {
    let minutes = addLeadingZeros(Math.floor(timerState / 60));
    let seconds = addTrailingZeros(timerState % 60);
    return `${minutes} : ${seconds}`;
  };

  return (
    <SliderWrapper>
      <HeatText>{formatTime()}</HeatText>
      <CircleSlider
        min={0}
        max={600}
        value={timerState}
        stepSize={1}
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
  );
}
export default Timer;
