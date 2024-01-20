import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import apiService from '../../../services/ApiServices';
import Loader from '../../../component/Loader';
const IMG_URL = 'https://cdn2.nowgrocery.com/Uploads/';
export default function OrderStatus({ route }) {
    const { orderId } = route.params;
    const [orderDataStatus, setorderDataStatus] = useState(null);

    useEffect(() => {
        const fetchorderDataStatus = async () => {
            try {
                const response = await apiService.get(`EOrderAPI/GetSingleOrder/${orderId}`);
                // const data = await response.json();
                setorderDataStatus(response.data);
            } catch (error) {
                console.error('Error fetching order data:', error);
            }
        };

        fetchorderDataStatus();
    }, [orderId]);

    if (!orderDataStatus) {
        return (
            <View  style={{flex:1,justifyContent: "center",alignItems: "center"}}>
            <Loader/>
            </View>
        );
    }

// Extracting the eorderList array from orderDataStatus
const eorderList = orderDataStatus.eorderList || [];

// Calculate the total price by multiplying mrp and quantity for each item
const totalPrice = eorderList.reduce((total, item) => {
  // Make sure both mrp and quantity are defined in the item
  if (item.mrp !== undefined && item.quantity !== undefined) {
    total += item.mrp * item.quantity;
  }
  return total;
}, 0);
// Calculate the total quantity by summing up the quantity for each item
const totalQuantity = eorderList.reduce((total, item) => total + (item.quantity || 0), 0);
    console.log("orderDataStatus", orderDataStatus)
    // console.log("orderDataStatus-image", orderDataStatus.eorderList[0].imageUrl)
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.detailsContainer}>
                <Text style={styles.sectionTitle}>Order Details</Text>
                <View style={styles.sectionContent}>
                    <View style={styles.orderBlock}>
                        <Text style={styles.addressText}>Order Id - {orderDataStatus.eNowOrderNo}</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Product Details</Text>
                <View style={styles.sectionContent}>
                    {orderDataStatus.eorderList.map((item) => {
                    // console.log("indivisual-orderDataStatus",item)
                    // console.log("item.subTotal",typeof item.subTotal)
                    return(
                        <View key={item.eorderItemId} style={styles.productDetailsContainer}>
                            <View style={styles.productDetails}>
                                <Text style={styles.productTitle}>{item.productName}</Text>
                                {/* <Text style={styles.aboutSeller}>Seller: {orderDataStatus.name}</Text> */}
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.productPrice}>₹ {Math.round(item.subTotal < 500 ? item.subTotal + 50 : item.subTotal)}</Text>
                                    <Text style={styles.showOffer}>{item.quantity} {item.quantity > 1 ? 'items' : 'item'}</Text>
                                </View>
                            </View>
                         
                                <Image
                                    source={{ uri: IMG_URL + item.imageUrl }}
                                    style={styles.productImage}
                                />
         
                        </View>
                    )}
                    )}
                    {/* <View style={styles.seeAllUpdates}>
                        <Text style={styles.allUpdate}>See All Updates</Text>
                        <Icon style={styles.updateIcon} name="chevron-right" size={13} color="#79c1ed" />
                    </View> */}
                </View>

                <Text style={styles.sectionTitle}>Shipping Details</Text>
                <View style={styles.sectionContent}>
                    <View style={styles.addressBlock}>
                        <Text style={styles.addressTextName}>{orderDataStatus.customerName}</Text>
                        <Text style={styles.addressText}>At/Po - {orderDataStatus.customerAddress}</Text>
                        <Text style={styles.addressText}>City-{orderDataStatus.city}, State-{orderDataStatus.state} Pin-{orderDataStatus.pincode}</Text>
                        <Text style={styles.addressText}>Phone number: {orderDataStatus.customerMobile}</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Price Details</Text>
                <View style={styles.sectionContent}>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceTitle}>List Price: {totalQuantity} {totalQuantity > 1 ? 'items' : 'item'}</Text>
                        <Text style={[styles.priceValue, styles.strikethrough]}>₹{totalPrice}</Text>
                    </View>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceTitle}>Selling Price:</Text>
                        <Text style={styles.priceValue}>₹{Math.round(orderDataStatus.eorderAmt)}</Text>
                    </View>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceTitle}>Shipping fee:</Text>
                        <Text style={styles.priceValue}>₹{orderDataStatus.eshippingAmt}</Text>
                    </View>
                    {/* ... (other price details) */}
                    <View style={styles.horizontalBar} />
                    <View style={styles.priceRow}>
                        <Text style={styles.priceTitle}>Total Amount:</Text>
                        <Text style={styles.priceValue}>₹{Math.round(orderDataStatus.egrandTotal)}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.payMode}>{orderDataStatus.epaymentMode}:₹{Math.round(orderDataStatus.egrandTotal)}</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        backgroundColor: '#F5F5F5',
        padding: 16,
    },
    detailsContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        elevation: 3,
        // marginBottom: 20,
        padding: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333333',
    },
    sectionContent: {
        // backgroundColor: '#d9e0d5',
        borderRadius: 8,
        // padding: 15,
        marginBottom: 20,
    },
    productDetailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    addressBlock: {
        // marginLeft: 10,
    },
    addressTextName: {
        fontSize: 20,
        color: '#333333',
    },
    addressText: {
        fontSize: 14,
        color: '#6e6b64',
    },
    priceDetailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderColor: '#6e6b64',
        borderWidth: 1,
        borderRadius: 5,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 16,
        resizeMode: 'cover',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    productDetails: {
        flex: 1,
    },
    productTitle: {
        fontSize: 18,
        marginBottom: 5,
        color: '#333333',
    },
    aboutSeller: {
        color: '#A0A0A0'
    },
    productPrice: {
        fontSize: 14,
        marginBottom: 5,
        color: '#333333',
        fontWeight: '500'
    },
    showOffer: {
        marginLeft: 5,
        color: 'green'
    },
    seeAllUpdates: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,

    },
    allUpdate: {
        fontSize: 16,
        color: "#3498db",
    },
    updateIcon: {
        padding: 4,
        marginTop: 4
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    priceTitle: {
        fontSize: 14,
        color: '#888888',
        flex: 1,
    },
    priceValue: {
        fontSize: 16,
        // fontWeight: 'bold',
        color: '#333333',
        textAlign: 'right',
        flex: 1,
    },
    dottedBar: {
        borderBottomWidth: 1, // Height of the bar
        borderColor: '#CCCCCC', // Bar color
        borderStyle: 'dotted', // Dotted line style
        marginVertical: 10, // Adjust spacing as needed
    },
    horizontalBar: {
        height: 1, // Height of the bar
        backgroundColor: '#CCCCCC', // Bar color
        marginVertical: 8, // Adjust spacing as needed
    },
    strikethrough: {
        textDecorationLine: 'line-through',
        color: '#333333',
    },
    payMode:{
        color:'black',
        fontSize:15
    }
});

// You can adjust the colors, paddings, and margins according to your design preferences.
