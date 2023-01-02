import axiosInstance from "../axiosInstance";
import { api_route } from "../../constants/routes";

const markTeamEntry = (id, data) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .put(api_route + `/entry/${id}/`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });

export default markTeamEntry;
