import axiosInstance from "../axiosInstance";
import { api_route } from "../../constants/routes";

const signup = (data) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .post(api_route + "/account/register/", data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export default signup;
