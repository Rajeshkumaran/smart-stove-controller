import React from "react";
import styled, { css } from "react-emotion";
import Modal from "../Modal";
const Wrap = styled("div")`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
`;
const Title = styled("h1")`
  text-align: center;
`;
const ContentWrap = styled("div")`
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
`;
const ParamType = styled("p")`
  font-size: 1.4rem;
  padding: 1rem;
  margin: 1rem 0;
`;
const PramsWrap = styled("div")`
  display: flex;
`;
function ObjectiveInfoPopup({ info, close = () => {} }) {
  const showInfo = () => {
    return Object.keys(info).map((obj, index) => (
      <PramsWrap key={`${obj}-${index}`}>
        <ParamType
          className={css`
            font-weight: bold;
            width: 10rem;
          `}
        >
          {obj}
        </ParamType>
        <ParamType
          className={
            obj === "Parent" &&
            css`
              font-weight: bold;
            `
          }
        >
          {info[obj]}
        </ParamType>
      </PramsWrap>
    ));
  };
  return (
    <Modal close={close}>
      <Wrap>
        <Title>ObjectiveInfo</Title>
        <ContentWrap>{showInfo()}</ContentWrap>
      </Wrap>
    </Modal>
  );
}
export default ObjectiveInfoPopup;
