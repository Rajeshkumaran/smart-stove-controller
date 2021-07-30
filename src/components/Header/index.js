import React from "react";
import styled from "react-emotion";
import { MontserratBold } from "../../utils/fonts";
const Wrap = styled("div")`
  background: #ffffff;
  display: flex;
  height: 6.4rem;
  justify-content: center;
  align-items: center;
  position: fixed;
  color: #000;
  top: 0;
  width: 100%;
  z-index: 1;
  box-shadow: 0px 4px 0px #e9e9e9;
  @media (max-width: 992px) {
    height: 4rem;
  }
`;
const LogoWrap = styled("div")`
  margin: 0 3.4rem;
  width: 10rem;
  position: absolute;
  left: 10rem;
  @media (max-width: 992px) {
    margin: 0 1rem;
  }
`;

const LogoImg = styled("img")`
  width: 100%;
  height: 100%;
`;
export default class Header extends React.Component {
  render() {
    return (
      <Wrap>
        <LogoWrap>
          <LogoImg src="https://assets-global.website-files.com/5d8e324474cf44070af9c56b/5da7bebcfbe3aa081c5e6289_logo.svg" />
        </LogoWrap>
      </Wrap>
    );
  }
}
