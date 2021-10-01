import React from 'react';
import styled, { css } from 'react-emotion';
import StoveIcon from '../../images/stove.png';
import TimerIcon from '../../images/timer.png';
import RecipeIcon from '../../images/recipes.png';
import { primary, white } from '../../constants';

const Wrapper = styled('div')`
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
`;
const Option = styled('span')`
  font-size: 14px;
  flex: 1;
  padding: 8px 5px;
  text-align: center;
  font-family: Montserrat, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ImageWrapper = styled('div')`
  width: 32px;
  height: 32px;
  margin: 0 8px;
`;
function Tab({ activeTab = 0, onSelectTab }) {
  const options = [
    { key: 'StoveTab', name: 'Stove', icon: StoveIcon },
    { key: 'TimerTab', name: 'Timer', icon: TimerIcon },
    { key: 'RecipesTab', name: 'Recipes', icon: RecipeIcon },
  ];
  const renderOptions = () => {
    return options.map((option, index) => (
      <Option
        key={option.key}
        className={
          activeTab === index &&
          css`
            background: ${primary};
            color: ${white};
          `
        }
        onClick={() => onSelectTab(index)}
      >
        <span>{option.name}</span>
        <ImageWrapper>
          <img src={option.icon} />
        </ImageWrapper>
      </Option>
    ));
  };
  return <Wrapper>{renderOptions()}</Wrapper>;
}

export default Tab;
