import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';

import Button from '../../components/Button';

const Container = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StoveIdText = styled('p')`
  margin: 14px 0;
`;
const Row = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px 0;
  width: 300px;
`;
const Input = styled('input')`
  background: white;
  border: none;
  border-radius: 4px;
  padding: 8px;
  box-shadow: 3px 2px 4px #e9e9e9;
  height: 32px;
  width: ${(props) => (props.width ? props.width : 60)}px;
`;
const RowName = styled('p')`
  margin-right: 10px;
`;
const Calibrate = styled(Button)`
  margin-left: 10px;
`;
const Angle = styled('span')`
  background: white;
  height: 32px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 3px 2px 4px #e9e9e9;
  border-radius: 4px;
  font-size: 14px;
`;
class StoveConfigPage extends React.Component {
  constructor(props) {
    super(props);
    const { stoveConfigs } = this.props;
    const { no_of_heat_levels: noOfHeatLevels = 5, current_heat_level: currentHeatLevel = 0 } =
      stoveConfigs || {};
    console.log('StoveConfigPage constructor', stoveConfigs);
    this.state = {
      noOfHeatLevels,
      currentHeatLevel,
    };
  }

  render() {
    const {
      stoveId,
      stoveKeyInput,
      stoveConfigs,
      updateStoveKey,
      registerApiKey,
      onCalibrate,
      onSyncStove,
    } = this.props;
    const { noOfHeatLevels, currentHeatLevel } = this.state;
    const currentAngle = stoveConfigs.angles[currentHeatLevel + ''] || '0';

    return (
      <Container>
        <StoveIdText>Stove {stoveId + 1}</StoveIdText>
        <Row>
          <RowName>Id</RowName>
          <Input
            placeholder='Enter ID'
            width={120}
            value={stoveKeyInput}
            onChange={(e) => updateStoveKey(e.target.value)}
          />
          <Button onClick={registerApiKey}>Register key</Button>
        </Row>
        <Row>
          <RowName>No of Heat levels</RowName>
          <Input type='number' max='7' value={noOfHeatLevels} disabled />
        </Row>
        <Row>
          <RowName>Set current Heat level</RowName>
          <Input
            type='number'
            min='1'
            max={noOfHeatLevels}
            value={currentHeatLevel}
            onChange={(e) =>
              this.setState({
                currentHeatLevel: e.target.value,
              })
            }
          />
          <Calibrate onClick={() => onCalibrate(currentHeatLevel)}>Calibrate</Calibrate>
        </Row>
        <Row>
          <RowName>Angle</RowName>
          <Angle>{currentAngle}</Angle>
        </Row>
        <Button onClick={onSyncStove}>Sync</Button>
      </Container>
    );
  }
}

StoveConfigPage.propTypes = {
  route: PropTypes.object,
  registerApiKey: PropTypes.func,
};
export default StoveConfigPage;
