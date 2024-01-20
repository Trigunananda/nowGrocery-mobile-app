import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MainTabNavigator from '../bottomTabNavigator/MainTabsNavigator';


import Account from '../../screens/tab-Screens/myAccount/Account';
import LoginScreen from '../../screens/login/LoginScreen';
import SignUpScreen from '../../screens/register/SignUpScreen';
import ForgotPassword from '../../screens/forgotPassword/ForgotPassword';
import ProfileScreen from '../../screens/tab-Screens/myAccount/ProfileScreen';

import AddAddressScreen from '../../screens/address/AddAddressScreen';
import AddEditAddressScreen from '../../screens/address/AddEditAddressScreen';
import OrderScreen from '../../screens/tab-Screens/myAccount/OrdersScreen';
import OrderStatus from '../../screens/tab-Screens/myAccount/OrderStatus';
import MyCartDetails from '../../screens/MyCartDetails';
import ProductPage from '../../screens/tab-Screens/Home/ProductPage';
import BankOfferAccordionScreen from '../../screens/tab-Screens/Home/AccordionItem';
import Payment from '../../screens/Payment';
import Category from '../../screens/tab-Screens/Category';
import OrderSummary from '../../screens/OrderSummary';
import WishlistScreen from '../../screens/tab-Screens/Wishlist';
import VerifyOtp from '../../screens/login/VerifyOtp';
import ProductListSection from '../../screens/tab-Screens/Home/ProductListSection';
import ContactUs from '../../screens/tab-Screens/myAccount/ContactUs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useCart } from '../../context/CartContext';
import Badge from '../../component/Badge/Badge';
import SearchResultsScreen from '../../screens/tab-Screens/Home/SearchResultScreen';
import ThankYouScreen from '../../screens/ThankYouScreen';
import ProductsItem from '../../screens/tab-Screens/Home/ProductsItem';
import TermsAndConditionsScreen from '../../screens/tab-Screens/myAccount/TermsandCondition';
import PrivacyPolicyScreen from '../../screens/tab-Screens/myAccount/PrivacyPolicy';
import ShippingPolicyScreen from '../../screens/tab-Screens/myAccount/ShippingPolicy';
import ReferralAndEarn from '../../screens/tab-Screens/myAccount/ReferralAndEarn';
const Stack = createStackNavigator();

export default function StackNavigator() {
  const { getTotalQuantity } = useCart();

  return (
    <Stack.Navigator initialRouteName="MainTabs" >
      <Stack.Screen name='MainTabs' component={MainTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="SearchScreen"
        component={SearchResultsScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="arrow-left"
              size={23}
              color="#000"
              padding={6}
              onPress={() => navigation.goBack()} // Add navigation action here
            />
  
          ),
        })}
      />
      <Stack.Screen name='Product' component={ProductPage} options={({ navigation }) => ({
        headerTitle: '', // Set headerTitle to null to hide the title
        headerLeft: () => (
          <Icon
            name="arrow-left"
            size={23}
            color="#000"
            padding={6}
            onPress={() => navigation.goBack()} // Add navigation action here
          />

        ),
        headerRight: () => (
          <TouchableOpacity activeOpacity={1} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }} onPress={() => navigation.navigate('My Cart')}>
            {/* Add your cart icon here */}
            <Icon
              name="shopping-cart" // Replace with your cart icon
              size={23}
              color="#000"
              padding={6}
            />

            {getTotalQuantity() > 0 && ( // Check if the cart count is greater than 0
              /* Cart count with top right positioning */
              <View style={{
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: 'red',
                borderRadius: 10,
                paddingHorizontal: 5,
              }}>
                <Text style={{ color: 'white', fontSize: 12 }}>
                  {getTotalQuantity()}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ),
  //  headerTitleContainerStyle: {
  //     left: 0,
  //     right: 0,
  //     position: 'absolute',
  //   },
  //   headerTitleAlign: 'center',
  //   headerTitle: () => (
  //     <TouchableOpacity
  //       style={{
  //         flexDirection: 'row',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //       }}
  //       onPress={() => navigation.navigate('SearchScreen')}
  //     >
  //       <Icon name="search" size={23} color="#000" />
  //       <Text style={{ marginLeft: 5, fontSize: 16 }}>Search</Text>
  //     </TouchableOpacity>
  //   ),
      })}
      />
      {/* <Stack.Screen name='All categories' component={Category} /> */}
      {/* <Stack.Screen name='Top Selling Products' component={ProductListSection} /> */}
      <Stack.Screen name='Top Selling Products' component={ProductListSection} options={({ navigation }) => ({
        // headerTitle: '', // Set headerTitle to null to hide the title
        headerLeft: () => (
          <Icon
            name="arrow-left"
            size={23}
            color="#000"
            padding={6}
            onPress={() => navigation.goBack()} // Add navigation action here
          />

        ),
        headerRight: () => (
          <TouchableOpacity activeOpacity={1} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }} onPress={() => navigation.navigate('My Cart')}>
            {/* Add your cart icon here */}
            <Icon
              name="shopping-cart" // Replace with your cart icon
              size={23}
              color="#000"
              padding={6}
            />

            {getTotalQuantity() > 0 && ( // Check if the cart count is greater than 0
              /* Cart count with top right positioning */
              <View style={{
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: 'red',
                borderRadius: 10,
                paddingHorizontal: 5,
              }}>
                <Text style={{ color: 'white', fontSize: 12 }}>
                  {getTotalQuantity()}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ),

      })}
      />

      <Stack.Screen name="Wishlist" component={WishlistScreen} />
      <Stack.Screen name='My Cart' component={MyCartDetails} />
      <Stack.Screen name="Account" component={Account} screenOptions={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="My Orders" component={OrderScreen} />
      <Stack.Screen name="Order Details" component={OrderStatus} />
      <Stack.Screen name="Forgot-Password" component={ForgotPassword} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="AddAddress" component={AddAddressScreen} />
      <Stack.Screen name="EditAddress" component={AddEditAddressScreen} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name='Order Summary' component={OrderSummary} />
      <Stack.Screen name='Thankyou' component={ThankYouScreen} />
      <Stack.Screen name='Contact Us' component={ContactUs} />
      <Stack.Screen name='Verify OTP' component={VerifyOtp} options={{ headerShown: false }} />
      <Stack.Screen name='terms-and-conditions' component={TermsAndConditionsScreen}  />
      <Stack.Screen name='privacy-policy' component={PrivacyPolicyScreen}  />
      <Stack.Screen name='shipping-policy' component={ShippingPolicyScreen}  />
      <Stack.Screen name='Refer-earn' component={ReferralAndEarn}  />
      {/* <Stack.Screen name='Verify OTP' component={VerifyOtp} options={{ headerShown: false }} /> */}

      {/* <Stack.Screen name="BankOfferAccordion" component={BankOfferAccordionScreen} options={{ title: 'Bank Offer' }} /> */}


    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({});