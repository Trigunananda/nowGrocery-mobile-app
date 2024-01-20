// RelatedProductsSection.js
import React from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import RelatedProductItem from './RelatedProductItem';
import Icon from 'react-native-vector-icons/FontAwesome';

const RelatedProductsSection = ({ products, onSelectProduct }) => {
    
    return (
        <View style={styles.productTitle}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.productsTitle}>Related Products</Text>
                <TouchableOpacity
                    style={styles.arrowButtonLeft}
                    onPress={() => {
                        this.scrollView.scrollTo({ x: 0, animated: true });
                    }}
                >
                    <Icon name="chevron-left" size={16} color="#696969" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.arrowButtonRight, { right: 0 }]}
                    onPress={() => {
                        this.scrollView.scrollToEnd({ animated: true });
                    }}
                >
                    <Icon name="chevron-right" size={16} color="#696969" />
                </TouchableOpacity>
            </View>
            {/* Horizontal ScrollView for Related Products */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                ref={(scrollView) => {
                    this.scrollView = scrollView;
                }}
                contentContainerStyle={{ paddingRight: 5 }}
            >
   {products && products.length > 0 && products.map((relatedProduct, index) => {
    // console.log('relatedProduct data:', relatedProduct);
    return (
        <RelatedProductItem
            key={`relatedProduct_${relatedProduct.productId}`}
            product={relatedProduct}
            onPress={() => onSelectProduct(relatedProduct)}
        />
    );
})}

              {/* {Array.isArray(products) ? (
  products.map((relatedProduct, index) => (
    <RelatedProductItem
      key={`relatedProduct_${relatedProduct.productId}`}
      product={relatedProduct}
      onPress={() => onSelectProduct(relatedProduct)}
    />
  ))
) : (
  
<Text>No products available.</Text>
)} */}
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({

    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        color: '#333333'
    },
    productsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
        color: '#333333',
        textTransform:'uppercase'
        // marginBottom: 10,
    },
    arrowButtonLeft: {
        // position: 'absolute',
        // top: '50%',
        // transform: [{ translateY: -12 }], // Center the button vertically
        backgroundColor: 'transparent',
        borderRadius: 12,
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        position: 'relative',
        left: 60,
        top: 3
    },
    arrowButtonRight: {
        // position: 'absolute',
        // top: '50%',
        // transform: [{ translateY: -12 }], // Center the button vertically
        backgroundColor: 'transparent',
        borderRadius: 12,
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        position: 'relative',
        top: 3

    },
    leftArrowButton: {
        left: 2, // Adjust the left arrow position as needed
    },
    rightArrowButton: {
        right: 2, // Adjust the right arrow position as needed
    },
})
export default RelatedProductsSection;
