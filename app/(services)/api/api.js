import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = axios.create({
  baseURL: 'https://7x1rcvfz-3000.inc1.devtunnels.ms', // Ensure the baseURL is correct for the environment you're working in
});

api.interceptors.request.use(
  async (config) => {
    // Logging to ensure the correct API URL is being used
    console.log({ url: process.env.EXPO_PUBLIC_API_URL });

    // Retrieve the stored user information
    const userInfo = await AsyncStorage.getItem('userInfo');
    if (userInfo) {
      const token = JSON.parse(userInfo)?.token;
      if (token) {
        // If token exists, add it to the Authorization header
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }

    // Return the modified config object
    return config;
  },
  (error) => {
    console.log('error', error);
    // Return any request errors
    return Promise.reject(error);
  }
);
