import { get } from '../utils/helpers';
const selectAppState = (state) => get(state, 'appState', null) || {};
const selectHomePageState = (state) => get(state, 'homePage', null) || {};

export { selectAppState, selectHomePageState };
