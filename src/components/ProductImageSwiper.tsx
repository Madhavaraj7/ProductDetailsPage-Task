import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const ProductImageSwiper = ({ images }: { images: string[] }) => {
  return (
    <Swiper style={styles.wrapper} showsPagination={false} showsButtons={false}>
      {images.map((image, index) => (
        <View key={index} style={styles.slide}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 300,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width,
    height: '100%',
    resizeMode: 'cover',
  },
});

export default ProductImageSwiper;
