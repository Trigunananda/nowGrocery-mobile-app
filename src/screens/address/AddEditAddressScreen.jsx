// import React, { useState } from 'react';
// import { View, ScrollView, StyleSheet, Text } from 'react-native';
// import { TextInput, Button, Menu, Divider } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';
// // import { Provider as PaperProvider } from 'react-native-paper';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { useAddressContext } from '../../context/AddressContext';
// import { useAuth } from '../../context/AuthContext';
// import apiService from '../../services/ApiServices';


// const AddEditAddressScreen = ({ route }) => {
//   // const { setAddresses } = useAddressContext();
//   console.log("AddEdit route", route.params.addressData);
//   const navigation = useNavigation();
//   const { mode, addressData, index } = route.params;
//   const { addresses, setAddresses,setApiResponseAddAddress } = useAddressContext();
//   const { customerId } = useAuth();
//   console.log("cust-id",customerId)
//   const [fullName, setFullName] = useState(addressData?.fullName || '');
//   const [addressText, setAddressText] = useState(addressData?.addressText || '');
//   const [phoneNumber, setPhoneNumber] = useState(addressData?.phoneNumber || '');
//   const [landmark, setLandMark] = useState(addressData?.landmark || '');
//   const [locality, setLocality] = useState(addressData?.locality || '');
//   const [pincode, setPincode] = useState(addressData?.pincode || '');
//   const [state, setState] = useState(addressData?.state || '');

//   const [city, setCity] = useState(addressData?.city || '');

// console.log("addresses",addresses)
//   const handleSubmit =async () => {
//     const newAddress = {
//       Name:fullName,
//       Address: addressText,
//       AlternateMobileNumber: phoneNumber,
//       Landmark:landmark,
//       Locality:locality,
//       Pincode:pincode,
//       City: city,
//       State:state,
//     };
//   try {
//     // Make the API call
//     const response = await apiService.post('CustomerAddressAPI/Add', {
//       ...newAddress,
//       // Assuming you have the customer ID stored somewhere (replace with your logic)
//       CustomerId: customerId,
//     });

//     // Handle the API response as needed
//     console.log('API Response address:', response.data);
//      // Set the API response in the context
//      setApiResponseAddAddress(response.data);

//     if (mode === 'edit') {
//       const updatedAddresses = addresses.map((address, idx) =>
//         idx === index ? newAddress : address
//       );
//       setAddresses(updatedAddresses);
//     } else {
//       setAddresses([...addresses, newAddress]);
//     }

//     navigation.navigate('AddAddress');
//   } catch (error) {
//     console.error('API Error:', error);
//     // Handle the error (e.g., show an error message to the user)
//   }
// };
//   return (

//     <ScrollView contentContainerStyle={styles.container}>
//       <TextInput
//         label="Name(Required)*"
//         value={fullName}
//         onChangeText={setFullName}
//         style={styles.input}
//       />
//       <TextInput
//         label="Address line 1(Required)*"
//         value={addressText}
//         onChangeText={setAddressText}
//         style={styles.input}
//       />
//       <TextInput
//         label="Phone Number(Required)*"
//         keyboardType='numeric'
//         value={phoneNumber}
//         onChangeText={setPhoneNumber}
//         style={styles.input}
//       />
//             <TextInput
//         label="LandMark(Required)*"
//         value={landmark}
//         onChangeText={setLandMark}
//         style={styles.input}
//       />
//               <TextInput
//         label="Locality(Required)*"
//         value={locality}
//         onChangeText={setLocality}
//         style={styles.input}
//       />
//       <TextInput
//         label="Pincode(Required)*"
//         keyboardType='numeric'
//         value={pincode}
//         onChangeText={setPincode}
//         style={styles.input}
//       />
     
//       <TextInput
//         label="City(Required)*"
//         value={city}
//         onChangeText={setCity}
//         style={styles.input}
//       />
//        <TextInput
//         label="State(Required)*"
//         value={state}
//         onChangeText={setState}
//         style={styles.input}
//       />

//       <Button mode="contained" onPress={handleSubmit} style={styles.button}>
//         {mode === 'edit' ? 'Save Changes' : 'Save Address'}
//       </Button>
//     </ScrollView>

//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   input: {
//     marginBottom: 10,
//     color: '#2e2d2d',
//     backgroundColor: '#f5f4f2',
//     borderWidth: 1,
//     borderColor: '#b8b7b6',
//   },
//   button: {
//     marginTop: 20,
//     color: '#fff',
//     backgroundColor: '#f75d25',
//     borderRadius: 3,
//     borderWidth: 1,


//   },
// });

// export default AddEditAddressScreen;



import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet,Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import apiService from '../../services/ApiServices';
import { useAddressContext } from '../../context/AddressContext';
import { useAuth } from '../../context/AuthContext';


