import axiosInstance from "../axiosInstance";
import { api_route } from "../../constants/routes";

const getAllCodes= () =>
  new Promise((resolve, reject) => {
    axiosInstance
      .get(api_route + `/codes/`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });

export default getAllCodes;
