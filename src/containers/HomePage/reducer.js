export const initialState = {};
const reducer =
  (preloadedState = null) =>
  (state = preloadedState || initialState, action) => {
    switch (action.type) {
      default: {
        return { ...state };
      }
    }
  };
export default reducer;
