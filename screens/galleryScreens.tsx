// screens/GalleryScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PhotoItem from '../components/PhotoItems';
import { usePhotos } from '../hooks/usePhoto';
export default function GalleryScreen() {
  const { photos, loading, error } = usePhotos();
  const [likedPhotos, setLikedPhotos] = useState<string[]>([]);

  useEffect(() => {
    loadLikedPhotos();
  }, []);

  const loadLikedPhotos = async () => {
    const savedLikes = await AsyncStorage.getItem('likedPhotos');
    if (savedLikes) {
      setLikedPhotos(JSON.parse(savedLikes));
    }
  };

  const saveLikedPhotos = async (newLikedPhotos: string[]) => {
    await AsyncStorage.setItem('likedPhotos', JSON.stringify(newLikedPhotos));
    setLikedPhotos(newLikedPhotos);
  };

  const handleLike = (photoId: string) => {
    const newLikedPhotos = likedPhotos.includes(photoId)
      ? likedPhotos.filter(id => id !== photoId)
      : [...likedPhotos, photoId];
    saveLikedPhotos(newLikedPhotos);
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.error}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={photos}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <PhotoItem photo={item} onLike={handleLike} liked={likedPhotos.includes(item.id)} />
      )}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  list: {
    padding: 10,
  },
});