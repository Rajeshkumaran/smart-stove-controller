import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectHomePageState } from '../../selectors';
const Container = styled('div')`
  width: 100%;
`;

class HomePage extends React.Component {
  render() {
    return (
      <Container>
        <div>kfjnsdjkfns</div>
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
