// // cartStorage.js

// import AsyncStorage from '@react-native-async-storage/async-storage';

// const saveCartToStorage = async (cartData) => {
//     // console.log('local-cartData',cartData)
//   try {
//     const jsonCartData = JSON.stringify(cartData);
//     await AsyncStorage.setItem('cart', jsonCartData);
//   } catch (error) {
//     console.error('Error saving cart data:', error);
//   }
// };

// const getCartFromStorage = async () => {
//   try {
//     const jsonCartData = await AsyncStorage.getItem('cart');
//     if (jsonCartData) {
//       return JSON.parse(jsonCartData);
//     } else {
//       return [];
//     }
//   } catch (error) {
//     console.error('Error retrieving cart data:', error);
//     return [];
//   }
// };

// export { saveCartToStorage, getCartFromStorage };


// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const saveCartToStorage = async (cartData) => {
//     try {
//         if (cartData !== null && cartData !== undefined) {
//           await AsyncStorage.setItem('cartData', JSON.stringify(cartData));
//         } else {
//           // Handle the case where cartData is null or undefined
//           // For example, you can set a default value or perform another action.

//           // Here, we'll set an empty array as the default value if cartData is null or undefined.  
//           await AsyncStorage.setItem('cartData', JSON.stringify([]));
//         }
//       } catch (error) {
//         console.error('Failed to save cart data to local storage:', error);
//       }
// };

