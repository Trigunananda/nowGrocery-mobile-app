import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Razorpay from 'react-native-razorpay';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import apiService from '../services/ApiServices';
import { useAddressContext } from '../context/AddressContext';
import { useCart } from '../context/CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
const OrderSummary = ({ route, navigation }) => {
  const { cart } = useCart();
  const { email, customerId } = useAuth();
  const { ApiResponseAddAddress } = useAddressContext();
  // console.log('customerId',customerId)
  // console.log('ApiResponseAddAddress',ApiResponseAddAddress)
  const { selectedAddressId, selectedAddress } = route.params;
  const [address, setAddress] = useState(selectedAddress);
  const [storedAddressId, setStoredAddressId] = useState(null);
  // let totalItemsValue = cart && totalItems ? cart.reduce((acc, item) => acc + (item.quantity || 1), 0) : 1
  //  console.log("Cart:", cart);
  //  console.log("totalAmountValue:", totalAmountValue);
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
  const numberOfDaysToAdd = 3; // Change this value to extend the date by a different number of days

  const extraDate = new Date(currentDate);
  extraDate.setDate(currentDate.getDate() + numberOfDaysToAdd);
  const dueDate = extraDate.toISOString().split('T')[0];
  // console.log("dueDate ", dueDate)
  useEffect(() => {
    const fetchSelectedAddress = async () => {
      try {
        const storedAddress = await AsyncStorage.getItem('selectedAddress');
        console.log("storedAddress", storedAddress)
        console.log("storedAddress", typeof storedAddress)
        if (storedAddress) {
          const parsedAddress = JSON.parse(storedAddress);
          // console.log("parsedAddress", typeof parsedAddress)
          setAddress(parsedAddress);
          if (parsedAddress?.customerAddressId) {
            setStoredAddressId(parsedAddress.customerAddressId);
          } else {
            setStoredAddressId(null); // Set to null if 'id' is not present
          }
        }
      } catch (error) {
        console.error('Error fetching selected address from AsyncStorage:', error);
      }
    };

    fetchSelectedAddress();
  }, [selectedAddress]);
  // console.log("storedAddressId", storedAddressId)
  // console.log("selectedAddressId", selectedAddressId)
  useEffect(() => {
    const saveSelectedAddress = async () => {
      try {
        if (address !== null && address !== undefined) {
          await AsyncStorage.setItem('selectedAddress', JSON.stringify(address));
        }
      } catch (error) {
        console.error('Error saving selected address to AsyncStorage:', error);
      }
    };

    saveSelectedAddress();
  }, [address]);


  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  // console.log('totalItems', totalItems);
  // Helper functions for calculations
  function calculateTotalMRP(cart) {
    const totalMRP = cart.reduce((total, item) => {
      // console.log(`Item: ${item.title}, Quantity: ${item.quantity}, Price: ${item.price * item.quantity},total:${total}`);
      return total + ((item.mrp || 0) * (item.quantity || 1));
      // return total + item.mrp;
    }, 0);

    // console.log(`Total MRP: ${totalMRP}`);
    return totalMRP.toFixed(2);
  }

  function calculateTotalAmount(cart) {
    const totalDiscount = cart.reduce((total, item) => {
      // console.log(`Item: ${item.title}, Quantity: ${item.quantity}, Price: ${item.price * item.quantity},total:${total}`);
      // return total + (item.mrp * item.quantity) * 1 / 4
      return total + ((item.price || 0) * (item.quantity || 1));
    }, 0);
    // console.log(`totalDiscount: ${totalDiscount}`);
    return totalDiscount.toFixed(2)
  }
  // return cart.reduce((total, item) => total + (item.mrp - item.price) * item.quantity, 0);
  function calculateDiscount(cart) {
    return ((calculateTotalMRP(cart) - calculateTotalAmount(cart)).toFixed(2));
  }

  // function calculateTotalPayable(cart) {
  //   return calculateDiscount(cart) + 50; // Adding delivery charges
  // }
  // console.log('cartItem', cart)

  // Now you can use your custom calculation functions

  const totalMRPValue = calculateTotalMRP(cart);
  const totalAmountValue = calculateTotalAmount(cart);
  const totalDiscountValue = calculateDiscount(cart);




  return (
    <ScrollView showsVerticalScrollIndicator={false}  // Hide vertical scroll indicator
    showsHorizontalScrollIndicator={false}>
      <View style={{ paddingTop: 12 }}>
        <View style={styles.adressCardLabel}>
          <Text style={styles.lableText}>Delivery To</Text>
        </View>
        <View style={styles.card}>
        {address ? (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View>
          <Text style={[styles.addressCardContent, styles.name]}>{address?.name}</Text>
        </View>
        <View style={styles.changeButton}>
          <TouchableOpacity onPress={() => navigation.navigate('AddAddress', { isFromOrderSummary: true })} title="Change">
            <Text style={styles.shopNowButtonText}>Change</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.addressCardContent}>{`${address?.address}, ${address?.landmark}, ${address?.locality},${address?.city}, ${address?.state}, ${address?.pincode}`}</Text>
      <Text style={styles.addressCardContent}>{address?.alternateMobileNumber}</Text>
    </View>
  ) : (
    <View>
       <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
           <View>
      <Text style={styles.addressCardContent}>No delivery address selected.</Text>
      </View>
      <View style={styles.changeButton}>
      <TouchableOpacity onPress={() => navigation.navigate('AddAddress', { isFromOrderSummary: true })} title="Add">
            <Text style={styles.shopNowButtonText}>Add</Text>
          </TouchableOpacity>
          </View>
          </View>
    </View>
  )}

        </View>
      </View>
      {/* <View style={{ paddingHorizontal: 10 }}>
        <Text style={styles.sliderHeaderText}>Grocery Basket </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            <View style={styles.sliderCard}>
              <Image
                source={require('../../assets/images/groceryFoods/dryFruits/almond-1.jpg')}
                style={styles.productImage}
              />
            </View>
            <Text style={{ color: 'black', textAlign: 'center' }}>Almond</Text>
          </View>
          <View>
            <View style={styles.sliderCard}>
              <Image
                source={require('../../assets/images/groceryFoods/attaFlour/bajra-dalia.jpg')}
                style={styles.productImage}
              />
            </View>
            <Text style={{ color: 'black', textAlign: 'center' }}>Bajra Dalia</Text>
          </View>
          <View>
            <View style={styles.sliderCard}>
              <Image
                source={require('../../assets/images/groceryFoods/attaFlour/maida.jpg')}
                style={styles.productImage}
              />
            </View>
            <Text style={{ color: 'black', textAlign: 'center' }}>Maida</Text>
          </View>
          <View>
            <View style={styles.sliderCard}>
              <Image
                source={require('../../assets/images/groceryFoods/attaFlour/wheat-dalia.jpg')}
                style={styles.productImage}
              />
            </View>
            <Text style={{ color: 'black', textAlign: 'center' }}>Wheat Dalia</Text>
          </View>
        </ScrollView>
      </View> */}
      <View style={{ paddingTop: 30 }}>
        <View style={styles.priceCardlabel}>
          <Text style={styles.lableText}>Price Details</Text>
        </View>
        <View style={styles.priceCard}>
          <View style={[{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderStyle: 'dashed' }]}>
            <View style={{ flexDirection: "row" }}>
              <View >
                <Text style={styles.priceText}>MRP ({totalItems} Items)</Text>
                <Text style={styles.priceText}>Product Discount</Text>
                <Text style={styles.priceText}>Sub Total</Text>
                <Text style={styles.priceText}>Delivery Charges</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={styles.priceValue}>{totalMRPValue}</Text>
                <Text style={styles.priceValue}>{totalDiscountValue}</Text>
                <Text style={styles.priceValue}>{totalAmountValue}</Text>
                <Text style={styles.priceValue}>{totalAmountValue < 500 ? '₹50.00' : 'FREE Delivery'}</Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View >
              <Text style={styles.priceText}>Total Amount</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={styles.priceValue}>₹{(parseFloat(totalAmountValue) + (totalAmountValue < 500 ? 50 : 0)).toFixed(2)}</Text>
            </View>
          </View>
        </View>
        {/* <TouchableOpacity style={{backgroundColor:'red'}} onPress={() => navigation.navigate('Thankyou')}>
            <Text style={{color:'white'}}>Shop Now</Text>
          </TouchableOpacity> */}
        <View style={styles.checkoutSticky}>
          <Text style={styles.checkoutPrice}>₹{(parseFloat(totalAmountValue) + (totalAmountValue < 500 ? 50 : 0)).toFixed(2)}</Text>
          <View style={styles.checkoutButtonContainer}>
            {/* <Button title="Continue" color={'#FB641B'} onPress={() => navigation.navigate('Payment', { name: 'Payment' })} /> */}
            {/* <Button title="Continue" color={'#FB641B'} onPress={initializeRazorpay} /> */}
            <Button
              title="Continue"
              color={'#FB641B'}
              onPress={() => {
                const totalAMountValuewithShipping = (parseFloat(totalAmountValue) + (totalAmountValue < 500 ? 50 : 0)).toFixed(2);
                console.log('totalAMountValuewithShipping:', totalAMountValuewithShipping);
                navigation.navigate('Payment', {
                  totalAmountValue,
                  storedAddressId,
                  selectedAddressId,
                  totalAMountValuewithShipping,
                });
              }}
            />
          </View>

        </View>

      </View>
    </ScrollView>
  )
}

