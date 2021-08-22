import { REGISTER_KEY_FOR_STOVE } from './constants';

export const initialState = {};
const reducer =
  (preloadedState = null) =>
  (state = preloadedState || initialState, action) => {
    switch (action.type) {
      case REGISTER_KEY_FOR_STOVE: {
        console.log('action.payload');
        return state;
      }
      default: {
        return { ...state };
      }
    }
  };
export default reducer;
