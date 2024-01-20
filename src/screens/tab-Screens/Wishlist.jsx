import React, { useState } from 'react';
import { View, ScrollView, Image, Text, Button, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';

const WishlistScreen = ({ navigation }) => {
  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, name: 'Apple', cost: '₹150', image: require('../../../assets/images/groceryFoods/attaFlour/besan.jpg') },
    { id: 2, name: 'Mango', cost: '₹465', image: require('../../../assets/images/groceryFoods/dalPulses/chana.jpg') },
    { id: 3, name: 'Berries', cost: '₹250', image: require('../../../assets/images/groceryFoods/dryFruits/almonds-3.jpg') },
    { id: 4, name: 'Strawberries', cost: '₹165', image: require('../../../assets/images/groceryFoods/dryFruits/hazelnut.jpg') },
    { id: 5, name: 'Apple', cost: '₹150', image: require('../../../assets/images/groceryFoods/oils/olive-oil-1.jpg') },
    { id: 6, name: 'Product Name 6', cost: '₹655', image: require('../../../assets/images/groceryFoods/dryFruits/dry-fruit.jpg') },
    // Add more items
  ]);

  const removeFromWishlist = (itemId) => {
    const updatedWishlist = wishlistItems.filter(item => {
      if (item.id === itemId) {
        console.log('Removing item with ID:', itemId);
      }
      return item.id !== itemId;
    });

    setWishlistItems(updatedWishlist);
  };

  const createRows = () => {
    const rows = [];
    for (let i = 0; i < wishlistItems.length; i += 2) {
      const rowItems = wishlistItems.slice(i, i + 2);
      rows.push(rowItems);
    }
    return rows;
  };

  return (
    <View style={styles.container}>
      <View style={styles.defaultCountContainer}>
        <Text style={styles.defaultCountText}>Default({wishlistItems.length})</Text>
      </View>
      {wishlistItems.length === 0 ? (
        <Text style={styles.noProductsText}>No products in this wishlist</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {createRows().map((row, rowIndex) => (
            <View key={rowIndex} style={styles.rowContainer}>
              {row.map(item => (
                <View key={item.id} style={styles.wishlistItem}>
                  <View style={styles.topContainer}>
                    <View style={styles.costContainer}>
                      <Text style={styles.cost}>{item.cost}</Text>
                    </View>
                    <TouchableOpacity style={styles.heartIconContainer} onPress={() => removeFromWishlist(item.id)}>
                      <Icon name="heart" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.image} />
                  </View>
                  <Text style={styles.name}>{item.name}</Text>
                  <TouchableOpacity style={{ backgroundColor: '#39b84f', padding: 10, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('Cart')}>
                    <Text style={{ color: '#fff' }}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  defaultCountContainer: {
    position: 'absolute',
    top: 15,
    left: 28,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    zIndex:2
  },
  defaultCountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  noProductsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888',
    marginTop: 20,
  },
  scrollContainer: {
    paddingHorizontal: 8,
    paddingTop: 55,
    paddingBottom: 20, // Add padding to the bottom for better spacing
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12, // Add margin between rows
  },
  wishlistItem: {
    width: '48%', // Adjust the width to leave space for margins
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    elevation: 4,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heartIconContainer: {
    borderRadius: 50,
    padding: 5,
  },
  costContainer: {
    marginLeft: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius:8,
    resizeMode: 'cover',
  },
  name: {
    marginTop: 10,
    fontWeight: 'bold',
    color: '#333',
    fontSize: 18,
  },
  cost: {
    marginBottom: 10,
    color: '#888',
    fontSize: 14,
  },
});

export default WishlistScreen;
