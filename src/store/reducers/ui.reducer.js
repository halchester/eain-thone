import * as actionTypes from "../acionTypes";

const initialState = {
  isLoading: false,
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
    default:
      return state;
  }
};

export default uiReducer;
