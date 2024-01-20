// // AddressContext.js

// import React, { createContext, useContext, useState } from 'react';

// const AddressContext = createContext();

// export const AddressProvider = ({ children }) => {
//   const [addresses, setAddresses] = useState([]);
// console.log('context-address',addresses)
//   return (
//     <AddressContext.Provider value={{ addresses, setAddresses }}>
//       {children}
//     </AddressContext.Provider>
//   );
// };

// export const useAddressContext = () => useContext(AddressContext);



import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '../services/ApiServices';
import { useAuth } from './AuthContext';


const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const { customerId } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [ApiResponseAddAddress, setApiResponseAddAddress] = useState(null);
  useEffect(() => {
    // Load addresses from storage on initialization
    const loadAddresses = async () => {
      try {
        const storedAddresses = await AsyncStorage.getItem('addresses');
        const storedApiResponseAddAddress = await AsyncStorage.getItem('ApiResponseAddAddress');
        // console.log("storedApiResponseAddAddress",storedApiResponseAddAddress);
        if (storedAddresses) {
          setAddresses(JSON.parse(storedAddresses));
        }
        if (storedApiResponseAddAddress) {
          setApiResponseAddAddress(JSON.parse(storedApiResponseAddAddress));
        }
      } catch (error) {
        console.error('Error loading addresses from storage:', error);
      }
    };

    loadAddresses();
  }, []); // Empty dependency array to ensure it runs only once on mount

  const refreshAddresses = async () => {
    try {
      const response = await apiService.post(`CustomerAddressAPI/Get/${customerId}`);
      const newAddresses = response.data;
      setAddresses(newAddresses);
    } catch (error) {
      console.error('Error fetching addresses from API:', error);
    }
  };

  const saveAddressesToStorage = async (newAddresses,newApiResponseAddAddress) => {
    try {
      if (newAddresses !== undefined) {
        await AsyncStorage.setItem('addresses', JSON.stringify(newAddresses));
      }
  
      if (newApiResponseAddAddress !== undefined) {
        await AsyncStorage.setItem('ApiResponseAddAddress', JSON.stringify(newApiResponseAddAddress));
         // Log the value after storing it
      console.log('Stored ApiResponseAddAddress:', newApiResponseAddAddress);
      }
    } catch (error) {
      console.error('Error saving addresses to storage:', error);
    }
  };

  const updateAddresses = (newAddresses,newApiResponseAddAddress) => {
    setAddresses(newAddresses);
    setApiResponseAddAddress(newApiResponseAddAddress)
    saveAddressesToStorage(newAddresses,newApiResponseAddAddress);
  };

  return (
    <AddressContext.Provider value={{ addresses, setAddresses: updateAddresses,ApiResponseAddAddress, setApiResponseAddAddress,refreshAddresses}}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddressContext = () => useContext(AddressContext);
