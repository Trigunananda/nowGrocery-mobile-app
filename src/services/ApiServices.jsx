// import axios from 'axios';

// const BASE_URL = 'https://api.nowgrocery.com/';

// const axiosInstace = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// const apiService = {
//   get: url => axiosInstace.get(`${url}`),
//   post: (url, data) => axiosInstace.post(`${url}`, data),
//   put: (url, data) => axiosInstace.put(`${url}`, data),
//   delete: url => axiosInstace.delete(`${url}`),
// };

// export default apiService;



// apiService.js
import axios from 'axios';
import apiConfig from './apiConfig';

const { baseURL } = apiConfig[__DEV__  ? 'development' : 'production'];



const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiService = {
  get: (url) => axiosInstance.get(`${url}`),
  post: (url, data) => axiosInstance.post(`${url}`, data),
  put: (url, data) => axiosInstance.put(`${url}`, data),
  delete: (url) => axiosInstance.delete(`${url}`),
};

export default apiService;

