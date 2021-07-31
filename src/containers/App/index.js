import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';

import HomePage from '../HomePage';
import StoveConfigPage from '../StoveConfigPage';

import { primary, primary_bg } from '../../constants';

import '../../../globalStyles';

const Wrap = styled('div')`
  background: ${primary_bg};
  height: 100vh;
`;
const AppName = styled('div')`
  color: ${primary};
  text-align: center;
  font-size: 16px;
  padding: 16px;
`;
const PAGES = {
  STOVE_INFO: 'STOVE_INFO',
  STOVE_CONFIG: 'STOVE_CONFIG',
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: PAGES.STOVE_INFO,
      activeStoveIndex: 0,
    };
  }
  showStoveConfigPage = () => {
    console.log('onEditStoveConfig called');
    this.setState({
      page: PAGES.STOVE_CONFIG,
    });
  };
  renderPages = () => {
    const { activeStoveIndex, page } = this.state;
    switch (page) {
      case PAGES.STOVE_CONFIG:
        return <StoveConfigPage stoveId={activeStoveIndex} />;

      case PAGES.STOVE_INFO:
      default:
        return (
          <HomePage
            activeStoveIndex={activeStoveIndex}
            onStoveSelect={(stoveId) => this.setState({ activeStoveIndex: stoveId })}
            onEditStoveConfig={this.showStoveConfigPage}
          />
        );
    }
  };
  render() {
    const { route = {} } = this.props;
    return (
      <Wrap>
        <AppName>ZETA</AppName>
        {this.renderPages()}
      </Wrap>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  route: PropTypes.object,
};
