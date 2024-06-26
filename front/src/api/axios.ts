import axios from 'axios';
import {Platform} from 'react-native';

export const axiosInstance = axios.create({
  baseURL:
    Platform.OS === 'android'
      ? 'http://192.168.0.42:3030'
      : 'http://127.0.0.1:3030',
  withCredentials: true,
});

// 'http://10.0.2.2:3030
