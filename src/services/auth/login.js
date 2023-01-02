import axiosInstance, { setAuthorizationHeaders } from "../axiosInstance";
import { api_route } from "../../constants/routes";

const login = (username, password) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .post(api_route + "/account/login/", { username, password })
      .then((res) => {
        setAuthorizationHeaders(res.data.token);
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

  export default login