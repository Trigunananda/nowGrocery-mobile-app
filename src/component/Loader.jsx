import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loader = () => {
  console.log('Loader is rendering'); // Add this line
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color='rgba(0,128,0,0.6)' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
