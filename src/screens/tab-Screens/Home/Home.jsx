import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import categories from '../../../data/Categories';
import products from '../../../data/Product';
import {Avatar, Button, Card, Text} from 'react-native-paper';
import Swiper from 'react-native-swiper';
import PersonalCareHome from './PersonalCareHome';
import Category from '../Category';
import DaailyStapleHome from './DaailyStapleHome';
import HouseholdHome from './HouseholdHome';
import SummerDrinks from './SummerDrinks';
import apiService from '../../../services/ApiServices';
import Loader from '../../../component/Loader';
import {useCart} from '../../../context/CartContext';
// import { saveCartToStorage } from '../../../utils/CartStorage';
import CustomToast from './CustomToast ';
import {useSearch} from '../../../context/SearchContext';
import {useAuth} from '../../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { useNavigation } from '@react-navigation/native';
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;
export const images = [
  require('../../../../assets/images/groceryFoods/dalPulses/haw.webp'),
  require('../../../../assets/images/groceryFoods/dalPulses/lamer.webp'),
  require('../../../../assets/images/groceryFoods/dalPulses/milk.webp'),
  require('../../../../assets/images/groceryFoods/dalPulses/watch.webp'),
  require('../../../../assets/images/groceryFoods/dalPulses/nivea.webp'),
  // require('../../../../assets/images/groceryFoods/attaFlour/besan.jpg'),
  // require('../../../../assets/images/groceryFoods/dryFruits/almond-2.jpg'),
  // require('../../../../assets/images/groceryFoods/dalPulses/lentil.jpg'),
  // require('../../../../assets/images/groceryFoods/oils/olive-oil-1.jpg'),

  // Add more local image paths as needed
];
const stapleData = [
  {
    imageSource: require('../../../../assets/images/groceryFoods/attaFlour/flourMix.jpg'),
    title: 'Atta & Flour',
  },
  {
    imageSource: require('../../../../assets/images/groceryFoods/attaFlour/sugar.jpeg'),
    title: 'Salt,sugar & Jaggery',
  },
  {
    imageSource: require('../../../../assets/images/groceryFoods/attaFlour/rice-flour.jpg'),
    title: 'Rice & Rice product',
  },
  {
    imageSource: require('../../../../assets/images/groceryFoods/oils/cooking.jpg'),
    title: 'Cooking oil & ghee',
  },
];

const totalImages = images.length;

const IMG_URL = 'https://cdn2.nowgrocery.com/Uploads/';

