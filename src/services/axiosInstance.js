import axiosInstance from "axios";

export const setAuthorizationHeaders = (token) => {
  localStorage.setItem("token", token);
  axiosInstance.defaults.headers.common["Authorization"] = "Token " + token;
};

export const resetAuthorizationHeaders = () => {
  localStorage.removeItem("token");
  delete axiosInstance.defaults.headers.common["Authorization"];
};

export default axiosInstance;
