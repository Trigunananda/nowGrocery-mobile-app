// import React, { createContext, useContext, useState } from 'react';
// import apiService from '../services/ApiServices';

// const SearchContext = createContext();

// export function useSearch() {
//   return useContext(SearchContext);
// }

// export function SearchProvider({ children }) {

//   const [searchText, setSearchText] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [recentSearches, setRecentSearches] = useState([]);

//   //   const handleSearchInputChange = (text) => {
//   //     setSearchText(text);
//   //     // Perform your search API call here and update setSearchResults.
//   //     const results = [
//   //         { id: 1, name: 'Product 1' },
//   //         { id: 2, name: 'Product 2' },
//   //         { id: 3, name: 'Product 3' },
//   //       ];
//   //       setSearchResults(results);
//   //   };

//   const handleSearchInputChange = async (text) => {
//     setSearchText(text);

//     try {
//       const queryParams = {
//         strName1: text,
//         strName2: text,
//         strName3: text,
//         strName4: text,
//         SortBy: '',
//       };

//       // Construct the URL string with query parameters
//       const queryString = Object.keys(queryParams)
//         .map(key => `${key}=${encodeURIComponent(queryParams[key])}`)
//         .join('&');

//       const url = `ProductAPI/GetCategoryProductByKeyWord?${queryString}`;

//       // Make the API request with the constructed URL
//       const searchResponse = await apiService.get(url);
//       //   console.log('searchResponse', searchResponse);
//       console.log('searchResponseData', searchResponse.data);

//       // Filter the response to include only items with type "Product"
//       // const productResults = searchResponse.data.filter(
//       //   (item) => item.type === 'Product'
//       // );
//       const productResults = searchResponse.data.filter((item) => {
//         return item.type === 'Product';
//       });
//       // Check if there are any product results
//       if (productResults.length > 0) {
//         setSearchResults(productResults);

//         // Update recent searches
//         setRecentSearches((prevSearches) => {
//           // Deduplicate searches and keep only the latest 5
//           const newSearches = Array.from(new Set([text, ...prevSearches])).slice(0, 6);
//           return newSearches;
//         });
//       } else {
//         setSearchResults([]);
//         console.log('No product results found for', text);
//       }
//     } catch (error) {
//       console.error('Error while fetching search results:', error);
//       // Handle the error gracefully, e.g., show an error message to the user
//     }

//   };

//   const handleProductSelect = (product) => {
//     setSelectedProduct(product);
//     if (product.slug) {
//       console.log('product.slug', product.slug)
//       // If the product has a slug, navigate to the product details screen with the slug
//       // navigation.navigate('Product', { slug: product.slug });
//     }
//   }

//   return (
//     <SearchContext.Provider
//       value={{
//         searchText,
//         searchResults,
//         recentSearches,
//         selectedProduct,
//         handleSearchInputChange,
//         handleProductSelect,
//       }}
//     >
//       {children}
//     </SearchContext.Provider>
//   );
// }


import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '../services/ApiServices';
import { useAuth } from './AuthContext';
import { useNavigation } from '@react-navigation/native';

const SearchContext = createContext();

export function useSearch() {
  return useContext(SearchContext);
}

// ... (your imports)

export function SearchProvider({ children }) {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const { isLoggedIn,customerId } = useAuth();
  const navigation = useNavigation();
// console.log("---isLoggedIn---",isLoggedIn)
useEffect(() => {
  const checkLoginStatus = async () => {
    if (isLoggedIn) {
      try {
        const storedSearches = await AsyncStorage.getItem(`recentSearches_${customerId}`);
        if (storedSearches) {
          setRecentSearches(JSON.parse(storedSearches));
        }
      } catch (error) {
        console.error('Error reading AsyncStorage:', error);
      }
    }
  };

  checkLoginStatus();
}, [isLoggedIn, customerId]);

  const saveRecentSearches = async (newSearches) => {
    try {
      await AsyncStorage.setItem(`recentSearches_${customerId}`, JSON.stringify(newSearches));
    } catch (error) {
      console.error('Error saving recent searches:', error);
    }
  };

  const handleSearchInputChange = async (text) => {
    setSearchText(text);

    try {
      const queryParams = {
        strName1: text,
        strName2: text,
        strName3: text,
        strName4: text,
        SortBy: '',
      };

      const queryString = Object.keys(queryParams)
        .map((key) => `${key}=${encodeURIComponent(queryParams[key])}`)
        .join('&');

      const url = `ProductAPI/GetCategoryProductByKeyWord?${queryString}`;

      const searchResponse = await apiService.get(url);
      const searchTerm = text.toLowerCase();
       const productResults = searchResponse.data.filter((item) => {
        // Check if the product name contains the exact search term as a whole word
        const regex = new RegExp(`\\b${searchTerm}\\b`, 'i');
        return item.type === 'Product' && regex.test(item.name.toLowerCase());
      });
      if (productResults.length > 0) {
        setSearchResults(productResults);
      } else {
        setSearchResults([]);
        console.log('No product results found for', text);
      }
    } catch (error) {
      console.error('Error while fetching search results:', error);
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  
    // Get the product name
    const productName = product.name;
  
    // Update recent searches with the selected product's name
    setRecentSearches((prevSearches) => {
      const updatedSearches = [...prevSearches];
  
      // Remove the product name if it already exists
      const index = updatedSearches.indexOf(productName);
      if (index !== -1) {
        updatedSearches.splice(index, 1);
      }
  
      // Add the product name to the beginning of recent searches
      updatedSearches.unshift(productName);
  
      // Limit the number of recent searches to, for example, 5
      const limitedRecentSearches = updatedSearches.slice(0, 5);
      console.log("limitedRecentSearches",limitedRecentSearches)
      // Save the updated recent searches
      saveRecentSearches(limitedRecentSearches);
  
      return limitedRecentSearches;
    });
  
    // Navigate to the 'Product' page with the selected product's slug
    navigation.navigate('Product', { slug: product.slug, product: product.id });
  };
  
  // console.log("recentSearches",recentSearches)
  return (
    <SearchContext.Provider
      value={{
        searchText,
        searchResults,
        recentSearches, // Reverse the order to show the most recent searches first
        selectedProduct,
        handleSearchInputChange,
        handleProductSelect,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
