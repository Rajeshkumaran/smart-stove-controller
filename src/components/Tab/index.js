import React from 'react';
import styled, { css } from 'react-emotion';

import { primary, white } from '../../constants';

const Wrapper = styled('div')`
  display: flex;
`;
const Option = styled('span')`
  font-size: 14px;
  flex: 1;
  padding: 8px 5px;
  text-align: center;
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
            border-bottom: 1px solid ${primary};
            color: ${primary};
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
