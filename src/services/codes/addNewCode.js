import axiosInstance from "../axiosInstance";
import { api_route } from "../../constants/routes";

const addNewCode = (data) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .post(api_route + `/codes/`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });

export default addNewCode;
