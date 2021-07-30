import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import '../../../globalStyles';
import { connect } from 'react-redux';
const Wrap = styled('div')`
  background: #e9e9e9;
  height: 100%;
`;
class App extends React.Component {
  render() {
    const { route = {} } = this.props;
    return (
      <Wrap>
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
