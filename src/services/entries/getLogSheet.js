import axiosInstance from "../axiosInstance";
import { api_route } from "../../constants/routes";

const getLogSheet = (event, branch, type) =>
  new Promise((resolve, reject) => {
    var url;

    if (event && branch && type)
      url = `${api_route}/logs/?event=${event}&branch=${branch}&type=${type}`;
    else if (event && branch)
      url = `${api_route}/logs/?event=${event}&branch=${branch}`;
    else if (event && type)
      url = `${api_route}/logs/?event=${event}&type=${type}`;
    else if (branch && type)
      url = `${api_route}/logs/?branch=${branch}&type=${type}`;
    else if (event) url = `${api_route}/logs/?event=${event}`;
    else if (branch) url = `${api_route}/logs/?branch=${branch}`;
    else if (type) url = `${api_route}/logs/?type=${type}`;
    else url = `${api_route}/logs/`;

    axiosInstance({
      url: url,
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.csv");
        document.body.appendChild(link);
        link.click();
        link.remove();
        resolve(true);
      })
      .catch((err) => reject(err));
  });

export default getLogSheet;
