import React, {useEffect, useRef, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import { Audio } from 'expo-av';
import {AVPlaybackStatus} from "expo-av/build/AV";

export default function App() {
  const audioRef = useRef<Audio.Sound>();
  const [isReady, setIsReady] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  useEffect( () => {
    const playbackObject = new Audio.Sound();
    playbackObject.loadAsync({uri: "https://dobre.out.airtime.pro/dobre_a"}).then(() => {
      setIsReady(true);
    })
    audioRef.current = playbackObject;
    return () => {
      audioRef?.current?.stopAsync();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Dobre Radio</Text>
      <Button
          color='#1F321C'
          disabled={!isReady}
          onPress={() => {
            isPlaying ? audioRef?.current?.stopAsync() : audioRef?.current?.playAsync();
            setIsPlaying(!isPlaying);
          }}
          title={isPlaying ? "Zatrzymaj" : "Graj Dobre.Radio!"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9C013',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
