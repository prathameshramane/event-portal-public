import axiosInstance from "../axiosInstance";
import { api_route } from "../../constants/routes";

const getActiveCode = () =>
  new Promise((resolve, reject) => {
    axiosInstance
      .get(api_route + `/mycode/`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });

export default getActiveCode;
