import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api } from './api';
import axios, { AxiosError } from 'axios'; // Import Axios types

interface RegisterData {
  email: string;
  password: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
}

export default function useRegisterMutation(
  params?: UseMutationOptions<RegisterResponse, unknown, RegisterData>
) {
  return useMutation<RegisterResponse, unknown, RegisterData>({
    mutationFn: async (data: RegisterData) => {
      try {
        const res = await api({
          method: 'post',
          url: '/register',
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
