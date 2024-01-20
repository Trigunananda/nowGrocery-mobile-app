import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAddressContext } from '../../context/AddressContext';
import { useAuth } from '../../context/AuthContext';
import apiService from '../../services/ApiServices';
import Loader from '../../component/Loader';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddAddressScreen = ({ navigation,route }) => {
  const { isFromOrderSummary} = route.params;
  const { addresses, setAddresses } = useAddressContext();
  const { customerId } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);


  useEffect(() => {
    const fetchAddressesFromAPI = async () => {
      try {
        if (customerId) {
          const response = await apiService.post(`CustomerAddressAPI/Get/${customerId}`);
          const newAddresses = response.data;
          setAddresses(newAddresses);
 
        }
      } catch (error) {
        console.error('Error fetching addresses from API:', error);
 
      }finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };

    fetchAddressesFromAPI();
  }, [customerId, setAddresses]);

  const handleAddAddress = mode => {
    navigation.navigate('EditAddress', { mode });
  };

  const handleEditAddress = index => {
    navigation.navigate('EditAddress', {
      mode: 'edit',
      addressData: addresses[index],
      index,
    });
  };

  const handleRemoveAddress = async index => {
    try {
      const addressId = addresses[index].customerAddressId;
      const response = await apiService.get(`CustomerAddressAPI/Delete/${addressId}`);
      console.log('Delete Response:', response.data);
      const newAddresses = addresses.filter((_, i) => i !== index);
      setAddresses(newAddresses);
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const handleDeliverHere = () => {
    const selectedAddress = addresses[selectedAddressIndex];
  
    if (selectedAddress) {
      const selectedAddressId = selectedAddress.customerAddressId;
      // console.log('Selected Address:', selectedAddress);
      // console.log('Deliver Here - Address ID:', selectedAddressId);
       // Save the selected address details to AsyncStorage
       AsyncStorage.setItem('selectedAddress', JSON.stringify(selectedAddress));
      // Perform the necessary actions with the selected address ID
        // Navigate back to OrderSummary and pass the selected address ID
    navigation.navigate('Order Summary', { selectedAddressId: selectedAddressId,selectedAddress:selectedAddress });

    } else {
      console.log('No address selected for delivery.');
    }
  };
  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }

  
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.topLeft}>
          <Icon name="plus" size={13} color="#007AFF" style={styles.plusIcon} />
          <Text
            style={styles.topLeftText}
            onPress={() => handleAddAddress('add')}>
            Add a new Address
          </Text>
        </View>
        <Text style={styles.totalCardText}>
  {addresses.length > 0 ? `${addresses.length} SAVED ADDRESSES` : 'NO SAVED ADDRESSES PLEASE CLICK ON ABOVE'}
</Text>


            {addresses&&addresses.map((address, index) => (
              <View style={styles.addressCard} key={index}>
                {/* Added RadioButton */}
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <View style={{alignItems:'center',paddingLeft:9}}>
                    <RadioButton
                      value={index}
                      status={selectedAddressIndex === index ? 'checked' : 'unchecked'}
                      onPress={() => setSelectedAddressIndex(index)}
                    />
                  </View>
                  <View style={{width:300}}>
                    <Text style={styles.fullName}>{address.name}</Text>
                    <Text style={styles.addressText}>
                      {`${address.address},${address.landmark},${address.locality}, ${address.city}, ${address.state}, ${address.pincode}`}
                    </Text>
                    <Text style={styles.addressText}>
                      {`${address.alternateMobileNumber}`}
                    </Text>
                  </View>
                </View>
                <View style={styles.actionsContainer}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => handleEditAddress(index)}>
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveAddress(index)}>
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {/* Updated "Deliver Here" button */}
         
            {addresses.length > 0 && isFromOrderSummary && (
  <TouchableOpacity
    style={styles.deliverHereButton}
    onPress={handleDeliverHere}
  >
    <Text style={styles.deliverHereButtonText}>Deliver Here</Text>
  </TouchableOpacity>
)}
      
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  plusIcon: {
    marginRight: 7,
  },
  topLeftText: {
    fontSize: 18,
    color: '#007AFF',
  },
  totalCardText: {
    fontSize: 12,
    fontWeight: '400',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#e3e3e3',
    color: 'black',
  },
  addressCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  fullName: {
    textAlign:'left',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#5e5b58',
  },
  addressText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#5e5b58',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  editButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    marginRight: 10,
  },
  editButtonText: {
    color: 'white',
  },
  removeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#FF3B30',
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
  },
  deliverHereButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff781f',
  },
  stickyBottomBar: {
    bottom: 0,
    left: 0,
    right: 0,
    top: 'auto', // Updated top value
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#ff781f',

  },
  deliverHereButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform:'uppercase'
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default AddAddressScreen;
