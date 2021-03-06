import * as actionTypes from "../acionTypes";
import axios from "../../api/index";

export const registerUserSuccess = (message) => {
  return {
    type: actionTypes.REGISTER_USER_SUCCESS,
    message: message,
  };
};

export const registerUser = (payload) => async (dispatch) => {
  dispatch({ type: actionTypes.LOADING_TRUE });
  try {
    await axios.post("/api/register", payload).then(() => {
      dispatch({ type: actionTypes.LOADING_FALSE });
      dispatch({
        type: actionTypes.REGISTER_USER_SUCCESS,
        payload: {
          message: "User successfully registered! :D",
        },
      });
    });
  } catch (err) {
    dispatch({ type: actionTypes.LOADING_FALSE });
    dispatch({
      type: actionTypes.REGISTER_USER_FAILURE,
      payload: { message: err.response.data.error },
    });
  }
};

export const signInUserSuccess = (payload) => {
  return {
    type: actionTypes.SIGNIN_USER_SUCCESS,
  };
};

export const signInUserFailure = (message) => {
  return {
    type: actionTypes.SIGNIN_USER_FAILURE,
  };
};

export const signInUser = (payload) => async (dispatch) => {
  dispatch({ type: actionTypes.LOADING_TRUE });
  try {
    const response = await axios.post("/api/signin", payload);
    const {
      data: { data },
    } = await response;

    localStorage.setItem("auth", data.token);
    dispatch({ type: actionTypes.LOADING_FALSE });
    dispatch({ type: actionTypes.SIGNIN_USER_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: actionTypes.LOADING_FALSE });
    console.log(err);
    dispatch({
      type: actionTypes.SIGNIN_USER_FAILURE,
      payload: {
        message: "Something went wrong!",
      },
    });
  }
};
