import axiosInstance from "../axiosInstance";
import { api_route } from "../../constants/routes";

const getAccountList = () =>
  new Promise((resolve, reject) => {
    axiosInstance
      .get(api_route + `/account/account-list/`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });

export default getAccountList;
