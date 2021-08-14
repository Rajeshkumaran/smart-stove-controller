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
  width: 200px;
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
class StoveConfigPage extends React.Component {
  constructor(props) {
    super(props);
    const { stoveConfigs } = this.props;
    const {
      no_of_heat_levels: noOfHeatLevels = 5,
      current_heat_level: currentHeatLevel = 0,
      angle = '',
    } = stoveConfigs || {};
    console.log('StoveConfigPage constructor', stoveConfigs);
    this.state = {
      noOfHeatLevels,
      stoveKey: '',
      currentHeatLevel,
      angle,
    };
  }

  render() {
    const { stoveId } = this.props;
    const { noOfHeatLevels, stoveKey, currentHeatLevel, angle } = this.state;
    return (
      <Container>
        <StoveIdText>Stove {stoveId + 1}</StoveIdText>
        <Row>
          <RowName>Id</RowName>
          <Input
            placeholder='Enter ID'
            width={120}
            value={stoveKey}
            onChange={(e) => this.setState({ stoveKey: e.target.value })}
          />
        </Row>
        <Row>
          <RowName>No of Heat levels</RowName>
          <Input
            type='number'
            min='3'
            max='9'
            value={noOfHeatLevels}
            onChange={(e) =>
              this.setState({
                noOfHeatLevels: e.target.value,
                currentHeatLevel: 0,
              })
            }
          />
        </Row>
        <Row>
          <RowName>Set current Heat level</RowName>
          <Input
            type='number'
            min='0'
            max={noOfHeatLevels}
            value={currentHeatLevel}
            onChange={(e) =>
              this.setState({
                currentHeatLevel: e.target.value,
              })
            }
          />
        </Row>
        <Row>
          <RowName>Angle</RowName>
          <Input type='text' width={60} value={angle} />
        </Row>
        <Button>Update</Button>
      </Container>
    );
  }
}

StoveConfigPage.propTypes = {
  route: PropTypes.object,
};
export default StoveConfigPage;
