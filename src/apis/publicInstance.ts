import axios from "axios";
import baseURL from "../constants/domain";

const publicInstance = axios.create({ baseURL });
publicInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

publicInstance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 403) {
      localStorage.removeItem("token");
      window.localStorage.clear();
      window.location.href = "/sign-in";
    }
    return Promise.reject(error);
  }
);

export default publicInstance;
