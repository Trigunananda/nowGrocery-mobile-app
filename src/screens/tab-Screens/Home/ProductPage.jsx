import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Share,
  FlatList,
  Alert,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {Card, RadioButton, List, ProgressBar} from 'react-native-paper'; // You might need to import these components from appropriate libraries
import Icon from 'react-native-vector-icons/FontAwesome';
import DeliveryAddressModal from '../../modals/DeliveryAddressModal';
import AccordionItem from './AccordionItem';
import products from '../../../data/Product';
import categories from '../../../data/Categories';
import RelatedProductsSection from './RelatedProductsSection';
import apiService from '../../../services/ApiServices';
import Loader from '../../../component/Loader';
import {useCart} from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
const IMG_URL = 'https://cdn2.nowgrocery.com/Uploads/';
const ProductPage = ({route, navigation}) => {
  const { customerId } = useAuth();
  const {cart,addToCart} = useCart();
  // const {cart} = useCart();
  //   console.log('product-cart', cart);
  const {product, slug} = route.params;
  const [selecteProductData, setSelectProductData] = useState(product);

  const [data, setData] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSelecteProduct, setShowSelecteProduct] = useState(false);
  const [isProductInCart, setIsProductInCart] = useState(false); // Initialize isProductInCart
  const fetchData = async () => {
    try {
      const relatedProductResponse = await apiService.get(
        `ProductAPI/GetReletedProduct/?slug=${slug}`,
      );
    //   console.log(
    //     'Related Products%%%%%%%%%%%%5:',
    //     relatedProductResponse.data,
    //   );
      setRelatedProducts(relatedProductResponse.data);

    //   const GetProductDetailsBySlug = await apiService.get(
    //     `api/ProductAPI/GetProductDetailsBySlug/${slug}`,
    //   );
    //   console.log("GetProductDetailsBySlug", GetProductDetailsBySlug);
    //   setRelatedProducts(GetProductDetailsBySlug.data);

      // Additional API call for GetProductDetailsBySlug
      // const GetProductDetailsBySlug = await apiService.get(`api/ProductAPI/GetProductDetailsBySlug/${slug}`);
      // console.log("GetProductDetailsBySlug", GetProductDetailsBySlug);
      // setRelatedProducts(GetProductDetailsBySlug.data);

      //   const GetProductDetailsBySlug = await apiService.get(
      //     `api/ProductAPI/GetProductDetailsBySlug/${slug}`,
      //   );
      //   if (GetProductDetailsBySlug.status === 200) {
      //     // console.log('GetProductDetailsBySlug', GetProductDetailsBySlug.data);
      //     setRelatedProducts(GetProductDetailsBySlug.data);

      //     // Do something with GetProductDetailsBySlug.data
      //   } else {
      //     console.log(
      //       'Error in GetProductDetailsBySlug',
      //       GetProductDetailsBySlug.status,
      //     );
      //   }

      const response = await apiService.get(
        `ProductAPI/GetProductDetailsByProductIdMobile/${product}`,
      );
      // console.log('hiii', response.data[0]);
      setData(response.data[0]);
    } catch (error) {
      console.error('Error fetching data123:', error);
    } finally {
      setIsLoading(false); // Mark loading as complete
    }
  };

