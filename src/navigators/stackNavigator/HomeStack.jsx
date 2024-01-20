import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../../screens/tab-Screens/Home/Home';
import ProductPage from '../../screens/tab-Screens/Home/ProductPage';
import AddEditAddressScreen from '../../screens/address/AddEditAddressScreen';
import ProductListSection from '../../screens/tab-Screens/Home/ProductListSection';
const Stack = createStackNavigator();
export default function HomeStack() {
  return (
    <Stack.Navigator>
    <Stack.Screen name='Home screen' component={HomeScreen}  />
    <Stack.Screen name='Product' component={ProductPage} />
    <Stack.Screen name="EditAddress" component={AddEditAddressScreen}/>
    {/* <Stack.Screen name='Top Selling Products' component={ProductListSection} /> */}
    {/* <Stack.Screen name='Favorite' component={WishlistScreen} /> */}

    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})