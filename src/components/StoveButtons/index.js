import React from 'react';
import styled, { css } from 'react-emotion';
import { primary, white } from '../../constants';

const StoveWrapper = styled('span')`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: fixed;
  bottom: 65px;
  width: 100%;
`;
const StoveRow = styled('div')`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Stove = styled('button')`
  border: none;
  outline: none;
  color: ${primary};
  background: ${white};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  width: 80px;
  height: 60px;
  margin: 8px 12px;
`;

function StoveButtons({ activeStoveIndex, onClick }) {
  const renderStoves = () => {
    const stoveRow1 = [
      { name: 'Stove 1', key: 'Stove1' },
      { name: 'Stove 2', key: 'Stove2' },
    ];
    const stoveRow2 = [
      { name: 'Stove 3', key: 'Stove3' },
      { name: 'Stove 4', key: 'Stove4' },
    ];
    const stoveRows = [stoveRow1, stoveRow2];

    return stoveRows.map((stoveRow, stoveRowIndex) => (
      <StoveRow key={`StoveRow-${stoveRowIndex.toString()}`}>
        {stoveRow.map((stove, stoveIndex) => (
          <Stove
            key={stove.key}
            className={
              activeStoveIndex === 2 * stoveRowIndex + stoveIndex &&
              css`
                background: ${primary};
                color: ${white};
              `
            }
            onClick={() => onClick({ stoveIndex, stoveRowIndex })}
          >
            {stove.name}
          </Stove>
        ))}
      </StoveRow>
    ));
  };
  return <StoveWrapper>{renderStoves()}</StoveWrapper>;
}
export default StoveButtons;
