import { setAuthorizationHeaders } from "../axiosInstance";

const checkAuth = () =>
  new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    if (!token) {
      reject();
    } else {
      setAuthorizationHeaders(token);
      resolve(token);
    }
  });


export default checkAuth