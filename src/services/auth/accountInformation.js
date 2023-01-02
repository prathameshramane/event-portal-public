import axiosInstance from "../axiosInstance";
import { api_route } from "../../constants/routes";

const accountInformation = () =>
  new Promise((resolve, reject) => {
    axiosInstance
      .get(api_route + "/account/")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });

export default accountInformation;
