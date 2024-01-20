

import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSearch } from '../../../context/SearchContext';
import Loader from '../../../component/Loader';
import { useAuth } from '../../../context/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';
const IMG_URL = 'https://cdn2.nowgrocery.com/Uploads/';

export default function SearchResultsScreen() {
  const {
    searchText,
    searchResults,
    recentSearches,
    handleSearchInputChange,
    handleProductSelect 
  } = useSearch();
  // console.log("recentSearches",recentSearches)
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [loading, setloading] =  React.useState(true);
  const { isLoggedIn } = useAuth();
  const [screenWidth, setScreenWidth] = React.useState(Dimensions.get('window').width);

  React.useEffect(() => {
    // Simulating a delay to show the loader
    // const timeout = setTimeout(() => {
    //   setloading(false);
    // }, 2000);
    // return () => clearTimeout(timeout);
      // In a real-world scenario, set loading to false when data is loaded
  setloading(false);
  }, []); // Mimicking an API call with a 2-second delay
  React.useEffect(() => {
    const handleScreenResize = () => {
      setScreenWidth(Dimensions.get('window').width);
    };
    Dimensions.addEventListener('change', handleScreenResize);
    return () => {
      if (Dimensions.removeEventListener) {
        Dimensions.removeEventListener('change', handleScreenResize);
      }
    };
  }, []);
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    // Update the header title and custom search input
    navigation.setOptions({
      headerTitle: () => (
        <TextInput
          style={[styles.headerInput, { width: screenWidth - 72 }]}
          value={searchText}
          onChangeText={handleSearchInputChange}
          placeholder="Search for products"
          placeholderTextColor="gray"
          textAlign="left"
          fontSize={13}
        />
      ),
    });
  }, [navigation, searchText, handleSearchInputChange, screenWidth]);

  React.useEffect(() => {
    // Clear the placeholder text when the component unmounts
    return () => handleSearchInputChange('');
  }, []); // Empty dependency array ensures this effect runs only once on mount and cleans up on unmount
  return (
    <View style={styles.container}>
      {isLoggedIn && searchText.length === 0 && (
        <View>
          <FlatList
            data={recentSearches}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSearchInputChange(item)}
                style={styles.recentSearchItem}
              >
                <Icon name="history" size={17} color="gray" />
                <Text style={{ color: 'gray', marginLeft: 8 }}>{item}</Text>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <Image
                    source={require('../../../../assets/images/arrow-up-left-removebg.png')}
                    style={styles.flipkartLogo}
                  />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

{searchText.length > 0 && (
  <ScrollView
    showsVerticalScrollIndicator={false}
    style={styles.resultContainer}
  >
{loading ? (
  <Loader />
) : searchResults.length > 0 ? (
  // Render your search results
  searchResults.map((item) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => handleProductSelect(item)}
    >
          <View style={styles.productItem}>
            {item.imageUrl ? (
              <Image
                source={{ uri: `${IMG_URL}${item.imageUrl}` }}
                style={styles.productImage}
              />
            ) : (
              <Image
                source={require('../../../../assets/images/no-image-icon.png')}
                style={styles.productImage}
              />
            )}
            <Text style={styles.productName}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      ))
    ) : (
       // Show "No products available" message

    <Text style={styles.noProductsText}>
      {loading ? 'Loading...' : 'No products available'}
    </Text>

    )}
  </ScrollView>
)}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerInput: {
   width:'100%',
    color: 'black',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    fontSize: 18,
    marginVertical: 5,
    ...Platform.select({
      ios: {
        position: 'relative',
        right: 20,
      },
    }),
  },
  resultContainer: {
    flex: 1,
    // borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  productName: {
    flex: 1,
    fontSize: 18,
    color: 'black',
  },
  recentSearchesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  recentSearchesContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  recentSearchItem: {
padding:10,
    marginVertical:2,
    backgroundColor: 'white',
    borderRadius: 5,
    // marginRight: 10,
    flexDirection: 'row', // Add this line to make it horizontal
    alignItems: 'center', // Align items in the center horizontally
  },
  
  flipkartLogo: {
    width: 11,
    height: 11,
    // marginRight: 10, // Adjust the margin as needed
  },
  noProductsText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
    marginTop: 20,
  },
});
