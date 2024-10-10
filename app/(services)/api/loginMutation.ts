import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api } from './api';
import axios, { AxiosError } from 'axios'; // Import Axios types

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
}

export default function useLoginMutation(
  params?: UseMutationOptions<LoginResponse, unknown, LoginData>
) {
  return useMutation<LoginResponse, unknown, LoginData>({
    mutationFn: async (data: LoginData) => {
      try {
        const res = await api({
          method: 'post',
          url: '/login',
          data: data,
        });

        return res.data; // Assuming res.data contains the relevant response
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const serverError = error.response?.data;
          throw serverError || error;
        } else {
          throw new Error('An unknown error occurred');
        }
      }
    },
    ...params,
  });
}
