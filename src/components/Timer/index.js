import React, { useEffect, useState, useRef } from 'react';
import { CircleSlider } from 'react-circle-slider';
import styled from 'react-emotion';

import { primary, slider_bg } from '../../constants';
import Button from '../Button';

const SliderWrapper = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px 0;
  height: 200px;
  cursor: pointer;
  > svg {
    position: relative;
    left: -28px;
  }
`;
const HeatText = styled('span')`
  position: relative;
  right: -96px;
  font-size: 18px;
  font-weight: bold;
  padding: 5px;
`;
const ConfigWrap = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Stopbutton = styled(Button)`
  margin-left: 12px;
`;
function Timer({
  initialTimerState,
  pause = false,
  stop = false,
  onPauseOrPlay = () => {},
  onStop = () => {},
  editTimerConfig,
}) {
  const timerRef = useRef();
  const currentTimerValue = useRef();
  const [timerState, setTimerState] = useState(initialTimerState);

  useEffect(() => {
    setTimerState(initialTimerState);
  }, [initialTimerState]);

  useEffect(() => {
    if (timerState - 1 === 0) {
      clearTimer();
      setTimerState(initialTimerState);
      return;
    }
    if (pause) {
      clearTimer();
    } else if (!pause) {
      // restart timer
      if (!timerRef.current.timerId) {
        timerRef.current.timerId = setInterval(() => {
          if (currentTimerValue.current && currentTimerValue.current - 1 === 0) {
            clearTimer();
            setTimerState(initialTimerState);
            return;
          }
          setTimerState((prevTimerState) => {
            currentTimerValue.current = prevTimerState - 1;
            return prevTimerState - 1;
          });
        }, 1000);
      }
    }
    if (stop) {
      clearTimer();
      setTimerState(initialTimerState);
    }
  }, [pause, stop]);

  const clearTimer = () => {
    clearInterval(timerRef.current.timerId);
    timerRef.current.timerId = null;
  };
  const addLeadingZeros = (time) => {
    if (time.toString().length < 2) return `0${time}`;
    return time;
  };

  const formatTime = () => {
    let minutes = addLeadingZeros(Math.floor(timerState / 60));
    let seconds = addLeadingZeros(timerState % 60);
    return `${minutes} : ${seconds}`;
  };

  return (
    <div ref={timerRef}>
      <SliderWrapper onClick={editTimerConfig}>
        <HeatText>{formatTime()}</HeatText>
        <CircleSlider
          min={0}
          max={initialTimerState}
          value={timerState}
          stepSize={1}
          circleWidth={20}
          progressWidth={20}
          knobRadius={10}
          circleColor={slider_bg}
          progressColor={primary}
          disabled
        />
      </SliderWrapper>
      <ConfigWrap>
        <Button onClick={onPauseOrPlay}>{pause ? 'Play' : 'Pause'}</Button>
        <Stopbutton onClick={onStop}>Stop</Stopbutton>
      </ConfigWrap>
    </div>
  );
}
export default Timer;
