import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import * as Animatable from 'react-native-animatable';

const CustomToast = ({ isVisible, message }) => {
  const toastRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      toastRef.current?.fadeIn(500);
      setTimeout(() => {
        toastRef.current?.fadeOut(500);
      }, 2000); // Hide the toast after 2 seconds
    }
  }, [isVisible]);

  return (
    <Modal isVisible={isVisible} backdropOpacity={0} style={styles.modalContainer}>
      <Animatable.View ref={toastRef} style={styles.toastContainer}>
        <Text style={styles.toastText}>{message}</Text>
      </Animatable.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    justifyContent: 'flex-end', // Align at the bottom
    marginHorizontal:10,
    paddingHorizontal:10,
    // borderWidth:1,
   
  },
  toastContainer: {
    backgroundColor: 'rgba(0,0,0, 1)',
    padding: 20,
    borderRadius:10
  },
  toastText: {
    fontSize:18,
    fontWeight:'400',
    textAlign:'center',
    color: 'white',
  },
});

export default CustomToast;
