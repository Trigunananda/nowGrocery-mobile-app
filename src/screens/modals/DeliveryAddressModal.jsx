import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAddressContext } from '../../context/AddressContext';
import { RadioButton } from 'react-native-paper';

const DeliveryAddressModal = ({ isVisible, onClose,navigation}) => {
  const { addresses } = useAddressContext();
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);

  const handleAddressSelect = (index) => {
    setSelectedAddressIndex(index);
  };
  return (
    <Modal
    visible={isVisible}
    animationType="none"
    transparent={true}
    presentationStyle="overFullScreen"
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Select Delivery Address</Text>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        <ScrollView>
             {addresses.length === 0 ? (
              <View style={styles.noAddressPosition}>
                
              <Text style={styles.noAddressText}>No addresses found.</Text>
              </View>
            ) : (
        addresses.map((address, index) => (
          <View key={index} style={styles.addressContainer}>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() =>{
                handleAddressSelect(index);
                //  onSelectAddress(address); 
              } }
            >
              <RadioButton
                value={index}
                status={selectedAddressIndex === index ? 'checked' : 'unchecked'}
                onPress={() => handleAddressSelect(index)}
              />
              <View>
              <Text style={styles.addressText}>{address.name}, {address.pincode}</Text>
           
            <Text style={styles.addressText}>{address.landmark} {address.city}, {address.state}, {address.alternateMobileNumber}</Text>
            </View>
            </TouchableOpacity>
          </View>
        ))
            )}
           </ScrollView>
        <TouchableOpacity style={styles.closeModalButton} onPress={onClose}>
          <Text style={styles.closeModalButtonText}>Close</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.closeModalButton} onPress={()=>navigation.navigate('AddAddress')}>
          <Text style={styles.closeModalButtonText}>Add</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addressContainer: {
    marginBottom: 16,
    // backgroundColor:'orange'
  },
  addressText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  closeModalButton: {
    alignSelf: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginBottom: 20,
  },
  closeModalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  noAddressPosition:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginBottom: 20,
  },
  noAddressText:{
    color:'black',
    fontWeight: 'bold',
  }
});

export default DeliveryAddressModal;




