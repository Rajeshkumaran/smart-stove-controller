import React from 'react';
import styled, { css } from 'react-emotion';

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
`;
function Tab({ activeTab = 0, onSelectTab }) {
  const options = [
    { key: 'StoveTab', name: 'Stove' },
    { key: 'TimerTab', name: 'Timer' },
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
        {option.name}
      </Option>
    ));
  };
  return <Wrapper>{renderOptions()}</Wrapper>;
}

export default Tab;
