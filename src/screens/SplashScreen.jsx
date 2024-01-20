// // SplashScreen.jsx

// import React, { useEffect } from 'react';
// import { View, Image, StyleSheet } from 'react-native';
// import logo from '../../assets/nowgrocery-logo/NowGrocery_Logo.png'; // Replace with the actual path to your logo
// import { useNavigation } from '@react-navigation/native';

// const SplashScreen = () => {
// //     const navigation = useNavigation();
// //   useEffect(() => {
// //     // Simulate a delay (e.g., 2 seconds) and then navigate to Home screen
// //     const timer = setTimeout(() => {
// //       // Replace 'Home' with the actual name of your Home screen
// //     }, 100);

// //     return () => clearTimeout(timer); // Clear the timeout if the component is unmounted
// //   }, [navigation]);

//   return (
//     <View style={styles.container}>
//       <Image source={logo} style={styles.logo} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'red', // Replace with the desired background color
//   },
//   logo: {
//     width: 200, // Set the width of your logo
//     height: 200, // Set the height of your logo
//     resizeMode: 'contain',
//   },
// });

// export default SplashScreen;



import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import logo from '../../assets/nowgrocery-logo/NowGrocery_Logo.png'; // Replace with the actual path to your logo
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3, // Adjust the friction as needed
      tension: 40, // Adjust the tension as needed
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={logo}
        style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red', // Replace with the desired background color
  },
  logo: {
    width: 200, // Set the width of your logo
    height: 200, // Set the height of your logo
    resizeMode: 'contain',
  },
});

export default SplashScreen;
