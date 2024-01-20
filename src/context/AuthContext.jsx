import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import axios from 'axios';
import apiService from '../services/ApiServices';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCart } from './CartContext';
import { useSearch } from './SearchContext';


const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // const{getCart}=useCart();


  const navigation = useNavigation(); // Use the useNavigation hook to get the navigation object
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerId, setCustomerId] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [invalidCredentialsError, setInvalidCredentialsError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Check AsyncStorage for existing user login information
    checkLoginStatus();
  }, [navigation, login]); // Run only on component mount

  const checkLoginStatus = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('userEmail');
      const storedPassword = await AsyncStorage.getItem('userPassword');
      // console.log("storedEmail", storedEmail);
      // console.log("storedPassword", storedPassword);
      if (storedEmail && storedPassword) {
        // Auto-login if credentials are stored
        await login(storedEmail, storedPassword);
        // Use a callback to navigate only after state updates are complete
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Error reading AsyncStorage:', error);
    }
  };


  const callCart = async (custId) => {
    try {
      console.log('hello console');
      const response = await apiService.get(`CartAPI/GetByUserId/${custId}`);
      console.log("localCartData-----------", response.data[0].ecartList);
      if (response.data[0].ecartList.length != 0) {
        try {
          await AsyncStorage.setItem('cartData', JSON.stringify(response.data[0].ecartList));
          const localCartData = await AsyncStorage.getItem('cartData');

          if (localCartData) {
            console.log('hello-cart');
            setCart(JSON.parse(localCartData));
          }
        } catch (error) {
          console.error('Failed to load cart data:', error);
        }
        navigation.navigate('Home')
      }
      // Save the cart data in AsyncStorage


      // You can also update the cart data in the state if needed
      // setCartData(response);

    } catch (error) {
      console.error('Error fetching or saving cart data:', error);
    }
  };



  const login = async (email, password) => {
    // Reset any previous error messages
    setEmailError('');
    setPasswordError('');
    setInvalidCredentialsError('');

    // Validation: Check if email/mobile and password fields are empty
    if (email.trim() === '') {
      setEmailError('Please enter email or mobile number');
      return;
    }

    if (password.trim() === '') {
      setPasswordError('Please enter the password');
      return;
    }

    const requestBody = {
      LoginType: 'Normal',
      UserName: email,
      Password: password,
    };

    try {
      const response = await apiService.post(
        'LoginAPI/Login',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // console.log('response', response.data);
      if (response.data.statusCode === 1) {
        // Handle successful login
        // Store user login information in AsyncStorage
        try {
          await AsyncStorage.setItem('userEmail', email);
          await AsyncStorage.setItem('userPassword', password);
          await AsyncStorage.setItem('customerId', response.data.customerId.toString());
          // console.log('data123', response.data)
          setCustomerName(response.data.customerName);
          setCustomerId(response.data.customerId);
          setIsLoggedIn(true);
          console.log('Login successful');
          // get cart details
          // await callCart(response.data.customerId);
          // getCart();
          navigation.navigate('Home')
        } catch (error) {
          console.error('Error saving to AsyncStorage:', error);
        }
        // Set customerName and isLoggedIn based on the response


        // You can store tokens or user data here and navigate to another screen.
      } else {
        // Handle the case when credentials are invalid
        setInvalidCredentialsError('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error, display an error message, etc.
    }
  };
  const clearUserData = async (customerId) => {
    try {
      // Check if customerId is available
      if (customerId) {
        // Remove recent searches data
        await AsyncStorage.removeItem(`recentSearches_${customerId}`);
        console.log(`Recent Searches Data for customerId ${customerId} deleted successfully`);
      } else {
        console.log('customerId is null or undefined, cannot clear recent searches data.');
      }
    } catch (error) {
      console.error('Error removing recent searches data from AsyncStorage:', error);
    }
  };
  // console.log('customerId:::::::::', customerId);

  const logout = async () => {
    // Clear cart data before removing user login information from AsyncStorage
    // clearCart();
    // Remove user login information from AsyncStorage
    try {
      // Call clearUserData with the current customerId
      await clearUserData(customerId);
      await AsyncStorage.removeItem('userEmail');
      await AsyncStorage.removeItem('userPassword');
      await AsyncStorage.removeItem('customerId');
      // await AsyncStorage.removeItem(`recentSearches_${customerId}`);
      // Clear cart data from AsyncStorage
      // await AsyncStorage.removeItem('cartData');

    } catch (error) {
      console.error('Error removing from AsyncStorage:', error);
    }
    // Reset customerName and isLoggedIn
    setCustomerName('');
    setCustomerId(null);
    setIsLoggedIn(false);
    // Additional logout logic if needed

    // Redirect to the login screen
    // navigation.navigate('Login');
  };
  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        customerName,
        customerId,
        emailError,
        passwordError,
        invalidCredentialsError,
        isLoggedIn,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