const SCREEN_WIDTH = Dimensions.get('window').width;
const HomeScreen = ({navigation}) => {
  const scrollViewRef = useRef(null);
  const {cart, addToCart, getTotalQuantity, saveCartToStorage} = useCart();
  const {customerId} = useAuth();
  const {
    searchText,
    searchResults,
    selectedProduct,
    handleSearchInputChange,
    handleProductSelect,
  } = useSearch(); // Use the useSearch hook to access the context
  // const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [addedToCartProductId, setAddedToCartProductId] = useState([]);
  const [data, setData] = useState([]);
  const [bestOfferProduct, setbestOfferProduct] = useState([]);
  const [topSlider, setTopSlider] = useState([]);
  const [stapleData, setStapleData] = useState([]);
  const [houseHold, setHouseHold] = useState([]);
  const [personalCare, setPersonalCare] = useState([]);
  const [summerDrink, setSummerDrink] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingTopSelling, setLoadingTopSelling] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [beforeSwiperResponsePersonalCare, setBeforeSwiperResponsePersonalCare] = useState([]);
  // const [insideSwiper, setInsideSwiper] = useState([]);
  // const [beforeSwiperResponseSummer, setBeforeSwiperResponseSummer] = useState([]);
  // const [insideSwiperSummer, setInsideSwiperSummer] = useState([]);
  const [
    extraSliderBannerAfterTopSelling,
    setExtraSliderBannerAfterTopSelling,
  ] = useState([]);
  const [brandBanners, setBrandBanners] = useState([]);
  const [extraSliderBanner, setExtraSliderBanner] = useState([]);
  const [expandText, setExpandText] = useState(false);
  // Step 1: Create a state variable to control the message display
  const [showToast, setShowToast] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // console.log('Inside useEffect');
    fetchData();
  }, []);

  const fetchExtraSliderBanner = async () => {
    try {
      const response = await apiService.get(
        'SliderAPI/GetExtraSliderBanners/?id=15',
      );
      const data = response.data;
      setExtraSliderBanner(data);
    } catch (error) {
      console.error('Error fetching brand banners:', error);
    }
  };
  const GetmiddleSliderBanners = async () => {
    try {
      const response = await apiService.get(
        'SliderAPI/GetExtraSliderBanners/?id=21',
      );
      const data = response.data;
      setExtraSliderBannerAfterTopSelling(data);
    } catch (error) {
      console.error('Error fetching brand banners:', error);
    }
  };
  const fetchBrandBanners = async () => {
    try {
      const response = await apiService.get(
        'SliderAPI/GetExtraSliderBanners/?id=22',
      );
      const data = response.data;
      setBrandBanners(data);
    } catch (error) {
      console.error('Error fetching brand banners:', error);
    }
  };
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % brandBanners.length;
      setCurrentIndex(nextIndex);

      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: nextIndex * SCREEN_WIDTH,
          animated: true,
        });
      }

      setTimeout(() => {
        if (nextIndex === 0) {
          scrollViewRef.current.scrollTo({
            animated: false,
            x: 0,
          });
        }
      }, 200);
    }, 1300);

    return () => clearInterval(scrollInterval);
  }, [currentIndex, brandBanners]);
  // useEffect(() => {
  //   const scrollInterval = setInterval(() => {
  //     const nextIndex = (currentIndex + 1) % banners.length;
  //     setCurrentIndex(nextIndex);
  //   }, 3000);

  //   return () => clearInterval(scrollInterval);
  // }, [currentIndex, banners]);
  // console.log("brandBanners",brandBanners)
  // console.log("personalCare", personalCare)

  const fetchData = async () => {
    try {
      await GetTopSliderBanners();
      await fetchDataTopSellingProduct();
      await GetmiddleSliderBanners();
      await getBestofferProduct();
      await getPersonalCare();
      // await makeSequentialApiCalls();
      // await makeSequentialApiCallsSummer();
      await DailyStapleHome();
      await fetchExtraSliderBanner();
      await CleaningAndHouseHold();
      const summerDrinkData = await getSummerDrink(); // Fetch summer drink data
      setSummerDrink(summerDrinkData); // Set state with the fetched data
      await fetchBrandBanners();
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };

  const makePostRequest = async payload => {
    try {
      const response = await apiService.post(
        'BannerNewAPI/GetProductByBannerId',
        {BannerDetails: payload},
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // const makeSequentialApiCalls = async () => {
  //   try {
  //     if (personalCare && personalCare.length > 0) {

  //       // API call before Swiper dynamically using personalCare[0].bannerId
  //       const beforeSwiperResponse = await makePostRequest({ BannerId: personalCare[0].bannerId });
  //       // console.log("beforeSwiperResponse",beforeSwiperResponse)
  //       setBeforeSwiperResponsePersonalCare(beforeSwiperResponse);

  //       // API calls within Swiper
  //       const insideSwiperResponses = [];
  //       for (let i = 1; i < personalCare.length; i++) {
  //         try {
  //           const itemResponse = await makePostRequest({ BannerId: personalCare[i].bannerId });
  //           insideSwiperResponses.push(itemResponse);
  //         } catch (error) {
  //           console.error('Error in insideSwiper API call:', error);
  //         }
  //       }
  //       // Update state with all responses within Swiper
  //       setInsideSwiper(insideSwiperResponses);
  //     }
  //   } catch (error) {
  //     console.error('Error during API calls:', error);
  //   }
  // };

  // const makeSequentialApiCallsSummer = async () => {
  //   try {
  //     if (summerDrink && summerDrink.length > 0) {

  //       // API call before Swiper dynamically using summerDrink[0].bannerId
  //       const beforeSwiperResponseFirst = await makePostRequest({ BannerId: summerDrink[0].bannerId });
  //       setBeforeSwiperResponseSummer(beforeSwiperResponseFirst);
  //       const beforeSwiperResponseSecond = await makePostRequest({ BannerId: summerDrink[1].bannerId });
  //       setBeforeSwiperResponseSummer(beforeSwiperResponseSecond);

  //       // API calls within Swiper
  //       const insideSwiperResponses = [];
  //       for (let i = 2; i < summerDrink.length; i++) {
  //         try {
  //           const itemResponse = await makePostRequest({ BannerId: summerDrink[i].bannerId });
  //           insideSwiperResponses.push(itemResponse);
  //         } catch (error) {
  //           console.error('Error in insideSwiper API call:', error);
  //         }
  //       }
  //       // Update state with all responses within Swiper
  //       setInsideSwiperSummer(insideSwiperResponses);
  //     }
  //   } catch (error) {
  //     console.error('Error during API calls:', error);
  //   }
  // };
  const handleImageClick = async banner => {
    try {
      const response = await makePostRequest({BannerId: banner});
      navigation.navigate('Top Selling Products', {
        data: response,
        bannerId: banner,
        screenOptions: {
          headerTitle: 'Top-Banner-product',
        },
      });
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };
  const stapleDataApi = async item => {
    try {
      const response = await makePostRequest({BannerId: item});
      navigation.navigate('Top Selling Products', {
        data: response,
        bannerId: item,
        screenOptions: {
          headerTitle: 'Staples',
        },
      });
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };
  const handleItemClickPersonalCare = async item => {
    try {
      const response = await makePostRequest({BannerId: item});
      navigation.navigate('Top Selling Products', {
        data: response,
        bannerId: item,
        screenOptions: {
          headerTitle: 'Personal-Care',
        },
      });
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };
  const handleItemSummerDrinks = async item => {
    try {
      const response = await makePostRequest({BannerId: item});
      navigation.navigate('Top Selling Products', {
        data: response,
        bannerId: item,
        screenOptions: {
          headerTitle: 'Summer-Drinks',
        },
      });
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };
  const cleanAndHouseHoldDataApi = async item => {
    try {
      const response = await makePostRequest({BannerId: item});
      // navigation.navigate('Top Selling Products', { data: response });
      navigation.navigate('Top Selling Products', {
        data: response,
        bannerId: item,
        screenOptions: {
          headerTitle: 'HouseHold',
        },
      });
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };
  const extraSliderBannerAfterTopSellingClick = async banner => {
    try {
      const response = await makePostRequest({BannerId: banner});
      navigation.navigate('Top Selling Products', {
        data: response,
        bannerId: banner,
        screenOptions: {
          headerTitle: 'Banner-product-all',
        },
      });
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };
  const handleBrandBannerClick = async banner => {
    try {
      const response = await makePostRequest({BannerId: banner});
      // navigation.navigate('Top Selling Products', { data: response });
      navigation.navigate('Top Selling Products', {
        data: response,
        bannerId: banner,
        screenOptions: {
          headerTitle: 'Banner-product-all',
        },
      });
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };
  const handleExtraSliderBannerClick = async banner => {
    try {
      const response = await makePostRequest({BannerId: banner});
      navigation.navigate('Top Selling Products', {
        data: response,
        bannerId: banner,
        screenOptions: {
          headerTitle: 'Banner-product-all',
        },
      });
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };

  // const preSyncCart = async () => {
  //   const localCartData = await AsyncStorage.getItem('cartData');
  //   console.log('homelocalCartData', localCartData)
  //   console.log('homelocalCartData', JSON.parse(localCartData)?.map((c) => c.productId))
  //   if (localCartData) {
  //     console.log('hello');
  //     setAddedToCartProductId([...addedToCartProductId, ...JSON.parse(localCartData).map((c) => c.productId)]);
  //     saveCartToStorage(JSON.parse(localCartData));
  //     addToCart(JSON.parse(localCartData));

  //   }
  // }

  const getBestofferProduct = async () => {
    try {
      const response = await apiService.get(
        'OfferAPI/GetBestOffersProductList',
      );
      setbestOfferProduct(response.data);
    } catch (error) {
      console.error('Error fetching data789:', error);
    }
  };
  const getPersonalCare = async () => {
    try {
      const response = await apiService.get(
        'SliderAPI/GetExtraSliderBanners/?id=13',
      );
      setPersonalCare(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const getSummerDrink = async () => {
    try {
      const response = await apiService.get(
        'SliderAPI/GetExtraSliderBanners/?id=16',
      );
      return response.data; // Return the fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
      return []; // Return an empty array in case of an error
    }
  };
  const fetchDataTopSellingProduct = async () => {
    try {
      const response = await apiService.get(
        'OfferAPI/GetTopSellingProductByStoreId',
      );
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data456:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const GetTopSliderBanners = async () => {
    try {
      const response = await apiService.get('SliderAPI/GetTopSliderBanners');
      setTopSlider(response.data);
    } catch (error) {
      console.error('Error fetching data123:', error);
    }
  };

  const DailyStapleHome = async () => {
    try {
      const response = await apiService.get(
        'SliderAPI/GetExtraSliderBanners/?id=14',
      );
      setStapleData(response.data);
    } catch (error) {
      console.error('Error fetching data######:', error);
    }
  };

  // const makeSequentialApiCallsPersonalCare = async () => {
  //   try {
  //     const response = await apiService.get('SliderAPI/GetExtraSliderBanners/?id=14');
  //     setStapleData(response.data);
  //   } catch (error) {
  //     console.error('Error fetching data######:', error);
  //   }
  // };

  const CleaningAndHouseHold = async () => {
    try {
      const response = await apiService.get(
        'SliderAPI/GetExtraSliderBanners/?id=17',
      );
      setHouseHold(response.data);
    } catch (error) {
      console.error('Error fetching data@@@@@@@@@:', error);
    }
  };
  const trendingProducts = products
    .filter(product => product.trending)
    .slice(0, 4);
  const renderProductItem = ({item}) => (
    <TouchableOpacity
      style={styles.productItemContainer}
      onPress={() => navigation.navigate('Product', {product: item})}
      key={item.id}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <View>
        <Text style={styles.productPrice}>Rs {item.price}</Text>
      </View>
    </TouchableOpacity>
  );
  //Add to cart logic
  // const handleAddToCart = async (productData) => {
  //   console.log('productData', productData)
  //   console.log('cart data', cart)
  //   let cartList = cart.map((t) => ({
  //     EcartItemId: 0,
  //     EcartMasterId: 0,
  //     productId: t.productId,
  //     quantity: t.quantity,
  //     subTotal: t.price, // Assuming price is the total
  //     batchId: t.batchId,
  //     mrp: t.mrp,
  //     price: t.price,
  //     imageUrl: t.imageUrl,
  //     totalStock: t.totalStock,
  //     productName: t.productName,
  //   }))
  //   try {
  //     // Check if the product is already in the cart
  //     const response = await apiService.post('CartAPI/AddCart', {
  //       EcartMasterId: 0,
  //       EcustomerId: customerId,
  //       EcartGrandTotal: productData.price, // Assuming price is the total
  //       EcartTotalTaxAmount: null,
  //       EcartShippingAmount: 0,
  //       EcartItem: [...cartList,
  //       {
  //         EcartItemId: 0,
  //         EcartMasterId: 0,
  //         productId: productData.productId,
  //         quantity: 1,
  //         subTotal: productData.price, // Assuming price is the total
  //         batchId: productData.batchId,
  //         mrp: productData.mrp,
  //         price: productData.price,
  //         imageUrl: productData.imageUrl,
  //         totalStock: productData.totalStock,
  //         productName: productData.productName,
  //       },
  //       ],
  //     });
  //     // console.log('response', response)
  //     console.log('response', response.status)
  //     // After successfully adding to the cart, set the state variable to show the message
  //     // Show the toast message
  //     setShowToast(true);

  //     // Automatically hide the toast after 2 seconds
  //     setTimeout(() => {
  //       setShowToast(false);
  //     }, 4000);

  //     if (response.status === 200) {
  //       // Update the local state and mark the product as added to cart
  //       addToCart(productData);
  //       setAddedToCartProductId([...addedToCartProductId, productData.productId]);
  //       // Save the updated data to local storage
  //       saveCartToStorage([...cart, productData]); // Pass the updated cart data including the new product
  //     } else {
  //       console.log('Failed to add to cart');
  //     }

  //   } catch (error) {
  //     console.error('Error adding to cart:', error);
  //   }
  // };

  const handleAddToCart = async productData => {

    try {
      if (!customerId) {
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
                navigation.navigate('Login');
              },
            },
          ],
          {cancelable: false},
        );
        return;
      }

      let response;

      if (customerId) {
        console.log('customerId with cart',cart)
        console.log("1111111--productData",productData)
        const cartList = cart.map(t => ({
          EcartItemId: 0,
          EcartMasterId: 0,
          productId: t.productId,
          quantity: t.quantity,
          subTotal: t.price,
          batchId: t.batchId,
          mrp: t.mrp,
          price: t.price,
          imageUrl: t.imageUrl,
          MaxStockLimit: t.totalStock,
          productName: t.productName,
        }));

        const requestPayload = {
          EcartMasterId: 0,
          EcustomerId: customerId,
          EcartGrandTotal: productData.price,
          EcartTotalTaxAmount: null,
          EcartShippingAmount: 0,
          EcartItem: [
            ...cartList,
            {
              EcartItemId: 0,
              EcartMasterId: 0,
              productId: productData.productId,
              quantity: 1,
              subTotal: productData.price,
              batchId: productData.batchId,
              mrp: productData.mrp,
              price: productData.price,
              imageUrl: productData.imageUrl,
              MaxStockLimit: productData.totalStock,
              productName: productData.productName,
            },
          ],
        };

        console.log('API Request:', requestPayload);

        response = await apiService.post('CartAPI/AddCart', requestPayload);

        console.log('API Response of add to cart:', response.data);
      } else {
        console.log('Executing else block for not logged-in user');
        const updatedCart = [...cart, productData];
        console.log('updatedCart:', updatedCart);

        try {
          await saveCartToStorage(updatedCart);
          console.log('Cart saved to storage successfully');
        } catch (error) {
          console.error('Error saving cart to storage:', error);
        }
      }

      if (response && response.status === 200) {
        addToCart(productData);
        setAddedToCartProductId([
          ...addedToCartProductId,
          productData.productId,
        ]);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 4000);
      } else {
        console.log('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleViewAll = async () => {
    try {
      setLoadingTopSelling(true);
      const response = await apiService.post(
        'ProductAPI/GetTopSellingProducts',
        {
          Limit: 12,
          Offset: 0,
        },
      );

      if (response.status === 200) {
        const data = response.data;
        navigation.navigate('Top Selling Products', {
          data,
          selectTopSelling: 'topSelling',
        });
      } else {
        console.error('API request failed');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoadingTopSelling(false);
    }
  };

  const ViewAll = async () => {
    try {
      setLoading(true);
      const response = await apiService.get('OfferAPI/GetBestOffersOnline/150');
      if (response.status === 200) {
        const data = response.data;
        navigation.navigate('Top Selling Products', {
          data,
          selectOffer: 'topOffer',
          screenOptions: {
            headerTitle: 'top-offer-products',
          },
        });
      } else {
        console.error('API request failed');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    navigation.navigate('SearchScreen');
  };
  if (!personalCare || personalCare.length === 0) {
    return null;
  }
  // const handleItemClick = (data) => {
  //   console.log('personal-data-onclick');
  //   navigation.navigate('Top Selling Products', {
  //     data,
  //     screenOptions: {
  //       headerTitle: 'Personal-Care',
  //     },
  //   });
  // };
  const handleItemClickSummerDrinks = data => {
    navigation.navigate('Top Selling Products', {
      data,
      screenOptions: {
        headerTitle: 'Summer-Drinks',
      },
    });
  };
  // console.log('Length of beforeSwiperResponse:', beforeSwiperResponse ? beforeSwiperResponse.length : 0);
  // console.log(' beforeSwiperResponseDailyStaple:', beforeSwiperResponseDailyStaple);
  // console.log(' dailystaple:',stapleData);
  return (
    <View style={{flex: 1}}>
      <View style={styles.logoContainer}>
        <View style={{flexDirection: 'row'}}>
          {/* <View style={styles.logoBorder}>
            <Text style={styles.logoText}>Now</Text>
          </View>

          <Text style={styles.groceryText}>Grocery</Text>
          <View style={styles.com}><Text style={styles.comText}>.com</Text></View> */}

          <Image
            source={require('../../../../assets/nowgrocery-logo/NowGrocery_Logo.png')}
            style={styles.imageLogo}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity onPress={handleSearch} activeOpacity={1}>
          {/* <View style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 15, borderColor: '#ccc' }}> */}
          {/* <TextInput style={{ fontSize: 15 }}
              value={searchText}
              onChangeText={handleSearchInputChange}
              placeholder="Search products"
            /> */}
          <Icon
            name="search"
            size={25}
            style={{padding: 9, top: 2}}
            color={'black'}
          />
          {/* </View> */}
        </TouchableOpacity>
      </View>

      {/* <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for products"
          placeholderTextColor="gray"
        />
      </View> */}

      <ScrollView
        showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
        showsHorizontalScrollIndicator={false}>
        <View style={styles.sliderContainerTopBanner}>
          <Swiper
            autoplay={true}
            // autoplayTimeout={3000}
            scrollInterval={3000}
            loop={true}
            showsPagination={true} // Enable pagination (dots)
            paginationStyle={styles.pagination} // Style for the pagination container
            dotStyle={styles.dot} // Style for the individual dots
            activeDotStyle={styles.activeDot} // Style for the active dot
          >
            {/* {topSlider.map((banner, index) => (
              <TouchableOpacity style={styles.slide} key={index}>
                <Image source={{ uri: IMG_URL + banner.imageUrl }} style={styles.image} resizeMode='contain' />
              </TouchableOpacity>
            ))} */}
            {topSlider.map((banner, index) => (
              <TouchableOpacity
                key={index}
                style={styles.slide}
                onPress={() => handleImageClick(banner.bannerId)}>
                <Image
                  source={{uri: IMG_URL + banner.imageUrl}}
                  style={styles.image}
                  resizeMode="stretch"
                />
              </TouchableOpacity>
            ))}
          </Swiper>
        </View>

        <View style={styles.productsContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.productsTitle}>Top Selling Products</Text>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.viewAllButton}
              onPress={handleViewAll}>
              {/* {loadingTopSelling ? (
                <Loader />
              ) : ( */}
              <Text style={styles.viewAllButtonText}>View All</Text>
              {/* )} */}
            </TouchableOpacity>
          </View>

          <View>
            {isLoading ? ( // Conditional rendering of loader
              <Loader />
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {data &&
                  data.map((productData, index) => {
                    // console.log("top product", productData);
                    const mrp = productData.mrp;
                    const price = productData.price;
                    const offerPercentage = (
                      ((mrp - price) / mrp) *
                      100
                    ).toFixed(0);
                    return (
                      <TouchableOpacity
                        activeOpacity={1}
                        key={productData.topSellingId}
                        style={styles.card}
                        index={index}
                        onPress={() =>
                          navigation.navigate('Product', {
                            slug: productData.slug,
                            product: productData.productId,
                          })
                        }>
                        <Image
                          source={{uri: IMG_URL + productData.imageUrl}}
                          // source={productData.imageUrl}
                          style={styles.productImage}
                          resizeMode="cover"
                        />
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text style={styles.productPrice}>₹ {mrp}</Text>
                          <Text
                            style={{
                              padding: 4,
                              fontWeight: 'bold',
                              fontSize: 16,
                            }}>
                            ₹{price.toFixed(2)}
                          </Text>
                          {/* <Text style={{padding:4}}>₹ {product.price}*{product.offerPercentage/100} </Text> */}
                        </View>
                        {/* <Text style={styles.productPrice}>Rs {product.price}</Text> */}
                        <Text style={styles.offerPrice}>
                          {offerPercentage}% off
                        </Text>
                        <TouchableOpacity
                          key={productData.topSellingId}
                          activeOpacity={1}
                          // onPress={()=>toggleTextLines(index)}
                          index={index}
                          style={styles.productNameContainer}>
                          {/* <Text numberOfLines={expandText ? 3 : 1} style={[styles.productNameTopSelling]}>{productData.productName}</Text> */}
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.productNameTopSelling}>
                            {productData.productName}
                          </Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity activeOpacity={1} style={styles.addToCartButton} onPress={() => addToCart(productData)}>
                        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                      </TouchableOpacity> */}

                        {cart.find(
                          item => item.productId === productData.productId,
                        ) ? (
                          <TouchableOpacity
                            activeOpacity={1}
                            style={[
                              styles.addToCartButton,
                              ,
                              {backgroundColor: 'rgba(0,128,0,0.6)'},
                            ]}
                            onPress={() => navigation.navigate('My Cart')}>
                            <Text style={{...styles.goToCartButtonText}}>
                              {' '}
                              Go to Cart{' '}
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            activeOpacity={1}
                            style={styles.addToCartButton}
                            onPress={() => handleAddToCart(productData)}>
                            <Text style={styles.addToCartButtonText}>
                              Add to Cart
                            </Text>
                          </TouchableOpacity>
                        )}
                      </TouchableOpacity>
                    );
                  })}
              </ScrollView>
            )}
          </View>
        </View>

        {/* extraSlider banner id 21 */}
        <View style={styles.sliderContainer}>
          <Swiper
            // style={{ height: 400 }} // Set your desired height
            autoplay={true}
            // autoplayTimeout={3000}
            scrollInterval={3000}
            loop={true}
            showsPagination={true} // Enable pagination (dots)
            paginationStyle={styles.pagination} // Style for the pagination container
            dotStyle={styles.dot} // Style for the individual dots
            activeDotStyle={styles.activeDot} // Style for the active dot
          >
            {extraSliderBannerAfterTopSelling.map((banner, index) => (
              <TouchableOpacity
                key={index}
                style={styles.slide}
                onPress={() =>
                  extraSliderBannerAfterTopSellingClick(banner.bannerId)
                }>
                <Image
                  source={{uri: IMG_URL + banner.imageUrl}}
                  style={styles.image}
                  resizeMode="stretch"
                />
              </TouchableOpacity>
            ))}
          </Swiper>
        </View>

        <View style={styles.productsContainerTopSelling}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.productsTopSellingTitle}>
              Top Offers Products
            </Text>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.viewAllButton}
              onPress={ViewAll}>
              {/* {loading ? (
                <Loader />
              ) : ( */}
              <Text style={styles.viewAllButtonText}>View All</Text>
              {/* )}  */}
            </TouchableOpacity>
          </View>
          <View>
            {isLoading ? ( // Conditional rendering of loader
              <Loader />
            ) : (
              <ScrollView
                horizontal
                showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
                showsHorizontalScrollIndicator={false}>
                {bestOfferProduct.map((bstProduct, index) => {
                  const mrp = bstProduct.mrp;
                  const price = bstProduct.price;
                  // const offerPercentage = Math.floor(((mrp - price) / mrp) * 100);
                  const offerPercentage = (((mrp - price) / mrp) * 100).toFixed(
                    0,
                  );

                  return (
                    <TouchableOpacity
                      activeOpacity={1}
                      key={bstProduct.bestOffersId}
                      style={styles.sellerCard}
                      // onPress={() => navigation.navigate('Product', { product: item })}
                      onPress={() =>
                        navigation.navigate('Product', {
                          slug: bstProduct.slug,
                          product: bstProduct.productId,
                        })
                      }>
                      <Image
                        source={{uri: IMG_URL + bstProduct.imageUrl}}
                        style={styles.productImage}
                        resizeMode="cover"
                      />
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.productPrice}>₹ {mrp}</Text>
                        {/* <Text style={{ padding: 4, fontWeight: 'bold', fontSize: 16 }}>₹{Math.floor(bstProduct.mrp -
                    (product.price * (product.offerPercentage / 100)))}</Text> */}
                        <Text
                          style={{
                            padding: 4,
                            fontWeight: 'bold',
                            fontSize: 16,
                          }}>
                          ₹{price.toFixed(2)}
                        </Text>
                        {/* <Text style={{ padding: 4, fontWeight: 'bold', fontSize: 16 }}>₹{Math.floor(price).toString()}</Text> */}
                      </View>

                      <Text style={styles.sellerOfferPrice}>
                        {offerPercentage}% off
                      </Text>
                      {/* <Text style={styles.productNameTopSelling}>{bstProduct.productName}</Text> */}
                      <TouchableOpacity
                        key={bstProduct.bestOffersId}
                        activeOpacity={1}
                        // onPress={()=>toggleTextLines(index)}
                        index={index}
                        style={styles.productNameContainer}>
                        {/* <Text numberOfLines={expandText ? 3 : 1} style={[styles.productNameTopSelling]}>{bstProduct.productName}</Text> */}
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={styles.productNameTopSelling}>
                          {bstProduct.productName}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity activeOpacity={1}>
                        {/* <Text style={styles.addToCartButtonText}>Add to Cart</Text> */}

                        {cart.find(
                          item => item.productId === bstProduct.productId,
                        ) ? (
                          <TouchableOpacity
                            activeOpacity={1}
                            style={[
                              styles.addToCartButton,
                              ,
                              {backgroundColor: 'rgba(0,128,0,0.6)'},
                            ]}
                            onPress={() => navigation.navigate('My Cart')}>
                            <Text style={{...styles.goToCartButtonText}}>
                              {' '}
                              Go to Cart{' '}
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            activeOpacity={1}
                            style={styles.addToCartButton}
                            onPress={() => handleAddToCart(bstProduct)}>
                            <Text style={styles.addToCartButtonText}>
                              Add to Cart
                            </Text>
                          </TouchableOpacity>
                        )}
                      </TouchableOpacity>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}
          </View>
        </View>
        <View style={styles.personalCareOuterContainer}>
          <View style={styles.productsContainerPersonalCare}>
            <Text style={styles.personalCareTitle}>Personal Care</Text>
            {/* Render the first item */}
            {/* {personalCare &&
              personalCare.length > 0 && (
                <TouchableOpacity activeOpacity={1} onPress={() => beforeSwiperResponseDailyStaple?.length > 0 && handleItemClick(beforeSwiperResponseDailyStaple)}>

                  <PersonalCareHome
                    title={personalCare[0].bannerName}
                    imageUrl={{ uri: IMG_URL + personalCare[0].imageUrl }}
                  />

                </TouchableOpacity>
              )} */}
          </View>
          <View style={styles.personalCareContainer}>
            {personalCare && personalCare.length > 0 && (
              <Swiper
                autoplay={true}
                loop={true}
                autoplayTimeout={5}
                paginationStyle={styles.personalCarePagination}
                height={270}>
                {/* Render the rest of the items */}
                {personalCare &&
                  personalCare.length > 0 &&
                  personalCare.map((item, index) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={1}
                        key={item.bannerId}
                        onPress={() =>
                          handleItemClickPersonalCare(item.bannerId)
                        }>
                        <View style={{width: '100%'}}>
                          <PersonalCareHome
                            title={item.bannerName}
                            style={styles.personalCareCard}
                            imageUrl={{uri: IMG_URL + item.imageUrl}}
                          />
                        </View>
                      </TouchableOpacity>
                    );
                  })}
              </Swiper>
            )}
          </View>
        </View>

        <View style={styles.productsContainer}>
          <Text style={styles.productsTitle}>Daily Staples</Text>

          <View style={styles.staplesRow}>
            {stapleData &&
              stapleData.map((item, index) => {
                // console.log('idb', item.bannerId)
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{width: '50%'}}
                    key={item.bannerId}
                    onPress={() => stapleDataApi(item.bannerId)}>
                    <DaailyStapleHome
                      navigation={navigation} // Pass the navigation prop here
                      imageSource={{uri: IMG_URL + item.imageUrl}} // Use the imageUrl property for the image source
                      // title={item.bannerText} // Use the bannerText property for the title
                      bannerId={item.bannerId}
                    />
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>

        {/* extraSlider banner id 15 */}
        <View style={styles.sliderContainer}>
          <Swiper
            // style={{ height: 400 }} // Set your desired height
            // autoplayTimeout={2500}
            // autoplayDirection={false}
            autoplay={true}
            scrollInterval={3000}
            loop={true}
            showsPagination={true} // Enable pagination (dots)
            paginationStyle={styles.pagination} // Style for the pagination container
            dotStyle={styles.dot} // Style for the individual dots
            activeDotStyle={styles.activeDot} // Style for the active dot
          >
            {extraSliderBanner.map((banner, index) => (
              <TouchableOpacity
                key={index}
                style={styles.slide}
                onPress={() => handleExtraSliderBannerClick(banner.bannerId)}>
                <Image
                  source={{uri: IMG_URL + banner.imageUrl}}
                  style={styles.image}
                  resizeMode="stretch"
                />
              </TouchableOpacity>
            ))}
          </Swiper>
        </View>

        {/* hello */}
        <View style={styles.productsContainer}>
          <Text style={styles.productsTitle}>Cleaning & HouseHold</Text>

          <View style={styles.staplesRow}>
            {houseHold &&
              houseHold.map((item, index) => {
                // console.log('idb',item.bannerId)
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{width: '50%'}}
                    key={item.bannerId}
                    onPress={() => cleanAndHouseHoldDataApi(item.bannerId)}>
                    <HouseholdHome
                      navigation={navigation} // Pass the navigation prop here
                      imageSource={{uri: IMG_URL + item.imageUrl}} // Use the imageUrl property for the image source
                      // title={item.bannerText} // Use the bannerText property for the title
                      bannerId={item.bannerId}
                    />
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>
        {/* <View style={styles.summerDrinnksContainer}>
          <View style={{ flex: 1, marginBottom: 15 }}>
            <Text style={styles.summerTitle}>Summer Drinks</Text>
          </View>
          <SummerDrinks />
        </View> */}

        <View style={[styles.SummerDrinkOuterContainer]}>
          <View style={styles.productsContainerPersonalCare}>
            <Text style={styles.personalCareTitle}>Summer Drinks</Text>
            {/* 
            {summerDrink && summerDrink.length > 0 && (
              <View style={{
                flexDirection: 'row', borderRadius: 8, shadowOpacity: 0.2,
                shadowRadius: 2, overflow: 'hidden',
                elvation: 5,
                justifyContent: 'space-between', backgroundColor: 'rgba(133,104,178,1)', padding: 10
              }}>
             
                <TouchableOpacity style={{ width: '47%' }} activeOpacity={1} onPress={() => beforeSwiperResponseSummer && beforeSwiperResponseSummer.length > 0 && handleItemClickSummerDrinks(insideSwiperSummer[0])}>
                  <PersonalCareHome
                    title={summerDrink[0]?.bannerName}
                    imageUrl={{ uri: IMG_URL + summerDrink[0]?.imageUrl }}
                  />
                </TouchableOpacity>

      
                <TouchableOpacity style={{ width: '47%' }} activeOpacity={1} onPress={() => beforeSwiperResponseSummer && beforeSwiperResponseSummer.length > 0 && handleItemClickSummerDrinks(insideSwiperSummer[1])}>
                  <PersonalCareHome
                    title={summerDrink[1]?.bannerName}
                    imageUrl={{ uri: IMG_URL + summerDrink[1]?.imageUrl }}
                  />
                </TouchableOpacity>
              </View>
            )} */}
          </View>

          <View style={styles.personalCareContainer}>
            {summerDrink && summerDrink.length > 0 && (
              <Swiper
                autoplay={true}
                loop={true}
                autoplayTimeout={5}
                paginationStyle={styles.personalCarePagination}
                height={280}>
                {/* {summerDrink && summerDrink.length > 0 && summerDrink.slice(2).map((item, index) => { */}
                {summerDrink &&
                  summerDrink.length > 0 &&
                  summerDrink.map((item, index) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={1}
                        key={item.bannerId}
                        onPress={() => handleItemSummerDrinks(item.bannerId)}>
                        <View style={{width: '100%'}}>
                          <PersonalCareHome
                            title={item.bannerName}
                            style={styles.personalCareCard}
                            imageUrl={{uri: IMG_URL + item.imageUrl}}
                          />
                        </View>
                      </TouchableOpacity>
                    );
                  })}
              </Swiper>
            )}
          </View>
        </View>
        {/* Brand Store */}
        <View style={styles.brandStoreContainer}>
          <Text style={styles.brandStoreTitle}>Brand Store</Text>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            decelerationRate="fast"
            onScroll={event => {
              const offsetX = event.nativeEvent.contentOffset.x;
              const index = Math.floor(offsetX / SCREEN_WIDTH);
              setCurrentIndex(index);
            }}>
            {brandBanners.map((item, index) => {
              return (
                <TouchableOpacity
                  key={item.bannerId}
                  style={styles.brandBanner}
                  onPress={() => handleBrandBannerClick(item.bannerId)}>
                  <Image
                    source={{uri: IMG_URL + item.imageUrl}}
                    style={styles.brandBannerImage}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* <Category /> */}
        <CustomToast isVisible={showToast} message={'Item added to cart'} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  summerDrinnksContainer: {
    backgroundColor: '#bdf2df',
    borderRadius: 10,
    marginTop: 7,
    // paddingHorizontal:10,
  },
  summerTitle: {
    padding: 5,
    marginTop: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop:Platform.OS === 'ios' ? '10%' : 0,
    // padding: 10,
  },
  logoBorder: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // padding: 5,
    // backgroundColor: '#FF1800',
    // borderRadius: 50, // Half of the container's width
    // width: 65,
    // height: 65
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgb(255,24,0)',
    textTransform: 'lowercase',
    top: 7,
  },
  groceryText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'rgba(0,128,0,0.7)',
    fontFamily: 'Azeret Mono',
    position: 'relative',
    right: 1,
    textTransform: 'lowercase',
  },
  com: {
    position: 'absolute',
    fontFamily: 'Azeret Mono',
    left: 111,
    top: 29,
  },
  comText: {
    color: 'black',
    fontSize: 12,
  },
  locationText: {
    color: '#888888',
    marginLeft: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6e6e6',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  optionButton: {
    backgroundColor: 'green',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  optionButtonText: {
    color: 'white',
    fontSize: 16,
  },
  categorySection: {
    marginTop: 8,
    paddingHorizontal: 10,
  },
  categoryHeaderText: {
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold',
    // marginBottom: 10,
  },
  categoryItem: {
    marginRight: 10,
    elevation: 3,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(105, 105, 105,0.8)',
  },
  categoryName: {
    marginTop: 5,
    color: '#888888',
    textAlign: 'center',
  },
  sliderContainerTopBanner: {
    flexDirection: 'row',
    // backgroundColor: 'gray',
    height: '6.4%',
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 10,
    //  marginTop:
    // backgroundColor:'red'
  },
  sliderContainer: {
    flexDirection: 'row',
    // backgroundColor: 'gray',
    height: '6.4%',
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 10,
    marginTop: 5,
    // backgroundColor:'red'
  },
  pagination: {
    bottom: 1, // Adjust the bottom position of the pagination container as needed
  },
  dot: {
    backgroundColor: 'rgba(255,255,255,.3)', // Style for inactive dots
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#7ED4E6', // Style for the active dot
    width: 12,
    height: 12,
    borderRadius: 6,
    margin: 3,
  },
  // wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth:1,
    borderRadius: 5,
    // padding:15
  },

  image: {
    width: '100%',
    // width: Dimensions.get('window').width*1, // Set a fixed width for your images
    height: '100%',
    // resizeMode:'cover'
  },
  indicator: {
    alignSelf: 'center',
    color: 'white',
    marginTop: 5,
    marginBottom: 5,
  },
  //top selling products
  card: {
    width: 140,
    margin: 5,
    marginLeft: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  sellerCard: {
    width: 140,
    margin: 5,
    marginLeft: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3,
    // borderWidth: 1,
    borderColor: '#eee', // Add a border to separate cards
    shadowColor: '#000', // Add shadow for depth
    shadowOpacity: 0.3,
    shadowRadius: 3,
    alignItems: 'center', // Center content horizontally
    overflow: 'hidden',
  },
  // productImage: {
  //   width: 100,
  //   height: 100,

  // },
  // productPrice: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   marginTop: 5,
  // },
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
  productNameTopSelling: {
    fontSize: 10,
    color: 'rgba(0,0,0,1)',
  },
  addToCartMessage: {
    backgroundColor: 'green',
    color: 'white',
    padding: 10,
    textAlign: 'center',
  },
  sellerOfferPrice: {
    position: 'absolute',
    width: 80,
    height: 20,
    top: 0,
    left: 0,
    backgroundColor: 'rgb(255,24,0)',
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
    color: '#696969',
  },
  addToCartButton: {
    marginTop: 10,
    // backgroundColor: 'rgba(0,128,0,0.6)',
    backgroundColor: '#C9003C',
    padding: 5,
    borderRadius: 5,
  },
  addToCartButtonText: {
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  goToCartButtonText: {
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  viewAllButton: {
    padding: 7,
    backgroundColor: 'rgb(255,0,0)',
    borderRadius: 5,
  },
  viewAllButtonText: {
    color: 'rgb(255,255,255)',
  },
  // productsTitle: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   marginTop: 5
  // },
  productItem: {
    // flexDirection: 'row', // Horizontal layout
    marginRight: 14,
  },
  productInfo: {
    // marginLeft: 10,
  },
  originalPrice: {
    fontSize: 12,
    marginRight: 8,
    // textDecorationLine: 'line-through',
    // color: '#787878', // Change color as needed
    fontWeight: '600',
  },
  originalPriceMrp: {
    textDecorationLine: 'line-through',
    color: '#787878',
  },

  productsContainer: {
    marginTop: 8,
    paddingHorizontal: 10,
  },

  productsContainerTopSelling: {
    marginTop: 8,
    paddingHorizontal: 10,
    backgroundColor: '#5a9679', // Background color
    borderRadius: 10, // Rounded corners
    paddingVertical: 12, // Add some vertical padding
    shadowColor: '#000', // Add shadow
    // shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  productsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: 'black',
  },
  productsTopSellingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#fff',
    textTransform: 'uppercase',
  },
  productItemContainer: {
    marginRight: 16,
    alignItems: 'center',
    // backgroundColor:'rgb(196,153,59)',
    backgroundColor: '#5a9679',
    borderRadius: 8,
  },
  productImage: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  productName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,1)',
  },
  productPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: '#777777',
    textDecorationLine: 'line-through',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeButton: {
    fontSize: 23,
    color: 'green',
  },
  personalCareContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth: 1,
    borderColor: 'rgba(192,192,192,1)',
    padding: 10,
    borderRadius: 8,
    margin: 3,
    backgroundColor: 'rgba(255,255,255,1)',
    elevation: 5,
    marginTop: 8,
  },
  personalCareCard: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  personalCareOuterContainer: {
    marginTop: 8,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(133,104,178,1)', // Background color
    borderRadius: 10, // Rounded corners
    paddingVertical: 12, // Add some vertical padding
    shadowColor: '#000', // Add shadow
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  SummerDrinkOuterContainer: {
    marginTop: 8,
    paddingHorizontal: 10,
    // backgroundColor: '#bdf2df', // Background color
    backgroundColor: '#0abab5', // Background color
    borderRadius: 10, // Rounded corners
    paddingVertical: 12, // Add some vertical padding
    shadowColor: '#000', // Add shadow
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  productsContainerPersonalCare: {
    marginTop: 8,
    paddingHorizontal: 17,
  },
  personalCareTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#fff',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  staplesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 16,
    flexWrap: 'wrap',
  },
  bannerCard: {
    width: SCREEN_WIDTH,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  bannerImage: {
    flex: 1,
  },

  //Brand store
  brandStoreContainer: {
    // marginVertical: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  brandStoreTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    // marginBottom: 12,
    color: 'black',
    // marginBottom: 10,
  },
  brandBanner: {
    marginRight: 8,
    marginLeft: 8,
    borderRadius: 8,
    // overflow: 'hidden',
  },
  brandBannerImage: {
    width: 120,
    height: 120,
  },
  brandBannerText: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 12,
  },
  imageLogo: {
    height: 50,
    width: 220,
    right: 50,
  },
});
