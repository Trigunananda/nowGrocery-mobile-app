import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState,memo, useEffect  } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useWishlist } from '../../../context/WishlistContext';
import CustomToast from './CustomToast ';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import Loader from '../../../component/Loader';
const IMG_URL = 'https://cdn2.nowgrocery.com/Uploads/';

const ProductsItem = ({ product, filteredProducts, sortedProducts }) => {
    console.log("sort product!!!!!!!!!!",product)
    const { customerId } = useAuth();
    // console.log('list-item',product)
     const navigation = useNavigation();
    const displayProduct = filteredProducts || sortedProducts || product;
    // console.log("displayProduct",displayProduct)
const mrp = displayProduct.mrp.toFixed(2)
const price = displayProduct.price.toFixed(2)
const offerPercentage = (((mrp - price) / mrp) * 100).toFixed(0);
    const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();

    // const { name, price, image, offerPercentage, description } = product;
    const [cartCount, setCartCount] = useState(0);
    const [cartOpen, setCartOpen] = useState(false);
    const [wishlistMessage, setWishlistMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [expandText, setExpandText] = useState(false);
    const [isProductInCart, setIsProductInCart] = useState(false); // Initialize isProductInCart
    const [loading, setLoading] = useState(true); 
    const isWishlistItem = wishlist.some((item) => item.productId === product.productId);
    const {cart,addToCart} = useCart();
    // const addToCart = () => {
    //     setCartCount(cartCount + 1);
    //     setCartOpen(true);
    // };

    const removeFromCart = () => {
        if (cartCount > 0) {
            setCartCount(cartCount - 1);
        }
    };
    useEffect(() => {
        setLoading(false);
      }, []); // Simulate some asynchronous data loading
    const toggleWishlist = () => {
        if (isWishlistItem) {
            removeFromWishlist(product);
            setWishlistMessage(<><Icon name="close" size={26} color="rgb(255,255,255)" height={50}
                width={50} backgroundColor="red" /> Removed from wish list</>);
        } else {
            addToWishlist(product);
            setWishlistMessage(<><Icon name="check-bold" size={26} color="rgb(255,255,255)"
                height={50}
                width={50} backgroundColor="#4CAF50" /> Added to wish list</>);
        }

        // Show the popup message
        // setWishlistMessage(isWishlistItem ? 'Removed from wish list' : 'Added to wish list');

        // Show the toast message
        setShowToast(true);

        // Automatically hide the toast after 2 seconds
        setTimeout(() => {
            setShowToast(false);
        }, 2000);
    };


    const handleAddToCart = () => {
        if (!customerId) {
          // If user is not logged in, show an alert and redirect to login page
          Alert.alert(
            'Login Required',
            'Please log in to add items to your cart.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Log In',
                onPress: () => {
                  // Navigate to the login page or your authentication screen
                  // Replace 'YourLoginScreen' with the actual name or path of your login screen
                  // For example, if using React Navigation:
                  navigation.navigate('Login');
                },
              },
            ],
            { cancelable: false }
          );
        } else {
          // User is logged in
          if (isProductInCart) {
            navigation.navigate('My Cart');
          } else {
            addToCart(displayProduct);
            // After adding to the cart, update isProductInCart
            setIsProductInCart(true);
          }
        }
      };
    
      if (loading) {
        return (
          <View style={styles.loaderContainer}>
            <Loader />
          </View>
        );
      }
    
    return (
        <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>

            {/* First Row */}
            <TouchableOpacity activeOpacity={1} style={styles.firstRow} onPress={() => navigation.navigate('Product', { 
           slug: product.slug,
           product: product.productId,
                })}>
                {/* <View style={styles.imageContainer}>
                <Image  source={{ uri: IMG_URL + displayProduct.imageUrl }} style={styles.image} />
                   
                    <TouchableOpacity style={styles.wishListIcon} onPress={toggleWishlist}>
                        <Icon
                            name={isWishlistItem ? 'heart' : 'heart-outline'}
                            size={24}
                            color={isWishlistItem ? 'red' : 'rgba(128,128,128,0.9)'}
                        />
                    </TouchableOpacity>
                </View> */}
                    {displayProduct.imageUrl ? ( 
                <View style={styles.imageContainer}>
            
                <Image  source={{ uri: IMG_URL + displayProduct.imageUrl }} style={styles.image} />
                </View>
                ) : ( // Use default image if imageUrl is null
                <View style={styles.imageContainer}>
                <Image  source={require('../../../../assets/images/no-image-icon.png')} style={styles.image} />
                </View>
                )}
             
                <View style={styles.productInfo}>
                    {/* <Text style={styles.productName}>{displayProduct.productName}</Text> */}
                    <Text numberOfLines={2} ellipsizeMode="tail" style={styles.productName}>{displayProduct.productName}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',marginTop:2 }}>

                        <View style={styles.priceSection}>
                            <Text style={styles.price}>₹{price}</Text>
                        </View>
                        <View style={styles.offerSection}>
                            <Text style={styles.offerPrice}>₹{mrp}</Text>
                        </View>
                        <View style={styles.discountSection}>
                            <Text style={styles.discountPrice}>{offerPercentage}% off</Text>
                        </View>

                    </View>
                    {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                        {cartCount > 0 ? (
                            <View style={styles.cart}>
                                <TouchableOpacity onPress={removeFromCart} style={styles.cartButtonMinus}>
                                    <Icon name="minus-circle" size={26} color="#FF5733" />
                                </TouchableOpacity>
                                <Text style={styles.cartCount}>{cartCount}</Text>
                                <TouchableOpacity onPress={addToCart} style={styles.cartButtonAdd}>
                                    <Icon name="plus-circle" size={26} color="#4CAF50" />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity onPress={addToCart} style={styles.addButton}>
                                <Text style={styles.addButtonText}>Add</Text>
                            </TouchableOpacity>
                        )}
                    </View> */}
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
        
                            {/* <TouchableOpacity onPress={addToCart} style={styles.addButton}>
                                <Text style={styles.addButtonText}>Add</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.addButton,
            {
              backgroundColor: isProductInCart
                ? 'rgba(0,128,0,0.6)'
                : '#C9003C',
            }, // Change 'anotherColor' to the desired background color for "Add to Basket"
          ]}
        //   onPress={() => {
        //     if (isProductInCart) {
        //       navigation.navigate('My Cart');
        //     } else {
        //       addToCart(displayProduct);
        //       // After adding to the cart, update isProductInCart
        //       setIsProductInCart(true);
        //     }
        //   }}>
        onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>
            {isProductInCart ? 'Go to Cart' : 'Add'}
          </Text>
        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
            {/* Second Row (Horizontal Bar) */}
            <View style={styles.horizontalBar}></View>
            <CustomToast isVisible={showToast} message={wishlistMessage} />
 
        </ScrollView>
    )
}
export default memo(ProductsItem);
const styles = StyleSheet.create({
    firstRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,

        // borderWidth:1,
    },
    imageContainer: {
        width: 110,
        height: 110,
        borderRadius: 8,
        overflow: 'hidden',
        position: 'relative',
        // backgroundColor:'red'
        // width: 140,
        // margin: 5,
        // marginLeft: 1,
        // padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 3,
        padding:15
    },
    wishListIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius:5,
    },
    productInfo: {
        // marginLeft: 30,
        padding: 5,
        // backgroundColor:'orange',
        // alignItems: 'flex-start',
        maxWidth:220,
        width:220
    },
    productName: {
        
        fontSize: 14,
        // fontWeight: 'bold',
        color: 'rgb(0,0,0)',
        textAlign: 'left',
        alignItems: 'flex-start',
        // maxWidth: 180,
    },
    priceSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 7
    },
    price: {
        // fontSize: 14,
        color: 'rgb(0,0,0)',
        fontWeight: '700'
    },

    offerSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 7
    },
    offerPrice: {
        // fontSize: 14,
        color: 'gray',
        textDecorationLine: 'line-through',
    },
    discountSection: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,128,0,0.1)',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        paddingVertical: 4
    },

    discountPrice: {
        fontSize: 12,
        color: 'rgba(0,128,0,1)',
        fontWeight: '800',
        // marginBottom:3,
        textTransform: 'uppercase',
    },
    //cart
    addButton: {
        backgroundColor: 'rgba(0,128,0,0.6)',
        paddingVertical: 0,
        height: 35,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginTop: 8,
    },
    addButtonText: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
        padding: 5
        // textTransform:'uppercase'
    },
    cart: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartCount: {
        fontSize: 18,
        color: '#333333',
        padding: 2,
        textAlign: 'center',
    },
    horizontalBar: {
        borderBottomWidth: 1,
        borderColor: 'rgba(192,192,192,0.7)',
        marginVertical: 5,
        marginHorizontal: 10
    },
    cartButtonText: {
        color: '#ffffff', // Adjust text color for Pay with EMI
        fontSize: 18,
        // fontWeight: 'bold',
      },
      loaderContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      },
});