import React from 'react';
import styled, { css } from 'react-emotion';
import { createPortal } from 'react-dom';
import Overlay from './Overlay';
const MainDiv = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1001;
  align-items: center;
  justify-content: center;
  display: flex;
`;
const Child = styled('div')`
  position: relative;
  background: white;
  max-height: 90%;
  max-width: 90%;
  height: auto;
  width: auto;
  border-radius: 5px;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10001;
  ${props => (props.animate === 1 ? `top:0;` : `top: -100vh;`)};
  transition: top 0.3s linear;
`;

const CloseContainer = styled('div')`
  flex: 1;
  text-align: right;
  position: absolute;
  top: 5px;
  right: 15px;
  z-index: 1;
  cursor: pointer;
  @media (max-width: 992px) {
    cursor: default;
  }
`;

const Close = styled('span')`
  position: relative;
  display: inline-block;
  color: #000;
`;

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ active: 1 }), 32);
  }

  close = () => {
    this.setState({ active: 0 });
    setTimeout(() => {
      if (this.props.close) this.props.close(); // calling close handler of parent
    }, 400);
  };

  render() {
    const ModalNode = (
      <MainDiv>
        <Overlay onClick={this.close} />
        <Child
          className={this.props.className || ''}
          animate={this.state.active}
        >
          <CloseContainer>
            <Close onClick={this.close}>x</Close>
          </CloseContainer>
          {this.props.children}
        </Child>
      </MainDiv>
    );

    return createPortal(ModalNode, document.getElementById('root'));
  }
}

Modal.defaultProps = {
  hideControls: false,
};
