import axios from 'axios';

const token = localStorage.getItem('token') || '';

const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${token}`
  },
  baseURL: process.env.REACT_APP_API_BASE_URL
});

export default axiosInstance;
