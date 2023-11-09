import axios from 'axios';
// import Store from '../Redux/Store'; 

const api = axios.create({
  baseURL: 'http://192.168.40.159:3000/api/users',
});

// api.interceptors.request.use(
//   (config) => {
//     const { user } = Store.getState().auth;
//     if (user && user.token) {
//       config.headers.Authorization = `Bearer ${user.token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default api;