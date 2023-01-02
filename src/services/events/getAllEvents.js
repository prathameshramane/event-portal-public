import axiosInstance from "../axiosInstance";
import { api_route } from "../../constants/routes";

const getAllEvents = () =>
  new Promise((resolve, reject) => {
    axiosInstance
      .get(api_route + "/events/")
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export default getAllEvents;
