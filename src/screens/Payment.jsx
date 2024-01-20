import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import apiService from '../services/ApiServices';
import { useAuth } from '../context/AuthContext';
import Razorpay from 'react-native-razorpay';
import Loader from '../component/Loader';


const Payment = ({ route, navigation }) => {
  const { totalAmountValue, storedAddressId, selectedAddressId,totalAMountValuewithShipping } = route.params
  // console.log("totalAMountValuewithShipping", totalAMountValuewithShipping)
  // console.log("storedAddressId@@@@@@", storedAddressId)
  const { cart,clearCart } = useCart();
  const { email, customerId } = useAuth();
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);
  const handlePaymentOptionSelect = async (option) => {
    console.log("option", option)
    setSelectedPaymentOption(option);
    // Assuming you have a function to handle payment and return an order ID
    // const orderID = await handlePayment(option);
    // setOrderId(orderID);
  };
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
  const numberOfDaysToAdd = 3; // Change this value to extend the date by a different number of days

  const extraDate = new Date(currentDate);
  extraDate.setDate(currentDate.getDate() + numberOfDaysToAdd);
  const dueDate = extraDate.toISOString().split('T')[0];
  const handlePayment = async (paymentOption) => {
    if (paymentOption === 'payOnline') {
      try {
        const options = {
          description: 'Payment for your order',
          // image: 'https://example.com/logo.png', // Replace with your logo URL
          currency: 'INR',
          key: 'rzp_test_kthnEBbY7C7muy',
          amount: Math.round(totalAMountValuewithShipping * 100), // Amount is in paisa
          name: 'NowGrocery',
          prefill: {
            email: email,
            contact: '9999999999',
          },
          theme: { color: '#3399cc' },
        };

        const paymentResponse = await Razorpay.open(options);
        console.log('Payment Response:', paymentResponse);

        // Handle the payment response, and you can get an order ID from Razorpay
        const orderID = paymentResponse.razorpay_payment_id;
        return orderID;
      } catch (error) {
        console.error('Error processing payment:', error);
        // Handle error, show an error message, etc.
        throw new Error('Payment failed');
      }
    } else {
      // For other payment options (cash on delivery, card on delivery), return a placeholder order ID
      return 'random_order_id';
    }
  };

  const getPaymentModeId = () => {
    switch (selectedPaymentOption) {
      case 'cardOnDelivery':
        return 1;
      case 'cashOnDelivery':
        return 2;
      case 'payOnline':
        return 3;
      default:
        return null;
    }
  };

  const handlePlaceOrder = async () => {
    // console.log('handlePlaceOrder function called');
    // Build your payload based on the selected payment option
    // Extracting product information from the cart
    const responseCart = [];
    let subTotal = 0; // Initialize subTotal variable
    for (const item of cart) {
      // console.log('pay item',item);
      const quantity = item.quantity || 1;
      const itemPrice = parseInt(item.price, 10);
  console.log("rate itemPrice",itemPrice)
      // Calculate SubTotal for each item and add to the running total
      let itemSubTotal = itemPrice * quantity;
  
      // Add additional charges if the itemSubTotal is less than 500
      itemSubTotal += itemSubTotal < 500 ? 50 : 0;
  console.log("itemSubTotal",itemSubTotal)
      subTotal += itemSubTotal;
      const eOrderItem = {
        "BatchId": item.batchId,
        "Discount": 0,
        "ProductId": item.productId,
        "Quantity": quantity,
        "Rate": itemPrice,
        "StoreId": null,
        "SubTotal": itemSubTotal,
        "TaxAmount": 0,
        "TaxCess": 0
      };
      responseCart.push(eOrderItem);
    }
    // Now, use responseCart in your EOrder array
    const eOrder = [...responseCart];
     // Calculate subTotal based on the cart items
  // const subTotal = responseCart.reduce((total, item) => total + item.SubTotal, 0);

  // Calculate additional charges based on the condition
  // const additionalCharges = subTotal < 500 ? 50 : 0;
    const payload = {
      "EorderMaster": {
        "PhonepeTransactionId": "no",
        "EOrderCustomerId": customerId,
        "EOrderStatusId": 1,
        "ETimeSlotId": 2,
        "EOrderTypeId": 1,
        "EOrderNo": null,
        "EOrderAmt": subTotal,
        "EShippingAmt": 0,
        "EDiscountAmt": 0,
        "EGrandTotal": subTotal,
        "EOrderDate": formattedDate,
        "EOrderDueDate": dueDate,
        "EPaymentModeId": getPaymentModeId(),
        "EPaymentStatusId": 2,
        "ETotalSaving": 0,
        // Use the storedAddressId if available, otherwise use selectedAddressId
        "EAddressId": storedAddressId || selectedAddressId,
        "StoreId": "14",
        "ReferralPoint": 0,
        "NowPoint": 0,
        "CouponId": null
      },
      "EOrder": eOrder,
      "ReferralPoint": 0,
      "ReferralMoney": 0,
      // 'RazorpayOrderID': orderID,
    }
    console.log("payload", payload)
    try {
      // Make a request to your API endpoint
      const orderID = await handlePayment(selectedPaymentOption);
      // Make a request to your API endpoint
      const response = await apiService.post('EOrderAPI/EorderAdd', payload, { 'RazorpayOrderID': orderID }, {
        headers: {
          'Content-Type': 'application/json',
        },
      },);
      // console.log("hi")
      console.log('API Response of staging api check:', response);
      // Handle the response, navigate to the thank you screen, etc.
      const orderResponse = response.data
      console.log('Order placed successfully:', orderResponse);
          // Set the orderPlaced state to true
    setOrderPlaced(true);
      // Clear the cart after placing the order
      clearCart();
      // Navigate to thank you screen or handle success
      navigation.navigate('Thankyou', { orderData: orderResponse });
    } catch (error) {
      // Handle error
      console.error('Error placing order:', error);
      // If available, log the response data from the server
      // if (error.response) {
      //   console.error('Response data:', error.response.data);
      // }
    }
  };


  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Price Details Section */}
      {/* <View style={styles.totalAmountCard}>
        <Text style={styles.amount}>Total Bill: ₹136.95</Text>
      </View> */}

      {/* Payment Options Section */}
      <View style={styles.paymentOptionSection}>
        <Text style={styles.paymentOptionsLabel}>Select Payment Option</Text>
        <View style={styles.paymentOption}>
          <Radio
            paymentOption="cardOnDelivery"
            selected={selectedPaymentOption === 'cardOnDelivery'}
            onSelect={handlePaymentOptionSelect}
          />
          <Text style={styles.paymentOptionText}>Card On Delivery</Text>
          <Image source={require('../../assets/images/paymentLogo/card.png')} style={styles.paymentIcon} />
        </View>
        <View style={styles.paymentOption}>
          <Radio
            paymentOption="cashOnDelivery"
            selected={selectedPaymentOption === 'cashOnDelivery'}
            onSelect={handlePaymentOptionSelect}
          />
          <Text style={styles.paymentOptionText}>Cash on Delivery</Text>
          <Image source={require('../../assets/images/paymentLogo/cod.png')} style={styles.paymentIcon} />
        </View>
        <View style={styles.paymentOption}>
          <Radio
            paymentOption="payOnline"
            selected={selectedPaymentOption === 'payOnline'}
            onSelect={handlePaymentOptionSelect}
          />
          <Text style={styles.paymentOptionText}>Pay Online</Text>
          <Image source={require('../../assets/images/paymentLogo/razorPay.png')} style={styles.paymentIcon} />
        </View>
      </View>
      {/* <View style={styles.priceDetailsContainer}>
        <Text style={styles.priceDetailsText}>Price Details</Text>
        <Text style={styles.priceTextDetails}>Price ({totalItems} item)</Text>
        <Text style={styles.priceTextDetails}>Delivery Charges ({totalItems} item)</Text>
        <Text>Total: ₹136.95</Text>
      </View> */}
      <View style={styles.priceCardlabel}>
        <Text style={styles.lableText}>Price Details</Text>
      </View>
      <View style={styles.priceCard}>
        <View style={[{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderStyle: 'dashed' }]}>
          <View style={{ flexDirection: "row" }}>
            <View >
              <Text style={styles.priceText}>Price ({totalItems} Items)</Text>

              <Text style={styles.priceText}>Delivery Charges</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={styles.priceValue}>{totalAmountValue}</Text>

              <Text style={styles.priceValue}> {totalAmountValue < 500 ? '₹50.00' : 'FREE Delivery'}</Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View >
            <Text style={styles.priceText}>Amount Payable</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={styles.priceValue}>₹{(parseFloat(totalAmountValue) + (totalAmountValue < 500 ? 50 : 0)).toFixed(2)}</Text>
          </View>
        </View>
      </View>

      {/* Logo Section */}
      {/* <View style={styles.logoContainer}>
        <Text>Hello</Text>
      </View> */}
      {/* Continue Button */}
      <View style={styles.continueButtonContainer}>
        <Text style={styles.priceTextValue}>₹{(parseFloat(totalAmountValue) + (totalAmountValue < 500 ? 50 : 0)).toFixed(2)}</Text>
        <TouchableOpacity style={styles.continueButton} onPress={handlePlaceOrder}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Sample Radio component
