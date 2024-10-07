import React, { ReactNode, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
interface ProtectedRouteProps {
  children: ReactNode;
}
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  interface AuthState {
    user: {
      name: string;
      email: string;
    };
  }
  interface RootState {
    auth: AuthState;
  }
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { user } = useTypedSelector((state) => state.auth);
  console.log({ user });
  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  },  [user, router]);



  if (!user) {
    return null; // Render nothing while redirecting
  }

  return children;
};

export default ProtectedRoute;
