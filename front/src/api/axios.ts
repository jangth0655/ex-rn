import axios from 'axios';

const baseURL = 'http://localhost:3030';

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});
