import axiosInstance from "../axiosInstance";
import { api_route } from "../../constants/routes";

const registerEntry = (formData) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .post(api_route + "/entry/register/", formData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export default registerEntry;
