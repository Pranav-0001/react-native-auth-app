import { ResizeMode, Video } from 'expo-av';
import { Stack, Link, router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import * as React from 'react';

export default function Home() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  function greet() {
    const time = new Date();
    const hours = time.getHours();

    if (hours >= 5 && hours < 12) {
      return 'Good Morning';
    } else if (hours >= 12 && hours < 18) {
      return 'Good Afternoon';
    } else if (hours >= 18 && hours < 21) {
      return 'Good Evening';
    } else {
      return 'Good Evening';
    }
  }
  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <View style={styles.container}>
        <Video
          source={{
            uri: 'https://videos.pexels.com/video-files/5377700/5377700-sd_540_960_25fps.mp4',
          }}
          ref={video}
          style={styles.video}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          isMuted
        />
        <View style={styles.overlay}>
          <Text style={styles.mainText}>Hello</Text>
          <Text style={styles.subText}>{greet()}</Text>
          <Text style={styles.tagline}>Welcome to my app</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/auth/login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/about')}>
            <Text style={styles.buttonText}>about</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.button} onPress={() => router.push('/auth/register')}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  mainText: {
    color: 'white',
    fontSize: 68,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tagline: {
    color: 'white',
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
  },
  button: {
    backgroundColor: '#6200ea',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3, // Adds a shadow effect on Android
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
