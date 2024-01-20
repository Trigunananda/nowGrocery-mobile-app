// RelatedProductItem.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const IMG_URL = 'https://cdn2.nowgrocery.com/Uploads/';
const RelatedProductItem = ({ product, onPress }) => {
  // console.log('product',product)
  const [expandText, setExpandText] = useState(false);
  const mrp = product.mrp;
  const price = product.price;
  const offerPercentage = Math.floor(((mrp - price) / mrp) * 100);
  // const offerPercentage = (((mrp - price) / mrp) * 100).toFixed(2);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} showsVerticalScrollIndicator={false}  // Hide vertical scroll indicator
    showsHorizontalScrollIndicator={false}>
      <View style={styles.cardRelatedProduct}>
        
        {product.imageUrl ? ( // Check if imageUrl is not null
        <View style={{justifyContent:'center',alignItems:'center',borderRadius:3,marginTop:4}}>
          <Image
            source={{ uri: IMG_URL + product.imageUrl }}
            style={styles.productImage}
            resizeMode="cover"
          />
           </View>
        ) : ( // Use default image if imageUrl is null
        <View style={{justifyContent:'center',alignItems:'center',borderRadius:3,marginTop:2}}>
          <Image
            source={require('../../../../assets/images/no-image-icon.png')}
            style={styles.productImage}
            resizeMode="contain"
          />
             </View>
        )}
     
    
        <Text style={{textTransform:'uppercase'}}>mrp: <Text style={styles.productMrp}> ₹{mrp}</Text></Text>
        <Text style={styles.productPrice}>price {price}</Text>
        <Text style={styles.offerPrice}>{offerPercentage}% off</Text>
        {/* <Text style={styles.productName}>{product.productName}</Text> */}
        {/* <Text numberOfLines={2} ellipsizeMode="tail" style={styles.productName}>{displayProduct.productName}</Text> */}
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.productName}>{product.productName}</Text>
        {/* <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity> */}
        
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  // related products section
  cardRelatedProduct: {
    width: 140,
    margin: 5,
    marginLeft: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productMrp: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#777777',
    textTransform:'uppercase',
    textDecorationLine: 'line-through',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#333333',
    textTransform:'uppercase',
  },
  offerPrice: {
    position: 'absolute',
    width: 80,
    height: 20,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,128,128,1)',
    padding: 1,
    borderTopLeftRadius: 9,
    borderBottomRightRadius: 8,
    zIndex: 2,
    textAlign: 'center',
    alignItems: 'center',
    color: '	rgba(255,255,255,1)',
  },
  productName: {
    fontSize: 16,
    marginTop: 5,
    color: '#696969'
  },
  addToCartButton: {
    marginTop: 10,
    backgroundColor: 'rgba(0,128,0,0.6)',
    padding: 5,
    borderRadius: 5,
  },
  addToCartButtonText: {
    color: 'white',
    textAlign: 'center',
  },
})
export default RelatedProductItem;


