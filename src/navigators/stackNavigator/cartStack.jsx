import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MyCartDetails from '../../screens/MyCartDetails';
import OrderSummary from '../../screens/OrderSummary';
const Stack = createStackNavigator();
export default function CartStack() {
  return (
    <Stack.Navigator>
    <Stack.Screen name='My Cart' component={MyCartDetails}  />
    {/* <Stack.Screen name='Order Summary' component={OrderSummary}  /> */}
    {/* <Stack.Screen name='Favorite' component={WishlistScreen} /> */}

    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})