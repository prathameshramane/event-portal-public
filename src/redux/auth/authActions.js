import * as actionTypes from "./authTypes";
import {
  login as loginRequest,
  logout as logoutRequest,
  checkAuth,
  accountInformation,
} from "../../services";

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
  };
};

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

const fetchAccount = (data) => {
  return {
    type: actionTypes.FETCH_ACCOUNT,
    data: data,
  };
};

export const logout = () => {
  logoutRequest();
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const login = (username, password) => (dispatch) =>
  new Promise((resolve, reject) => {
    dispatch(authStart());
    loginRequest(username, password)
      .then((res) => {
        dispatch(authSuccess(res.data.token));
        return accountInformation();
      })
      .then((res) => {
        dispatch(fetchAccount(res.data));
        resolve();
      })
      .catch((err) => {
        dispatch(authFail(err));
        reject(err);
      });
  });

export const authCheckState = () => (dispatch) => {
  checkAuth()
    .then((token) => {
      dispatch(authSuccess(token));
      return accountInformation();
    })
    .then((res) => {
      dispatch(fetchAccount(res.data));
    })
    .catch(() => dispatch(logout()));
};