const AddEditAddressScreen = ({ route }) => {
  const { mode, addressData, index } = route.params;
  const { addresses, setAddresses, setApiResponseAddAddress,refreshAddresses } = useAddressContext();
  const { customerId } = useAuth();
  const navigation = useNavigation();

  const [fullName, setFullName] = useState(addressData?.name || '');
  const [addressText, setAddressText] = useState(addressData?.address || '');
  const [phoneNumber, setPhoneNumber] = useState(addressData?.alternateMobileNumber || '');
  const [landmark, setLandMark] = useState(addressData?.landmark || '');
  const [locality, setLocality] = useState(addressData?.locality || '');
  const [pincode, setPincode] = useState(addressData?.pincode?.toString() || '');
  const [state, setState] = useState(addressData?.state || '');
  const [city, setCity] = useState(addressData?.city || '');

  useEffect(() => {
    const fetchAddressById = async () => {
      try {
        if (addressData && addressData.customerAddressId) {
          const response = await apiService.get(`CustomerAddressAPI/GetAddressById/${addressData.customerAddressId}`);
          const fetchedAddress = response.data;
  
          setFullName(fetchedAddress.name || '');
          setAddressText(fetchedAddress.address || '');
          setPhoneNumber(fetchedAddress.alternateMobileNumber || '');
          setLandMark(fetchedAddress.landmark || '');
          setLocality(fetchedAddress.locality || '');
          setPincode(fetchedAddress.pincode?.toString() || '');
          setState(fetchedAddress.state || '');
          setCity(fetchedAddress.city || '');
        }
      } catch (error) {
        console.error('Error fetching address details by ID:', error);
      }
    };
  
    if (mode === 'edit') {
      fetchAddressById();
    }
  }, [mode, addressData?.customerAddressId]);
  

  const handleSubmit = async () => {
    const updatedAddress = {
      Name: fullName,
      Address: addressText,
      CustomerId: customerId,
      AlternateMobileNumber: phoneNumber,
      Landmark: landmark,
      Locality: locality,
      Pincode: pincode,
      City: city,
      State: state,
    };

    // try {
    //   let response;
    //   if (mode === 'edit') {
    //     console.log("Hello mr how are you")
    //     response = await apiService.put(`CustomerAddressAPI/EditAddress/${addressData.customerAddressId}`,updatedAddress, {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     });
        
    //     console.log('edit-reponse',response)
    //   } else {
    //     response = await apiService.post('CustomerAddressAPI/Add', {
    //       ...updatedAddress,
    //     });
    //   }

    //   console.log('API Response address:', response.data);
    //   setApiResponseAddAddress(response.data);

    //   if (mode === 'edit') {
    //     const updatedAddresses = addresses.map((address, idx) =>
    //       idx === index ? updatedAddress : address
    //     );
    //     setAddresses(updatedAddresses);
    //   } else {
    //     setAddresses([...addresses, updatedAddress]);
    //   }

    //   navigation.navigate('AddAddress');
    // } catch (error) {
    //   console.error('API Error:', error);
      
    // }
    try {
      let response;
      if (mode === 'edit') {
        response = await apiService.put(`CustomerAddressAPI/EditAddress/${addressData.customerAddressId}`,  updatedAddress, {
                headers: {
                  'Content-Type': 'application/json',
                }, });
        // console.log('edit-reponse', response);
  
        // Update the state with the updated address
        const updatedAddresses = addresses.map((address, idx) =>
          idx === index ? response.data : address
        );
        setAddresses(updatedAddresses);
      } else {
        response = await apiService.post('CustomerAddressAPI/Add', {
          ...updatedAddress,
        });
      }
  
      console.log('API Response address:', response.data);
      setApiResponseAddAddress(response.data);
         // Manually trigger a refresh after a successful update or add
    refreshAddresses();
  
      if (mode !== 'edit') {
        setAddresses([...addresses, response.data]);
      }
  
      Alert.alert('Success', 'Address saved successfully', [
        {
          text: 'OK',
          onPress: () => {
            // setIsSaving(false);
            navigation.navigate('AddAddress', { isFromOrderSummary: false });
          },
        },
      ]);
    } catch (error) {
      console.error('API Error:', error);
    }

  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        label="Name"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
      />
      <TextInput
        label="Address"
        value={addressText}
        onChangeText={setAddressText}
        style={styles.input}
      />
      <TextInput
           maxLength={10}
        label="Phone Number"
        keyboardType='numeric'
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={styles.input}
      />
      <TextInput
        label="LandMark"
        value={landmark}
        onChangeText={setLandMark}
        style={styles.input}
      />
      <TextInput
        label="Locality"
        value={locality}
        onChangeText={setLocality}
        style={styles.input}
      />
      <TextInput
       maxLength={6}
        label="Pincode"
        keyboardType='numeric'
        value={pincode}
        onChangeText={setPincode}
        style={styles.input}
      />
      <TextInput
        label="City"
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />
      <TextInput
        label="State"
        value={state}
        onChangeText={setState}
        style={styles.input}
      />

      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        {mode === 'edit' ? 'Save Changes' : 'Save Address'}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
        padding: 20,
      },
      input: {
        marginBottom: 10,
        color: '#2e2d2d',
        backgroundColor: '#f5f4f2',
        borderWidth: 1,
        borderColor: '#b8b7b6',
      },
      button: {
        marginTop: 20,
        color: '#fff',
        backgroundColor: '#f75d25',
        borderRadius: 3,
        borderWidth: 1,
    
    
      },
});

export default AddEditAddressScreen;
