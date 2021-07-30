import React from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Tab from '../../components/Tab';

import { selectHomePageState } from '../../selectors';
import { primary, white } from '../../constants';

const Container = styled('div')`
  width: 100%;
`;
const StoveWrapper = styled('span')`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: fixed;
  bottom: 20px;
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
  width: 60px;
  height: 60px;
  margin: 8px 12px;
`;
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: 0,
      activeStoveIndex: 0,
    };
  }

  onSelectTab = (selectedIndex) =>
    this.setState({
      activeTabIndex: selectedIndex,
    });

  renderStoves = () => {
    const stoveRow1 = [
      { name: 'Stove 1', key: 'Stove1' },
      { name: 'Stove 2', key: 'Stove2' },
    ];
    const stoveRow2 = [
      { name: 'Stove 3', key: 'Stove3' },
      { name: 'Stove 4', key: 'Stove4' },
    ];
    const stoveRows = [stoveRow1, stoveRow2];

    const { activeStoveIndex } = this.state;
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
            onClick={() => {
              this.setState({
                activeStoveIndex: 2 * stoveRowIndex + stoveIndex,
              });
            }}
          >
            {stove.name}
          </Stove>
        ))}
      </StoveRow>
    ));
  };

  render() {
    const { activeTabIndex } = this.state;
    return (
      <Container>
        <Tab activeTab={activeTabIndex} onSelectTab={this.onSelectTab} />
        <>
          <StoveWrapper>{this.renderStoves()}</StoveWrapper>
        </>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    homePage: selectHomePageState(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};
HomePage.propTypes = {
  route: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
