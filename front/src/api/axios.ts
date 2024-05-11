import axios from 'axios';
import {Platform} from 'react-native';

const baseURL = Platform.select({
  ios: 'http://127.0.0.1:3030',
  android: 'http://10.0.2.2:3030',
});

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});