//   console.log(
//     'GetProductDetailsBySlug-relatedProducts((()))))',
//     relatedProducts,
//   );

  // const staticPercentage = selectedProduct.percentage;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOpenModal = () => {
    // navigation.navigate('Product', { screen: 'AddEditAddress' });
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const handleShare = async () => {
    // const productSlug = slug;
    // const deepLink = `myapp://product/${encodeURIComponent(productSlug)}`;
    const linkUrl = `https://www.nowgrocery.com/`;
    try {
      const result = await Share.share({
        message: `Check out this awesome product from: ${linkUrl}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared via:', result.activityType);
          // Shared via activity type not null
        } else {
          console.log('Shared within the app');
          // Shared  null means  your app using your app's built-in sharing mechanism.
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Sharing dismissed');
        // Dismissed
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  //   const checkIfProductIsInCart = product => {
  //     console.log('*****product12345****', product);
  //     return cart.some(item => item.productId === product.productId);
  //   };
  const checkIfProductIsInCart = product => {
    if (product && product.productId) {
    //   console.log('*****product12345****', product);
      return cart.some(item => item.productId === product.productId);
    }
    return false; // Return false if the product or productId is undefined
  };
  // Function to update the selected product
  const updateSelectedProduct = newProduct => {
    // console.log('updateSelectedProduct', newProduct)
    setIsLoading(true);
    setShowSelecteProduct(true);
    setSelectProductData(newProduct);
    // Remove the added product from the related products
    const updatedRelatedProducts = relatedProducts.filter(
      product => product.productId !== newProduct.productId,
    );
    // Update the list of related products
    setRelatedProducts(updatedRelatedProducts);
    setTimeout(() => {
      setIsLoading(false);
      const productIsInCart = checkIfProductIsInCart(newProduct);
      setIsProductInCart(productIsInCart);
    }, 1000);
  };

  useEffect(() => {
    fetchData();
    const productIsInCart = checkIfProductIsInCart(product);
    setIsProductInCart(productIsInCart);
  }, []);
  const currentData = showSelecteProduct ? selecteProductData : data;
  // console.log("currentData",currentData)
  const stripHtmlTags = htmlString => {
    if (htmlString) {
      return htmlString.replace(/<[^>]*>|&nbsp;|\s+/g, ' ').trim();
    }
    return '';
  };
  const cleanDescription = stripHtmlTags(currentData.description);
  const mrp = currentData.mrp;
  const price = currentData.price;
  const offerPercentage = (((mrp - price) / mrp) * 100).toFixed(0);
  // const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);


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
        addToCart(currentData);
        // After adding to the cart, update isProductInCart
        setIsProductInCart(true);
      }
    }
  };
  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* {isLoading ? ( // Conditional rendering of loader
        <Loader />
      ) : ( */}
        <ScrollView
          showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
          showsHorizontalScrollIndicator={false}>
        <Swiper style={styles.imageSlider}>
            {currentData && currentData.productImageList ? (
              currentData.productImageList.map((image, index) =>
                image ? (
                  <Image
                    key={index}
                    source={{uri: IMG_URL + image}}
                    style={styles.sliderImage}
                  />
                ) : (
                  <Text key={index}>TEST</Text>
                ),
              )
            ) : (
                <View> 
              <Image
                source={require('../../../../assets/images/no-image-icon.png')}
                style={styles.sliderImage}
              />
              </View>
            )}
          </Swiper>
          {/* Add the heart icon here */}
         
          {/* <TouchableOpacity style={styles.shareIcon} onPress={handleShare}>
            <Icon name="share-square-o" size={24} color="#000000" />
          </TouchableOpacity> */}
          {/* <TouchableOpacity style={styles.wishlistButton}>
            <Icon name="heart" size={24} color="#000000" />
          </TouchableOpacity> */}
          <View>
            <Text style={styles.productTitle}>{currentData.productName}</Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text style={[styles.TextColor, styles.soldBy]}>
                  Brand Name - {currentData.brandName}
                </Text>
              </View>
            </View>
            <Text style={styles.originalPrice}>
              MRP:
              <Text style={styles.originalPriceMrp}> ₹{mrp.toFixed(2)}</Text>
            </Text>
            <View style={styles.rowContainer}>
              <Text style={styles.finalPrice}>
                Offer Price: ₹{price.toFixed(2)}
              </Text>
              <Text style={styles.discountText}>{offerPercentage}% off</Text>
            </View>
          </View>
          {/* <View style={styles.deliverToContainer}>
            <View style={styles.addressTitle}>
              <Text style={styles.address}>Address</Text>
            </View>
            <View style={styles.addressRow}>
              <View style={styles.deliverToTextContainer}>
                <Text style={styles.deliverToText}>Deliver to:</Text>
              </View>
              <View style={styles.addressTextContainer}>
                <Text style={styles.addressText}>Trigunananda Swain</Text>
              </View>
            </View>
            <View style={styles.subAddressContainer}>
              <Text style={styles.addressText}>subaddress jhsgkahkgjh </Text>
              <TouchableOpacity
                style={styles.changeButton}
                onPress={handleOpenModal}>
                <Text style={styles.changeButtonText}>Change</Text>
              </TouchableOpacity>
              <DeliveryAddressModal
                isVisible={isModalVisible}
                onClose={handleCloseModal}
              />
            </View>
          </View> */}
          <List.AccordionGroup>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>About this product</Text>
            </View>
            <List.Accordion
              // key={index}
              id={currentData.productId} // Unique ID for each accordion
              title="Product Features"
              style={styles.accordionContainer}>
              <ScrollView>
                <Text style={{color: '#333333'}}>{cleanDescription}</Text>
              </ScrollView>
            </List.Accordion>
          </List.AccordionGroup>
          <RelatedProductsSection
            products={relatedProducts} // Pass your list of related products here
            onSelectProduct={updateSelectedProduct}
          />
        </ScrollView>
      {/* )} */}
      <View style={styles.stickyBottomBar}>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.cartButton,
            {
              backgroundColor: isProductInCart
                ? 'rgba(0,128,0,0.6)'
                : '#C9003C',
            }, // Change 'anotherColor' to the desired background color for "Add to Basket"
          ]}
          // onPress={() => {
          //   if (isProductInCart) {
          //     navigation.navigate('My Cart');
          //   } else {
          //     addToCart(currentData);
          //     // After adding to the cart, update isProductInCart
          //     setIsProductInCart(true);
          //   }
          // }}
          // >
          onPress={handleAddToCart}>
          <Text style={styles.cartButtonText}>
            {isProductInCart ? 'Go to Cart' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buyNowButton}
          onPress={() => {
            if (!customerId) {
              // If user is not logged in, show an alert and redirect to login page
              Alert.alert(
                'Login Required',
                'Please log in to proceed with your purchase.',
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
              if (!isProductInCart) {
                // Add the product to the cart
                addToCart(currentData);
                // After adding to the cart, update isProductInCart
                setIsProductInCart(true);
              }
        
              // Proceed to the Order Summary screen
              navigation.navigate('Order Summary', {
                totalMRPValue: mrp,
                totalAmountValue: price,
                totalDiscountValue: offerPercentage,
              });
            }
          }}>
          <Text style={styles.buyNowButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor:'white'
  },
  imageSlider: {
    height: 300,
  },
  sliderImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    // backgroundColor:'red'
  },

  ratingViewsShareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginTop: 8,
  },
  totalView: {
    paddingLeft: 5,
    color: 'rgba(0, 0, 255, 0.6)', // Transparent blue text color
    fontSize: 14,
    fontWeight: '400',
  },
  progressbarPosition: {
    marginTop: 10,
    marginBottom: 10,
  },
  progressBar: {
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    height: 7,
  },
  progressClaimed: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountText: {
    fontSize: 16,
    marginLeft: 8,
    color: 'rgb(56,142,60)', // Change color as needed
  },
  originalPrice: {
    fontSize: 15,
    marginRight: 8,
    // textDecorationLine: 'line-through',
    color: '#999', // Change color as needed
    fontWeight: '600',
  },
  originalPriceMrp: {
    textDecorationLine: 'line-through',
  },
  finalPrice: {
    fontSize: 20,
    color: 'rgba(75,119,190,1)', // Change color as needed
    fontWeight: '500',
  },
  expctDelivery: {
    color: '#999',
  },
  expectDate: {
    color: '#333',
    fontWeight: '500',
  },
  expctPincode: {
    color: 'rgba(75,119,190,1)',
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#333333',
  },
  TextColor: {
    color: '#333333',
  },
  soldBy: {
    // marginTop:4
  },
  //add deliver address styling
  deliverToContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
    elevation: 3,
    borderRadius: 5,
    marginTop: 4,
  },
  addressTitle: {
    position: 'absolute',
    padding: 2,
    // top: 2,
    // left: 5,
    backgroundColor: 'transparent',
    zIndex: 1,
    borderRightWidth: 1,
    borderRightColor: 'gray',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    borderBottomRightRadius: 5,
    backgroundColor: 'rgba(128,128,128,0.9)',
    // backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  address: {
    color: 'rgba(255,255,255,0.8)',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
    marginBottom: 3,
  },
  deliverToTextContainer: {
    flex: 1,
  },
  addressTextContainer: {
    flex: 3,
  },
  deliverToText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addressText: {
    color: '#333333',
    fontSize: 16,
  },
  subAddressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  changeButton: {
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.4)',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    paddingVertical: 7,
    paddingHorizontal: 15,
    alignSelf: 'center',
  },
  changeButtonText: {
    color: 'rgba(0, 0, 255, 0.6)', // Transparent blue text color
    fontSize: 16,
    textAlign: 'center',
  },
  //offer section
  // offersContainer: {
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     marginBottom: 16,
  // },
  // offerCard: {
  //     width: '30%', // Adjust the width as needed
  //     borderWidth: 1,
  //     padding: 8,
  // },

  accordionContainer: {
    // marginTop: 16,
    // borderWidth: 1,
    borderColor: '#ccc',
    // backgroundColor:'blue',
    // marginRight:30
    // marginHorizontal:10
    // borderRadius: 4,
  },
  titleContainer: {
    backgroundColor: '#fff', // Background color for the title container
    // padding: 10, // Adjust padding as needed
    borderBottomWidth: 1, // Add a border to separate titles (optional)
    borderBottomColor: '#CCCCCC', // Border color (optional)
// backgroundColor:'blue',

  },
  title: {
    fontSize: 18, // Font size for the title
    fontWeight: 'bold', // Font weight for the title (optional)
    color: '#333333', // Text color for the title
  },
  card: {
    marginTop: 5,
    padding: 16,
    marginRight: 5,
  },
  cardPosition: {
    top: 5,
  },
  selectVendorTitle: {
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  offerText: {
    padding: 7,
  },
  stickyBottomBar: {
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
    top: 5,
  },
  cartButton: {
    backgroundColor: '#C9003C', // White background for Pay with EMI
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
  },

  cartButtonText: {
    color: '#ffffff', // Adjust text color for Pay with EMI
    fontSize: 18,
    // fontWeight: 'bold',
  },
  buyNowButton: {
    backgroundColor: 'orange', // Orange background for Buy Now
    paddingHorizontal: 38,
    paddingVertical: 10,
    borderRadius: 4,
  },
  buyNowButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  wishlistButton: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  shareIcon: {
    position: 'absolute',
    // top: 60,
    right: 2,
    // height:30,
    // width:30,
    // borderRadius:50,
    // backgroundColor: 'transparent',
    zIndex: 1,
    // backgroundColor:'#fff'
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default ProductPage;
