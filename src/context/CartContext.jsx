
// Import necessary libraries
import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useAuth} from './AuthContext';
import apiService from '../services/ApiServices';

const CartContext = createContext();

export const CartProvider = ({children}) => {
  const {customerId} = useAuth();
  const [cart, setCart] = useState([]);

  const loadCartFromApi = async () => {
    // console.log('first console fffffffffff');
    try {
      const localCartData = await AsyncStorage.getItem('cartData');

      if (localCartData) {
        console.log('hello',localCartData);
        setCart(JSON.parse(localCartData));
      }
    } catch (error) {
      console.error('Failed to load cart data:', error);
    }
  };

  // Function to load cart data from the API on component mount
  useEffect(() => {
    // console.log('hi hi');
    loadCartFromApi();
    getCart()
  }, []);

  const getCart = async () => {
    // console.log('first console');
    try {
      const localCartData = await AsyncStorage.getItem('cartData');

      if (localCartData) {
        // console.log('hello');
        setCart(JSON.parse(localCartData));
      } else {
        // If no local cart data is available, make a GET request to the API endpoint
        const response = await apiService.get(
          `CartAPI/GetByUserId/${customerId}`,
        );
        console.log('no localCartDataCart-----------1', response);
        if (response.data) {
          setCart(response.data); // Update the cart state with data from the API
        } else {
          setCart([]); // Initialize with an empty array
        }
      }
    } catch (error) {
      console.error('Failed to load cart data:', error);
    }
  };

  const saveCartToApi = async updatedCart => {
    console.log("jai hanuman",updatedCart)
    try {
      const cartItem = {
        EcartItemId: 0,
        EcartMasterId: 0,
        productId: updatedCart[0].productId,
        quantity: updatedCart[0].quantity || 1,
        subTotal: updatedCart[0].price || 0,
        batchId: updatedCart[0].batchId || 0,
        mrp: updatedCart[0].mrp || 0,
        price: updatedCart[0].price || 0,
        imageUrl: updatedCart[0].imageUrl || '',
        MaxStockLimit: updatedCart[0].totalStock || 0,
        productName: updatedCart[0].productName || '',
      };

      const cartData = {
        EcartMasterId: 0,
        EcustomerId: customerId,
        EcartGrandTotal: cartItem.subTotal,
        EcartTotalTaxAmount: null,
        EcartShippingAmount: 0,
        EcartItem: [cartItem],
      };

      await apiService.post('CartAPI/AddCart', cartData);
      
    } catch (error) {
      console.error('Failed to save cart data to API:', error);
    }
  };

  const increaseQuantity = productId => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => {
        if (item.productId === productId) {
          const newQuantity = (item.quantity || 1) + 1;
          return {
            ...item,
            quantity: newQuantity,
          };
        }
        return item;
      });
      saveCartToApi(updatedCart); // Save the updated cart data to the API
      return updatedCart;
    });
  };

  const decreaseQuantity = productId => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => {
        if (item.productId === productId && item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });
      saveCartToApi(updatedCart); // Save the updated cart data to the API
      return updatedCart;
    });
  };

  // const removeFromCart = (item) => {
  //   const updatedCart = cart.filter((cartItem) => cartItem.productId !== item.productId);
  //   setCart(updatedCart);
  //   saveCartToApiData(updatedCart); // Save the updated cart data to the API
  // };

  
   const addToCart = item => {
    console.log('item@@@@@@',item)
      //  console.log('addToCart function called');
      console.log("-----cart-------",cart)
     const updatedCart = [...cart, item];
     console.log('updated cart add',updatedCart)
     setCart(updatedCart);
       saveCartToApi(updatedCart); 
      
     // saveCartToApiData(updatedCart); // Save the updated cart data to the API
   };

  //  const addToCart = async item => {
  //   try {
  //     console.log('item@@@@@@', item);
  
  //     // Transform the received item into the expected format
  //     const cartItem = {
  //       EcartItemId: 0,
  //       EcartMasterId: 0,
  //       productId: item.productId,
  //       quantity: 1, // Set the default quantity or use item.quantity if available
  //       subTotal: item.price || 0,
  //       batchId: item.batchId || 0,
  //       mrp: item.mrp || 0,
  //       price: item.price || 0,
  //       imageUrl: item.imageUrl || '',
  //       totalStock: item.totalStock || 0,
  //       productName: item.productName || '',
  //     };
  
  //     // Update the cart with the new item
  //     const updatedCart = [...cart, cartItem];
  //     console.log('updated cart add', updatedCart);
  //     setCart(updatedCart);
  
  //     // Save the updated cart data to the API
  //     await saveCartToApi(updatedCart);
  //   } catch (error) {
  //     console.error('Error adding to cart:', error);
  //   }
  // };
  
  
  const removeFromCart = item => {
    const updatedCart = cart.filter(
      cartItem => cartItem.productId !== item.productId,
    );
    setCart(updatedCart);
    // saveCartToApi(updatedCart); // Save the updated cart data to the API
  };

  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem('cartData'); // Remove the cart data from local storage
      setCart([]); // Clear the cart in state
    } catch (error) {
      console.error('Failed to clear cart data from local storage:', error);
    }
  };

  // const saveCartToApiData = async (cartData) => {
  //   try {
  //     // Make a POST request to update the cart data on the API
  //     await axios.post('https://api.nowgrocery.com/api/CartAPI/UpdateCart', { cartData });
  //   } catch (error) {
  //     console.error('Failed to save cart data to API:', error);
  //   }
  // };

  // ... (other cart-related methods)

  const saveCartToStorage = async cartData => {
    try {
      if (cartData !== null && cartData !== undefined) {
        console.log('text1', cartData);
        await AsyncStorage.setItem('cartData', JSON.stringify(cartData));
      } else {
        console.log('text2&&&&&&&&&', cartData);
        // Handle the case where cartData is null or undefined
        // For example, you can set a default value or perform another action.

        // Here, we'll set an empty array as the default value if cartData is null or undefined.
        await AsyncStorage.setItem('cartData', JSON.stringify([]));
      }
    } catch (error) {
      console.error('Failed to save cart data to local storage:', error);
    }
  };
  const getTotalQuantity = () => {
    // Calculate the total quantity in the cart
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  };
  // console.log("getCart",getCart)
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        getCart,
        loadCartFromApi,
        saveCartToStorage,
        decreaseQuantity,
        getTotalQuantity /* other cart-related methods */,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
