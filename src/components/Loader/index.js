import React from 'react';
import styled, { keyframes } from 'react-emotion';
import { primary } from '../../constants';
const Wrapper = styled('div')`
  text-align: center;
`;
const ellipsisAnimation1 = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;
const ellipsisAnimation2 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(19px, 0);
  }
`;
const ellipsisAnimation3 = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;
const Container = styled('div')`
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
  position: fixed;
  top: 45%;
  & div {
    position: absolute;
    top: 27px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: ${primary};
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  & div:nth-child(1) {
    left: 6px;
    animation: ${ellipsisAnimation1} 0.6s infinite;
  }
  & div:nth-child(2) {
    left: 6px;
    animation: ${ellipsisAnimation2} 0.6s infinite;
  }
  & div:nth-child(3) {
    left: 26px;
    animation: ${ellipsisAnimation2} 0.6s infinite;
  }
  & div:nth-child(4) {
    left: 45px;
    animation: ${ellipsisAnimation3} 0.6s infinite;
  }
`;

function Loader(props) {
  return (
    <Wrapper>
      <Container className='ellpsis-loader' {...props}>
        <div />
        <div />
        <div />
        <div />
      </Container>
    </Wrapper>
  );
}

export default Loader;
