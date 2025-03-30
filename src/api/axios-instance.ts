import axios, { AxiosInstance } from 'axios';

const token: string | null = localStorage.getItem('token') || '';

const axiosInstance: AxiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${token}`
  },
  baseURL: process.env.REACT_APP_API_BASE_URL
});

export default axiosInstance;
