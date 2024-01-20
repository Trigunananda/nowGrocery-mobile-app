

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Button, ScrollView, StyleSheet, Image, ImageBackground, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DeliveryAddressModal from './modals/DeliveryAddressModal';
import { TextInput } from 'react-native-gesture-handler';
import { useCart } from '../context/CartContext';

const IMG_URL = 'https://cdn2.nowgrocery.com/Uploads/';

const MyCartDetails = ({ navigation }) => {
  
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();

  // console.log('cart############',cart)
  const fadeAnim = useState(new Animated.Value(0))[0]; // Initial value for opacity: 0
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [getcart, setCartData] = useState(cart);
  // console.log('my-cart',cart)
  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
  };
  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };


  const [totalMRP, setTotalMRP] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  
  useEffect(()=>{
    // loadCartFromApi();
    // callCart()
    if(cart.length > 0){
      // console.log("Main Tab Navigation!!!!!!!!!!", cart);
    }else{
      console.log('no data on cart please check it')
    }
    
    // saveCartToStorage()
  },[cart]);
  function animatedButton() {
    const fadeInOut = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 2500, // Duration of the fade-in animation
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000, // Duration of the fade-out animation
          useNativeDriver: false,
        }),
      ]),
      { iterations: -1 } // Loop indefinitely
    );

    fadeInOut.start();

    return () => fadeInOut.stop();// Stop the animation when the component unmounts
  }
  const colorInterpolate = fadeAnim.interpolate({
    inputRange: [0.9, 1],
    outputRange: ['#FFFFFF', '#edd10c'], // Start with white and end with red
  });
  const colorInterpolateOffer = fadeAnim.interpolate({
    inputRange: [0.6, 1],
    outputRange: ['#f2cd11', '#259c29'], // Start with white and end with golden
  });
  const handleAddMoreItems = () => {
    // Navigate to the screen where users can add more items
    navigation.navigate('Home'); // Replace 'AddItemsScreen' with your target screen name
  };
  const removeItemFromCart = (item) => {
    // const updatedCart = cart.filter(cartItem => cartItem.id !== itemId);
    // setCartData(updatedCart);
    removeFromCart(item);
  };
  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  console.log('totalItems', totalItems);
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
  const totalMRPValue = calculateTotalMRP(cart);
  const totalAmountValue = calculateTotalAmount(cart);
  const totalDiscountValue = calculateDiscount(cart);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.headerText}>My Cart</Text> */}
      {totalItems === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Your Bag is empty</Text>
          <TouchableOpacity style={styles.shopNowButton} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.shopNowButtonText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}  // Hide vertical scroll indicator
          showsHorizontalScrollIndicator={false} >

          <TouchableOpacity style={styles.groceryButtonContainer} onPress={handleAddMoreItems}>

            {/* <Text style={styles.buttonText}>Add More Grocery Item</Text> */}
            <View style={styles.button}>
              {/* <Animated.Text style={[styles.buttonText, { opacity: fadeAnim, color: colorInterpolate }]}>Add More Grocery Item</Animated.Text> */}
              <Text style={[styles.buttonText]}>Add More Grocery Item</Text>
              <View style={styles.iconContainer}>
                <Icon name="chevron-right" size={22} style={styles.chevronIcon} />
              </View>
            </View>

            {/* </ImageBackground> */}
          </TouchableOpacity>
          {cart.map(item => {
            const mrp = item.mrp;
            const price = item.price;
            const offerPercentage = (((mrp - price) / mrp) * 100).toFixed(0);
            return (
              <View key={item.productId} style={styles.cartItem}>
                <Image source={{ uri: IMG_URL + item.imageUrl }} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle}>{item.productName}</Text>
                  {/* <Text style={[styles.itemPrice,styles.strikethrough]}>₹{item.mrp * item.quantity}</Text> */}
                  {/* Offer, MRP, and Price */}
                  <View style={styles.offerRow}>
                    {/* <Text style={styles.offerText}>75% Off</Text> */}
                    <Text style={styles.offerTextBackground}><Animated.Text
                      style={[styles.offerText,
                      { opacity: fadeAnim, color: colorInterpolateOffer }]}>{offerPercentage}% off</Animated.Text></Text>
                    <Text style={[styles.itemPrice, styles.strikethrough]}> ₹{((mrp || 0) * (item.quantity || 1)).toFixed(2)}</Text>
                    {/* <Text style={[styles.itemPrice, styles.strikethrough]}>₹{item.mrp * item.quantity}</Text> */}
                    <Text style={styles.itemPrice}>₹{((((price) || 0) * (item.quantity || 1))).toFixed(2)}</Text>
                    {/* <Text style={styles.itemPrice}>₹{item.mrp * item.quantity * 3 / 4}</Text> */}
                  </View>
                  <View style={styles.quantityControls}>
                    {item.quantity > 1 ? (
                      <TouchableOpacity onPress={() => decreaseQuantity(item.productId)}>
                        <Icon name="minus-circle" size={20} color="#FF5733" />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => removeItemFromCart(item)}>
                        <Icon name="delete" size={20} color="#FF5733" />
                      </TouchableOpacity>
                    )}

                    <Text style={styles.quantityText}>{item.quantity || 1}</Text>
                    <TouchableOpacity onPress={() => increaseQuantity(item.productId)}>
                      <Icon name="plus-circle" size={20} color="#4CAF50" />
                    </TouchableOpacity>
                  </View>
                </View>

              </View>
            )
          }


          )}
          {totalItems > 0 && (
            <View style={styles.priceDetailsContainer}>
              <Text style={styles.priceDetailsTitle}>Price Details</Text>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Price ({totalItems > 0 ? totalItems : 'null'} items)</Text>
                <Text style={styles.priceValue}>₹{totalMRPValue}</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Discount</Text>
                <Text style={styles.priceValue}>- ₹{totalDiscountValue}</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Subtotal</Text>
                <Text style={styles.priceValue}>₹{totalAmountValue}</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Delivery Charges</Text>
                <Text style={styles.priceValue}> {totalAmountValue < 500 ? '₹50.00' : 'FREE Delivery'}</Text>
              </View>
              <View style={styles.totalPriceRow}>
                <Text style={styles.totalPriceLabel}>Total Amount</Text>
                {/* <Text style={styles.totalPriceValue}>₹{calculateTotalPayable(cart)}</Text> */}
                {/* <Text style={styles.totalPriceValue}>₹{cart.reduce((total, item) => total + item.price * item.quantity, 0)}</Text> */}
                <Text style={styles.totalPriceValue}>₹{(parseFloat(totalAmountValue) + (totalAmountValue < 500 ? 50 : 0)).toFixed(2)}</Text>
              </View>
            </View>
          )}
        </ScrollView>
      )}

      {totalItems > 0 && (
        <View style={styles.checkoutSticky}>
          <Text style={styles.checkoutPrice}> ₹{(parseFloat(calculateTotalAmount(cart)) + (calculateTotalAmount(cart) < 500 ? 50 : 0)).toFixed(2)}</Text>
          <View style={styles.checkoutButtonContainer}>
            <Button title="Place Order" color={'#FB641B'} onPress={() => navigation.navigate('Order Summary',{cart,totalMRPValue,totalAmountValue, totalDiscountValue,totalItems})} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  //add deliver address styling
  deliverToContainer: {
    padding: 16,
    backgroundColor: 'rgba(255,255,255,1)',
    marginBottom: 16,
    elevation: 3,
    borderRadius: 5,
  },
  addressTitle: {
    position: 'absolute',
    padding: 2,
    backgroundColor: 'transparent',
    zIndex: 1,
    borderRightWidth: 1,
    borderRightColor: 'gray',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    borderBottomRightRadius: 5,
    backgroundColor: 'green',
    elevation: 3
  },
  address: {
    color: 'rgba(255,255,255,1)',

  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
    marginBottom: 3,
  },
  deliverToTextContainer: {
    flex: 1,
  },
  addressTextContainer: {
    flex: 3,
  },
  deliverToText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addressText: {
    color: '#333333',
    fontSize: 16,
  },
  subAddressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  changeButton: {
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.4)',
    backgroundColor: '#23a4fa',
    borderRadius: 5,
    paddingVertical: 7,
    paddingHorizontal: 15,
    alignSelf: 'center',
  },
  changeButtonText: {
    color: '#fff', // Transparent blue text color
    fontSize: 16,
    textAlign: 'center',
  },

  // add Grocery button styling
  groceryButtonContainer: {
    marginLeft: '15%',
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    borderRadius: 5,
    resizeMode: 'cover',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  buttonText: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  iconContainer: {
    fontSize: 12,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'#fff'
  },
  chevronIcon: {
    // transform: [{ rotate: '180deg' }],
    color: '#000',
  },

  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyCartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  emptyCartText: {
    color: '#333333',
    fontSize: 18,
    marginBottom: 16,
  },
  shopNowButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  shopNowButtonText: {
    color: '#fff',
    fontSize: 16,
  },

  //cart design in card format
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    marginRight: 16,
    borderRadius: 3
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    color: '#333333',
    fontSize: 16,
    marginBottom: 8,
  },
  offerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginBottom: 8,
  },
  offerTextBackground: {
    backgroundColor: '#273f5e',
    padding: 4,
    borderRadius: 8
  },
  offerText: {
    fontSize: 14,
    // color: 'green',
  },
  itemPrice: {
    fontSize: 14,
    color: '#5c7bd1',
    marginBottom: 8,
    textAlign: 'center'
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    color: '#333333',
    textAlign: 'center'
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
    color: '#333333'
  },

  //place order button sticky
  checkoutSticky: {
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
    marginTop: 8,
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

  //price details styling
  priceDetailsContainer: {
    backgroundColor: '#fff',
    padding: 16,
    elevation: 2,
    // marginTop: 16,
    // marginTop:8
  },
  priceDetailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333333'
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666666',
  },
  priceValue: {
    fontSize: 14,
    color: '#333333',
  },
  totalPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    borderStyle: 'dashed',
    borderTopWidth: 2,
    borderColor: '#ccc',
    paddingTop: 8,
    borderBottomWidth: 1,
    paddingVertical: 8
  },
  totalPriceLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  totalPriceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  // placeOrderButton: {
  //   backgroundColor: '#FB641B',
  //   paddingVertical: 10,
  //   paddingHorizontal: 20,
  //   borderRadius: 4,
  //   alignItems: 'center',
  //   marginTop: 16,
  // },
  // placeOrderButtonText: {
  //   color: '#fff',
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
});

export default MyCartDetails;