export default OrderSummary

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 8,
    backgroundColor: "#fff",
    height: 100,
  },
  addressCardContent: {
    elevation: 2,
    paddingLeft: 10,
    color: '#242B2E',
    paddingBottom: 4,
    fontSize: 15
  },
  adressCardLabel: {
    height: 22,
    width: 100,
    paddingLeft: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginLeft: 12,
    backgroundColor: "green"
  },
  changeButton: {
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.4)',
    backgroundColor: 'gray',
    borderRadius: 5,
    paddingVertical: 7,
    paddingHorizontal: 15,
    alignSelf: 'center',
  },
  shopNowButtonText: {
    color: '#fff', // Transparent blue text color
    fontSize: 16,
    textAlign: 'center',
  },
  lableText: {
    color: "#fff"
  },
  width: 120,
  height: 120,
  resizeMode: 'cover',
  borderRadius: 8,
  name: {
    fontSize: 17,
    paddingTop: 6
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  sliderHeaderText: {
    padding: 12,
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    color: 'black'
  },
  sliderCard: {
    marginRight: 5,
    elevation: 2,
    height: 100,
    width: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    borderRadius: 8,
    // backgroundColor:'red'
  },
  priceCardlabel: {
    elevation: 2,
    marginLeft: 13,
    height: 25,
    width: 100,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingLeft: 12,
    backgroundColor: "green"
  },
  priceCard: {
    elevation: 2,
    marginHorizontal: 8,
    backgroundColor: "#fff",
    // height:170,
  },
  priceText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 10,
    marginVertical: 5
  },
  priceValue: {
    color: '#888888',
    fontSize: 16,
    fontWeight: 'bold',
    paddingRight: 10,
    marginVertical: 5
  },
  checkoutSticky: {
    elevation: 2,
    position: 'sticky',
    bottom: 0,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderTopWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginVertical: 100,
    marginHorizontal: 8
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },
  checkoutPrice: {
    fontSize: 16,
    color: '#333333'
  },
  checkoutButtonContainer: {
    // flex: 1,
    alignItems: 'flex-end',
    //  backgroundColor:'#FB641B',
  },

})