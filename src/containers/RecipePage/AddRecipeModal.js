import React, { useState } from 'react';
import Modal from '../../components/Modal';
import styled from 'react-emotion';
import Button from '../../components/Button';
import { primary } from '../../constants';

const Container = styled('div')`
  margin: 15px;
`;
const Heading = styled('div')`
  font-size: 16px;
  margin: 10px;
  font-weight: bold;
  text-align: center;
  color: ${primary};
`;
const SectionWrap = styled('div')`
  margin: 10px;
`;
const Subsection = styled('div')`
  margin: 15px 0;
  display: flex;
  align-items: center;
`;
const Span = styled('span')`
  font-size: 14px;
  margin: 0 3px;
`;
const Spanheading = styled(Span)`
  margin-right: 7px;
  width: 70px;
`;
const RecipeInput = styled('input')`
  outline: none;
  border: 1px solid ${primary};
  height: 32px;
  padding: 3px 5px;
  &:hover {
    border: 1px solid ${primary};
  }
`;
const NumberInput = styled('input')`
  margin-left: 5px;
`;
const ButtonWrap = styled('div')`
  margin: 10px;
`;
const Add = styled(Button)`
  margin-right: 7px;
`;
const Cancel = styled('button')``;
const ErrorSpan = styled('span')`
  color: red;
  margin-left: 10px;
`;
function AddRecipeModal({ onAddRecipe, close }) {
  const [recipeName, setRecipeName] = useState('');
  const [minute, setMinute] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [showError, setErrorState] = useState(false);
  return (
    <Modal close={close}>
      <Container>
        <Heading>Set timer for Recipe</Heading>
        <SectionWrap>
          <Subsection>
            <Spanheading>Recipe</Spanheading>
            <RecipeInput
              type='text'
              placeholder='Add recipe name'
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
            />
          </Subsection>
          <Subsection>
            <Spanheading>Timer</Spanheading>
            <NumberInput
              type='number'
              min='0'
              max='20'
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
            />
            <Span>m</Span>
            <NumberInput
              type='number'
              min='0'
              max='60'
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
            />
            <Span>s</Span>
          </Subsection>
        </SectionWrap>
        {showError && <ErrorSpan>Please add recipe name or timer</ErrorSpan>}
        <ButtonWrap>
          <Add
            onClick={() => {
              const timerState = minute * 60 + seconds;
              if ((!minute && !seconds) || !recipeName) {
                setErrorState(true);
                return;
              }
              setErrorState(false);
              onAddRecipe({ name: recipeName, timerState });
            }}
          >
            Add
          </Add>
          <Cancel onClick={close}>Cancel</Cancel>
        </ButtonWrap>
      </Container>
    </Modal>
  );
}

export default AddRecipeModal;
