import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { TamaguiProvider } from 'tamagui';

import config from '../tamagui.config';
import { Provider } from 'react-redux';
import store from "./(redux)/store"
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from "./(services)/queryClient";

export default function Layout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <TamaguiProvider config={config}>
      <Provider store={store}>
      <QueryClientProvider client={queryClient}>
      <Stack />
      </QueryClientProvider>
      </Provider>
    </TamaguiProvider>
  );
}
