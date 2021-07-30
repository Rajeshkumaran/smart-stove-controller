import React from "react";
import PropTypes from "prop-types";
import downarrow from "../../images/downarrow.png";
import { css } from "emotion";
import { ALLY_GREEN } from "../../constants";
import styled from "react-emotion";
const Wrap = styled("div")`
  position: relative;
`;
const SelectedItem = styled("div")`
  border-radius: 1rem;
  border: 1px solid #e9e9e9;
  padding: 1rem;
  display: flex;
  align-items: center;
  width: 20rem;
  height: 3.4rem;
  background: #fff;
`;
const Item = styled("p")`
  font-size: 1.4rem;
  flex: 1;
`;
const ArrowWrap = styled("div")`
  width: 1rem;
  margin: 0 0.5rem;
  @media (max-width: 992px) {
    width: 2rem;
    height: 2rem;
  }
`;
const Arrow = styled("img")`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;
const OptionsWrap = styled("ul")`
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  border: 1px solid #e9e9e9;
  position: absolute;
  top: 3.4rem;
  width: 20rem;
  z-index: 11;
  background: #f9f9fa;
`;
const ItemWrap = styled("li")`
  font-size: 1.4rem;
  padding: 1rem;
  :hover {
    background: #e9e9e9;
    color: #000;
    cursor: pointer;
  }
`;

export default class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
    };
  }
  onExpand = () => {
    this.setState({
      expand: !this.state.expand,
    });
  };
  showOptions = () => {
    const { activeItem, onSelect, listItems } = this.props;
    return listItems.map((item, index) => {
      return (
        <ItemWrap
          className={
            activeItem === index &&
            css`
              background: #ffffff;
              color: ${ALLY_GREEN};
            `
          }
          onClick={() => {
            this.setState({
              expand: false,
            });
            onSelect(index);
          }}
        >
          {item}
        </ItemWrap>
      );
    });
  };
  render() {
    const { activeItem, listItems } = this.props;
    const { expand } = this.state;
    return (
      <Wrap>
        <SelectedItem
          className={
            expand
              ? css`
                  border-bottom-left-radius: 0rem !important;
                  border-bottom-right-radius: 0rem !important;
                `
              : ""
          }
        >
          <Item>{listItems[activeItem]}</Item>
          <ArrowWrap>
            <Arrow src={downarrow} onClick={this.onExpand} />
          </ArrowWrap>
        </SelectedItem>
        {expand && <OptionsWrap>{this.showOptions()}</OptionsWrap>}
      </Wrap>
    );
  }
}
DropDown.propTypes = {
  listItems: PropTypes.array,
  activeItem: PropTypes.number,
  onSelect: PropTypes.func,
};
