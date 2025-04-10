

import React from 'react';
import { View, Text, Image, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { Photo } from '../types';


type PhotoItemProps = {
  photo: Photo;
  onLike: (id: string) => void;
  liked: boolean;
};

export default function PhotoItem({ photo, onLike, liked }: PhotoItemProps) {
  const scale = new Animated.Value(1);

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={() => onLike(photo.id)}
      style={styles.container}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <Image source={{ uri: photo.download_url }} style={styles.image} /> 
        <View style={styles.info}>
          <Text style={styles.title}>{photo.author || 'عکاس ناشناس'}</Text>
          <Text style={styles.likes}>0 لایک</Text>
          <Text style={liked ? styles.liked : styles.like}>❤️</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}



const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  info: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  likes: {
    fontSize: 12,
    color: '#666',
  },
  like: {
    fontSize: 20,
    color: '#ff4444',
    position: 'absolute',
    right: 10,
    top: 10,
  },
  liked: {
    fontSize: 20,
    color: '#ff0000',
    position: 'absolute',
    right: 10,
    top: 10,
  },
});