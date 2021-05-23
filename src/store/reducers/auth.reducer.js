import * as actionTypes from "../acionTypes";

const initialState = {
  token: "",
  userData: {},
  message: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_USER_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
      };
    case actionTypes.REGISTER_USER_FAILURE:
      return {
        ...state,
        message: action.payload.message,
      };
    case actionTypes.SIGNIN_USER_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userData: action.payload.user,
      };
    case actionTypes.SIGNIN_USER_FAILURE:
      return {
        ...state,
        message: action.payload.message,
      };
    case actionTypes.CLEAR_MESSAGE:
      return {
        ...state,
        message: "",
      };
    case actionTypes.SIGNOUT_CURRENT_USER:
      localStorage.setItem("auth", null);
      return {
        ...state,
        token: "",
        userData: "",
        message: "",
      };
    default:
      return state;
  }
};

export default authReducer;
