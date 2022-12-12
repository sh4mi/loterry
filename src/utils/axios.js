import axios from "axios";
// import { API_BASE_URL } from "config/constants";
// okay?
//yeah plz coding in sigin.js file

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    // 'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59',
    'accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  },
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response?.status === 401) {
      console.log('api error', error)
      window.location.href = "/401";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;