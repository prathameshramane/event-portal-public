import axiosInstance from "../axiosInstance";
import { api_route } from "../../constants/routes";

const getEntries = (search = "") =>
  new Promise((resolve, reject) => {
    axiosInstance
      .get(api_route + `/entry/`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });

export default getEntries;
