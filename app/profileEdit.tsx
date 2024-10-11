import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from 'expo-router';
import { Input, Label, XStack, YStack } from 'tamagui';
import { logoutAction } from './(redux)/authSlice';

export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  interface AuthState {
    user: {
      name: string;
      email: string;
    };
    loading: boolean;
  }
  interface RootState {
    auth: AuthState;
  }
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { user } = useTypedSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutAction());
    router.replace('/auth/login');
  };

  console.log(AsyncStorage.getItem('userInfo'), '<><><><><');
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Edit Profile',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => router.back()}>
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

      <YStack
        space
        padding="$1"
        flexDirection="row"
        backgroundColor={'white'}
        height="100%"
        width="100%">
        <XStack width="100%" height={50} padding={20} justifyContent='center' alignItems='center' >
          <Label htmlFor="name" color={'black'}>
            Name
          </Label>
          <Input
            flex={1}
            id="name"
            defaultValue="Nate Wienert"
            backgroundColor="white"
            color="black"
          />
        </XStack>
      </YStack>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  text: {
    fontSize: 18,
    marginBottom: 16,
  },
  button: {
    height: 50,
    backgroundColor: '#6200ea',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