const Radio = ({ paymentOption, selected, onSelect }) => (
  <TouchableOpacity onPress={() => onSelect(paymentOption)}>
    <View style={styles.radioIcon}>
      {selected && <View style={styles.selectedRadioCircle} />}
    </View>
  </TouchableOpacity>
);

export default Payment;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
  },
  totalAmountCard: {
    height: 60,
    marginTop: 12,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 2,
  },
  amount: {
    fontSize: 20,
    color: 'black',
  },
  paymentOptionSection: {
    marginVertical: 16,
    paddingHorizontal: 10,
  },
  paymentOptionsLabel: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  paymentOptionText: {
    marginLeft: 8,
    fontSize: 18,
    color: 'black'
  },
  paymentIcon: {
    marginLeft: 'auto',
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  priceCardlabel: {
    marginVertical: 16,
    paddingHorizontal: 10,
  },
  lableText: {
    color:'black',
    textTransform: 'uppercase'
  },
  priceCard: {
    padding: 10,
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
  // logoContainer: {
  //   alignItems: 'center',
  //   marginTop: 60,
  // },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  priceDetailsContainer: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  priceDetailsText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  continueButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    position: 'sticky',
    bottom: 0,
    elevation: 4,
    marginTop: 90,
  },
  priceTextValue: {
    fontSize: 18,
    color: 'black',
  },
  continueButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  radioIcon: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  selectedRadioCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#3498db',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});
