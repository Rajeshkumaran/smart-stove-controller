import React from "react";
import ReactDOM from "react-dom";
import { ConnectedRouter } from "connected-react-router";
import { connectRouter } from "connected-react-router";
import { renderRoutes } from "react-router-config";
import { createBrowserHistory } from "history";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers";
import rootSaga from "./sagas";
// import configureStore from './configureStore';
import routes from "./routes";
import { Provider } from "react-redux";
import { ROUTER_STORE_KEY } from "./constants";
import "./utils/fonts.css";

const preloadedState =
  // eslint-disable-next-line no-underscore-dangle
  window.__INITIAL_STATE__; /* eslint no-underscore-dangle: ["error", { "allow": ["__PRELOADED_STATE__"] }] */
// Allow the passed state to be garbage-collected
// eslint-disable-next-line no-underscore-dangle
delete window.__INITIAL_STATE__;

// const IS_DEV = process.env.NODE_ENV === 'development';
const history = createBrowserHistory();
// const store = configureStore(preloadedState, history);
const composeEnhancers =
  process.env.NODE_ENV !== "production" && typeof window === "object"
    ? composeWithDevTools({ shouldHotReload: true, trace: true }) // Change this to false if app re-renders on `replaceReducer`
    : compose;

const createMockReducers = (preloadedState) => {
  const keys = Object.keys(preloadedState);
  const mockReducers = {};
  keys.forEach((key) => {
    if (key === ROUTER_STORE_KEY) return;
    mockReducers[key] = reducer[key](preloadedState[key]);
  });

  return mockReducers;
};
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  ...createMockReducers(preloadedState),
  router: connectRouter(history),
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);
typeof window === "object" && sagaMiddleware.run(rootSaga);
// const initialState = window.initialState;
ReactDOM.hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>{renderRoutes(routes)}</ConnectedRouter>
  </Provider>,
  document.getElementById("root"),
);
