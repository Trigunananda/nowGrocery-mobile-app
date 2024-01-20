import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import StackNavigator from './navigators/stackNavigator/StackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {AddressProvider} from './context/AddressContext';
import 'react-native-gesture-handler';
import {WishlistProvider} from './context/WishlistContext';
import {CartProvider} from './context/CartContext';
import {SearchProvider} from './context/SearchContext';
import {AuthProvider} from './context/AuthContext';
import SplashScreen from './screens/SplashScreen';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const loadApp = async () => {
      try {
        // Add any asynchronous tasks (e.g., fetching data) needed for app initialization
        // For example, you might want to await an API call here
        // await fetchData();
  
        // Simulate a delay (e.g., 3 seconds)
        await new Promise(resolve => setTimeout(resolve, 1000));
  
        // Hide the splash screen once initialization is complete
        setShowSplash(false);
      } catch (error) {
        console.error('Error during app initialization:', error);
        // Handle any errors that occur during app initialization
        // For example, you might want to show an error screen or retry the initialization
      }
    };
  
    loadApp();
  }, []);
  
  return (
    <NavigationContainer>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <AuthProvider>
          <WishlistProvider>
            <AddressProvider>
              <CartProvider>
                <SearchProvider>
                  <StackNavigator />
                </SearchProvider>
              </CartProvider>
            </AddressProvider>
          </WishlistProvider>
        </AuthProvider>
      )}
    </NavigationContainer>
  );
};

export default App;
const styles = StyleSheet.create({});
