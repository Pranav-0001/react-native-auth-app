import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { Stack, useRouter } from 'expo-router';
import { logoutAction } from '../(redux)/authSlice';
import ProtectedRoute from '../../components/ProtectedRoute';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { YStack, XStack, Text, Button, Image, Spacer, ScrollView } from 'tamagui';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';

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

  return (
    <>
      <Stack.Screen
        options={{
          title: 'My Profile',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => router.back()}>
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={{ paddingRight: 10 }} onPress={handleLogout}>
              <Ionicons name="exit-outline" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

      <XStack
        space
        padding="$1"
        alignItems="center"
        justifyContent="space-around"
        flexDirection="row"
        backgroundColor={'white'}
        width="100%">
        <YStack space padding="$2" alignItems="center" flex={0.4}>
          <Image
            src="https://i.pinimg.com/originals/bf/57/02/bf57026ee75af2f414000cec322f7404.gif"
            style={{ width: 150, height: 150 }}
            borderRadius={100}
            alt="About Image"
          />
        </YStack>
        <YStack flex={0.6}>
          <Text fontSize={18} fontWeight="bold">
            Pranav
          </Text>
          <Button width={200} onPress={()=>router.push("/profileEdit")}>Edit Profile</Button>
        </YStack>
      </XStack>
      <ScrollView
        showsVerticalScrollIndicator={false} // Hide the scrollbar for a cleaner look
        contentContainerStyle={{ paddingTop: 40 }} // Add bottom padding for better scrolling
        backgroundColor={'white'}>
        <YStack>
          <XStack paddingVertical="$2" paddingHorizontal="$4" space alignItems="center">
            <Fontisto name="email" size={36} color="black" />
            <Text fontSize={16}>pranavkpz12345@gmail.com</Text>
          </XStack>
          <XStack paddingVertical="$2" paddingHorizontal="$4" space alignItems="center">
            <Feather name="phone" size={36} color="black" />
            <Text fontSize={16}>+91-9846071341</Text>
          </XStack>
          <TouchableOpacity  onPress={()=>handleLogout()}>
          <XStack paddingVertical="$2" paddingHorizontal="$4" space alignItems="center">
              <Ionicons name="exit-outline" size={36} color="red" />
              <Text fontSize={16}>Logout</Text>
          </XStack></TouchableOpacity>
        </YStack>
      </ScrollView>
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
