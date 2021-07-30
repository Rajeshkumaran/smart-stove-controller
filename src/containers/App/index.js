import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';

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
class App extends React.Component {
  render() {
    const { route = {} } = this.props;
    return (
      <Wrap>
        <AppName>ZETA</AppName>
        {renderRoutes(route.routes, {
          ...this.props,
        })}
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
