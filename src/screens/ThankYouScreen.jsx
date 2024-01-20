import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, FlatList } from 'react-native';
import apiService from '../services/ApiServices';
import Loader from '../component/Loader';

const ThankYouScreen = ({ route, navigation }) => {
  const { orderData } = route.params;
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await apiService.get(`EOrderAPI/GetSingleOrder/${orderData[0]}`);
        console.log("response order", response);
        console.log("response data order", response.data);
        setOrderDetails(response.data || null);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [orderData]);
  // Use setTimeout to automatically navigate to the Home screen after 10 seconds
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     navigation.navigate('Home');
  //   }, 15000); // 10 seconds in milliseconds

  //   // Clear the timeout when the component is unmounted
  //   return () => clearTimeout(timeout);
  // }, [navigation]);
  const goToOrderDetails = () => {
    navigation.navigate('Order Details', { orderId: orderDetails.eorderMasterId });
  };

  if (!orderDetails) {
    // Render a loading indicator or an error message if orderDetails is not available yet
    return (
      <View  style={{flex:1,justifyContent: "center",alignItems: "center"}}>
        <Loader/>
      </View>
    );
  }

  const renderItem = () => (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Thank You!</Text>
        <Text style={styles.message}>Your order was successfully placed.</Text>
        <Text style={styles.orderNumber}>
          Your Order Number is - {orderDetails.eNowOrderNo}
        </Text>
        <Text style={styles.thankyouMessage}>
          Thank you for your order! We're excited to get your items to you.
        </Text>
        <Text style={styles.emailMessage}>
          An email including the details about your order has been sent to your
          email address. Please keep it for your records.
        </Text>
        <Text style={styles.orderStatus}>
          You can view the status of your order and manage your account on the
          My Orders page. Or click here to view the{' '}
          <TouchableOpacity onPress={goToOrderDetails}>
            <Text style={{ textDecorationLine: 'underline', textDecorationColor: 'black', backgroundColor: 'gray',color:'white' }}>Order Details</Text>
          </TouchableOpacity>
        </Text>
        <Button
          title="Continue Shopping"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </View>
  );

  return <FlatList data={[orderDetails]} keyExtractor={() => 'orderDetails'} renderItem={renderItem} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  header: {
    color:'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    marginBottom: 10,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black'
  },
  thankyouMessage: {
    fontSize: 16,
    marginBottom: 10,
    color:'black'
  },
  emailMessage: {
    fontSize: 16,
    marginBottom: 10,
    color:'black'
  },
  orderStatus: {
    fontSize: 16,
    marginTop: 10,
    color:'black'
  },
});

export default ThankYouScreen;
