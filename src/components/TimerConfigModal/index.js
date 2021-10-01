import React, { useState } from 'react';
import styled from 'react-emotion';
import { primary_bg } from '../../constants';
import Button from '../Button';
import Modal from '../Modal';

const Wrap = styled('div')`
  display: flex;
  flex-direction: column;
  margin: 30px;
`;
const Info = styled('div')`
  display: flex;
`;
const Section = styled('div')`
  display: flex;
  margin: 0 8px;
  align-items: center;
`;
const Input = styled('input')`
  border: 1px solid #e9e9e9;
  padding: 5px;
  border-radius: 5px;
  margin: 0 5px;
`;
const ConfigWrap = styled('div')`
  display: flex;
  justify-content: center;
  margin: 24px 15px 0;
`;
const Cancel = styled(Button)`
  background: ${primary_bg};
  border: none;
  margin-left: 5px;
`;
const TimerConfigModal = ({ show, onSave, onCancel }) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  return (
    show && (
      <Modal close={onCancel}>
        <Wrap>
          <Info>
            <Section>
              <Input
                type='number'
                min={1}
                max={60}
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
              />
              MM
            </Section>
            <Section>
              <Input
                type='number'
                min={0}
                max={60}
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
              />
              SEC
            </Section>
          </Info>

          <ConfigWrap>
            <Button
              onClick={() => {
                onSave(minutes, seconds);
                onCancel();
              }}
            >
              Save
            </Button>
            <Cancel ignoreHoverState onClick={onCancel}>
              Cancel
            </Cancel>
          </ConfigWrap>
        </Wrap>
      </Modal>
    )
  );
};
export default TimerConfigModal;
