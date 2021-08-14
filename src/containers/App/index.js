import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BackIcon from '../../images/back.png';

import HomePage from '../HomePage';
import StoveConfigPage from '../StoveConfigPage';

import firebase from '../../utils/firebaseConfig';

import { primary, primary_bg } from '../../constants';

import '../../../globalStyles';
import Loader from '../../components/Loader';

const Wrap = styled('div')`
  background: ${primary_bg};
  height: 100vh;
  position: relative;
`;
const AppName = styled('div')`
  color: ${primary};
  text-align: center;
  font-size: 16px;
  padding: 16px;
  font-family: Montserrat;
`;
const BackArrow = styled('span')`
  position: absolute;
  left: 20px;
  top: 20px;
  width: 16px;
  height: 16px;
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
      showBackArrow: false,
      stoveConfigs: {},
      showLoader: true,
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('stoves');

    if (ref) {
      const stoveConfigs = [];
      ref.onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log('doc', doc.data());
          stoveConfigs.push(doc.data());
        });
        this.setState({
          showLoader: false,
          stoveConfigs: {
            ...stoveConfigs.reduce(
              (acc, config) => ({
                ...acc,
                [config.id]: config,
              }),
              {},
            ),
          },
        });
      });
    }
  }

  showStoveConfigPage = () => {
    this.setState({
      page: PAGES.STOVE_CONFIG,
      showBackArrow: true,
    });
  };
  renderPages = () => {
    const { activeStoveIndex, page, stoveConfigs } = this.state;
    switch (page) {
      case PAGES.STOVE_CONFIG:
        return (
          <StoveConfigPage
            stoveId={activeStoveIndex}
            stoveConfigs={stoveConfigs[`stove${activeStoveIndex + 1}`]}
          />
        );

      case PAGES.STOVE_INFO:
      default: {
        const { activeStoveIndex, stoveConfigs } = this.state;
        const currentSelectedStove = stoveConfigs[`stove${activeStoveIndex + 1}`] || {};
        console.log(
          'stoveConfigs',
          currentSelectedStove,
          currentSelectedStove.current_heat_level,
          currentSelectedStove.no_of_heat_levels,
          this.state.showLoader,
        );

        return (
          <HomePage
            activeStoveIndex={activeStoveIndex}
            currentHeatLevel={currentSelectedStove.current_heat_level}
            maxHeatLevel={currentSelectedStove.no_of_heat_levels}
            onStoveSelect={(stoveId) => this.setState({ activeStoveIndex: stoveId })}
            onEditStoveConfig={this.showStoveConfigPage}
          />
        );
      }
    }
  };
  render() {
    const { showBackArrow, showLoader } = this.state;
    return showLoader ? (
      <Loader />
    ) : (
      <Wrap>
        {showBackArrow && (
          <BackArrow
            onClick={() =>
              this.setState({
                showBackArrow: false,
                page: PAGES.STOVE_INFO,
              })
            }
          >
            <img
              src={BackIcon}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </BackArrow>
        )}
        <AppName>ZETTA</AppName>
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
