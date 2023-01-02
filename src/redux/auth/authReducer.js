import * as actionTypes from "./authTypes";
import { updateObject } from "../utility";

const initialState = {
  isAuthenticated: false,
  token: null,
  error: null,
  loading: false,
  data: null,
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    isAuthenticated: true,
    token: action.token,
    error: null,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    isAuthenticated: false,
    token: null,
  });
};

const fetchAccount = (state, action) => {
  return updateObject(state, {
    data: action.data,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.FETCH_ACCOUNT:
      return fetchAccount(state, action);
    default:
      return state;
  }
};

export default reducer;
