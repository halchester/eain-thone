import * as actionTypes from "../acionTypes";

const initialState = {
  isLoading: false,
  isDrawerOpen: false,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_TRUE:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.LOADING_FALSE:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.TOGGLE_DRAWER:
      return {
        ...state,
        isDrawerOpen: !state.isDrawerOpen,
      };
    case actionTypes.CLOSE_DRAWER:
      return {
        ...state,
        isDrawerOpen: false,
      };
    case actionTypes.OPEN_DRAWER:
      return {
        ...state,
        isDrawerOpen: true,
      };
    default:
      return state;
  }
};

export default uiReducer;
