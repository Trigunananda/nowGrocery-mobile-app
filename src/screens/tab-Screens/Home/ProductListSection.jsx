import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  Modal,
} from 'react-native';
import products from '../../../data/Product';
import ProductsItem from './ProductsItem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RadioButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import apiService from '../../../services/ApiServices';
import Loader from '../../../component/Loader';
// import SortTopSellingModal from '../../modals/SortTopSellingModal';

const ProductListSection = ({route}) => {
  // const { bannerId } = route.params;
  const navigation = useNavigation();
  const {
    data,
    screenOptions,
    bannerId,
    selectTopSelling,
    selectOffer,
    nestedItems,
    categoryTrue,
    slug,
  } = route.params;
  // console.log('nestedItems', nestedItems);
  // console.log('data17234', data);
  console.log('screenOptions', screenOptions);
  // console.log('selectOffer', selectOffer);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalFilterVisible, setIsModalFilterVisible] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState('relevance');
  const [sortedProducts, setSortedProducts] = useState(data);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedBrandFilters, setSelectedBrandFilters] = useState([]);
  const [selectedPriceFilters, setSelectedPriceFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState('');
  const [brandList, setBrandList] = useState([]);
  const [products, setProducts] = useState([]);

  const brands = ['Brand1', 'Brand2', 'Brand3']; // Add your brand options here
  const prices = ['Price1', 'Price2', 'Price3']; // Add your price options here

  const toggleBrandFilter = (filter) => {
    console.log('filter', filter);
    try {
      // Toggle the selected brand filter
      setSelectedBrandFilters((prevFilters) => {
        if (prevFilters.includes(filter)) {
          return prevFilters.filter((item) => item !== filter);
        } else {
          return [...prevFilters, filter];
        }
      });
  
      // Note: Don't log the state immediately after setting it due to its asynchronous nature.
    } catch (error) {
      console.error('Error toggling brand filter and fetching products list', error);
    }
  };
  
  // console.log("product-data",setProducts)
  console.log('selectedBrandFilters', selectedBrandFilters);
  const togglePriceFilter = filter => {
    if (selectedPriceFilters.includes(filter)) {
      setSelectedPriceFilters(
        selectedPriceFilters.filter(item => item !== filter),
      );
    } else {
      setSelectedPriceFilters([...selectedPriceFilters, filter]);
    }
  };

  // const [ProductByBannerID, setProductByBannerID] = useState([]);
  // Set the header title based on screenOptions
  useEffect(() => {
    setIsLoading(false);
    if (screenOptions && screenOptions.headerTitle) {
      navigation.setOptions({
        headerTitle: screenOptions.headerTitle,
      });
    }
  }, [screenOptions, data]);

  useEffect(() => {
    const fetchBrandList = async () => {
      try {
        const response = await apiService.get(
          `ProductMasterAPI/GetBrandListByCategorySlug/${screenOptions.headerTitle}`,
        );
        if (response.status === 200) {
          setBrandList(response.data);
        } else {
          console.error('Failed to fetch brand list:', response.status);
        }
      } catch (error) {
        console.error('Error fetching brand list:', error);
      }
    };
    console.log('brandlist.........', brandList);
    fetchBrandList();
  }, [isModalFilterVisible]);

  const flatListRef = useRef(null);
  const handleOpenModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleOpenModalFilter = () => {
    console.log('filter');
    setIsModalFilterVisible(!isModalFilterVisible);
  };
  const handleCloseModalFilter = () => {
    setIsModalFilterVisible(false);
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    setSelectedBrandFilters([]);
    setSelectedPriceFilters([]);
  };

  // const applyFilters = () => {
  //   // Handle applying filters (e.g., filter data)
  //   console.log('Selected Filters:', selectedFilters);
  //   setIsModalVisible(false);
  // };

  const applyFilters = async () => {
    try {
      // Fetch products based on selected brand filters
      const response = await apiService.post(
        'ProductAPI/GetProductByCategorySlug',
        {
          BrndIds: selectedBrandFilters, // Pass the selected brand filters as a comma-separated string
          Limit: 12,
          Offset: 0,
          Slug: screenOptions.headerTitle, // Assuming you want to use the current header title
          SortType: 'PriceHigh', // Add your sorting logic if needed
          // Add other parameters if needed
        }
      );
  
      console.log('toggle-response', response.data);
  
      if (response.status === 200) {
        // Update state with the new products list
        setSortedProducts(response.data);
        // Handle navigation to the nested item's product list
        // navigation.navigate('Top Selling Products');
                // Close the modal
                setIsModalFilterVisible(false);
      } else {
        console.error('Failed to fetch updated products list:', response.status);
      }
    } catch (error) {
      console.error('Error applying filters and fetching products list', error);
    }
  };

console.log("fil-products",products)
  const calculateOfferPercentage = product => {
    const mrp = product.mrp;
    const price = product.price;
    if (mrp && price) {
      const offerPercentage = (((mrp - price) / mrp) * 100).toFixed(0);
      return offerPercentage;
    }
    return 0;
  };

  const dataWithOfferPercentage =
    data &&
    data.map(product => ({
      ...product,
      offerPercentage: calculateOfferPercentage(product),
    }));

  const sortProducts = async option => {
    setIsLoading(true);
    setSelectedSortOption(option);

    try {
      let endpoint = '';
      let params = {}; // Declare 'params' here
      let payload = {};
      const sortByMapping = {
        relevance: '0',
        lowToHigh: '1',
        highToLow: '2',
        latest: '3',
        priceHigh: 'PriceHigh', // New option for PriceHigh
        priceLow: 'PriceLow', // New option for PriceLow
      };

      if (selectTopSelling === 'topSelling') {
        // Handle 'Top Selling' sorting logic
        endpoint = 'ProductAPI/GetTopSellingProducts';
        payload = {
          Limit: 12,
          Offset: 0,
          SortBy: sortByMapping[option],
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await apiService.post(endpoint, payload);
        // console.log('api-response topSelling', response.data);
        setSortedProducts(response.data);
      } else if (selectOffer === 'topOffer') {
        // Handle 'Offer' sorting logic with GET request
        endpoint = 'OfferAPI/GetBestOffersOnline/150';
        params = {SortBy: sortByMapping[option]};
        // let topOfferURL = `${endpoint}?${new URLSearchParams(
        //   params,
        // ).toString()}`;

        // const response = await apiService.get(topOfferURL);

        const response = await apiService.get(endpoint, params);
        // console.log('Full API Response:', response);

        // console.log('api-response topOffer', response.data);
        if (response.status === 200) {
          // Update state with the sorted data
          setSortedProducts(response.data);
          // console.log('Updated Sorting Data:', response.data);
        } else {
          console.error('API request failed:', response.status);
        }

        // Exit the function after handling the 'bestOffer' section
        setIsLoading(false);
        handleCloseModal();
        return;
      } else if (bannerId) {
        // Handle 'Banner' sorting logic
        endpoint = 'BannerNewAPI/GetProductByBannerId';
        payload = {
          BannerDetails: {
            BannerId: bannerId,
            SortBy: sortByMapping[option],
          },
          headers: {
            'Content-Type': 'application/json',
          },
          // Add any other parameters needed for your API
        };
        const response = await apiService.post(endpoint, payload);
        // console.log('api-response banner', response.data);
        setSortedProducts(response.data);
      } else if (screenOptions.headerTitle) {
        // Handle 'Category' sorting logic
        endpoint = 'ProductAPI/GetProductByCategorySlug';
        payload = {
          BrndIds: null,
          Limit: 12,
          Offset: 0,
          Slug: screenOptions.headerTitle,
          SortType: sortByMapping[option],
        };
        const response = await apiService.post(endpoint, payload);
        console.log('cat-response-sort', response);
        setSortedProducts(response.data);
      }

      // console.log('Endpoint:', endpoint);
      // console.log('Payload:', payload);
    } catch (error) {
      console.error('Error sorting products:', error);
    } finally {
      setIsLoading(false);
      handleCloseModal();
    }
  };

  // Existing code...

  // Function to scroll to the top when the arrow button is pressed
  const scrollToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({offset: 0, animated: true});
    }
  };

  // Function to handle scroll events and update the scroll position state
  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setScrollPosition(offsetY);
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }
  const handleNestedItemPress = async nestedSlug => {
    console.log('nestedSlug', nestedSlug);
    // console.log('nested1222222222',nestedItem)
    try {
      // Fetch brand list
      const brandListResponse = await apiService.get(
        `ProductMasterAPI/GetBrandListByCategorySlug/${nestedSlug}`,
      );
      console.log('brandListResponse', brandListResponse);
      if (brandListResponse.status !== 200) {
        console.error('Failed to fetch brand list:', brandListResponse.status);
        return;
      }

      const response = await apiService.post(
        'ProductAPI/GetProductByCategorySlug',
        {
          BrndIds: null,
          Limit: 12,
          Offset: 0,
          Slug: nestedSlug,
          SortType: 'PriceHigh',
        },
      );
      // Update state and navigate to the nested item's product list
      setBrandList(brandListResponse.data);
      // Handle navigation to the nested item's product list
      navigation.push('Top Selling Products', {
        data: response.data,
        nestedItem: nestedItems,
        slug: nestedSlug,
        categoryTrue: true,
        screenOptions: {
          headerTitle: nestedSlug,
        },
      });
    } catch (error) {
      console.error('Error fetching nested item products', error);
    }
  };
  return (
    <View style={{flex: 1}}>
      {/* category Slider */}
      {isLoading && (
        <View style={styles.loaderContainer}>
          <Loader />
        </View>
      )}
      {/* Sort and Filter Options */}
      <View style={styles.sortAndFilter}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.sortBorder}
          onPress={handleOpenModal}>
          <View style={styles.sortFilterInsideFirstRow}>
            <Icon
              name="sort"
              size={20}
              color="rgba(0,128,128,1)"
              style={styles.icon}
            />
            <Text style={styles.sortFilterText}>Sort</Text>
          </View>
        </TouchableOpacity>
        {/* {categoryTrue ? (
           
        <TouchableOpacity activeOpacity={1} style={styles.filterBorder} onPress={handleOpenModalFilter}>
          <View style={styles.sortFilterInsideFirstRow}>
            <Icon name="filter-variant" size={20} color="rgba(0,128,128,1)" style={styles.icon} />
            <Text style={styles.sortFilterText}>Filter</Text>
          </View>
        </TouchableOpacity>
             ) : (
              null)} */}
      </View>
      {/* Horizontal scroll view for nested items */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.nestedItemsContainer}>
        {nestedItems &&
          nestedItems.map((nestedItem, index) => {
            // console.log("hii-keshab",nestedItems)
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleNestedItemPress(nestedItem.slug)}
                style={styles.nestedItemContainer}>
                <Text style={styles.nestedItemText}>
                  {nestedItem.categoryName}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
      <FlatList
        ref={flatListRef}
        data={sortedProducts}
        keyExtractor={item => item.productId}
        onScroll={handleScroll}
        // renderItem={({ item }) => <ProductsItem product={item} ProductByBannerID={ProductByBannerID}/>}
        renderItem={({item}) => <ProductsItem product={item} />}
      />
      {/* <SortTopSellingModal isVisible={isModalVisible} onClose={handleCloseModal} /> */}

      {/* Scroll to Top Button */}
      {scrollPosition > 0 && (
        <TouchableOpacity
          onPress={scrollToTop}
          style={styles.scrollToTopButton}>
          <Icon name="arrow-up" size={30} color="rgba(0,0,0,1)" />
        </TouchableOpacity>
      )}

      {/* modal */}
      {/* Sort Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sort</Text>
              <TouchableOpacity activeOpacity={1} onPress={handleCloseModal}>
                <Icon name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {/* Conditional rendering for Price High and Price Low */}
            {categoryTrue ? (
              <>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    setSelectedSortOption('priceHigh');
                    sortProducts('priceHigh');
                    handleCloseModal();
                  }}
                  style={[
                    styles.sortOption,
                    selectedSortOption === 'priceHigh' &&
                      styles.selectedSortOption,
                  ]}>
                  <View style={styles.radioButtonContainer}>
                    <RadioButton
                      value="priceHigh"
                      status={
                        selectedSortOption === 'priceHigh'
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() => sortProducts('priceHigh')}
                    />
                    <Text style={styles.textColor}>High to Low</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    setSelectedSortOption('priceLow');
                    sortProducts('priceLow');
                    handleCloseModal();
                  }}
                  style={[
                    styles.sortOption,
                    selectedSortOption === 'priceLow' &&
                      styles.selectedSortOption,
                  ]}>
                  <View style={styles.radioButtonContainer}>
                    <RadioButton
                      value="priceLow"
                      status={
                        selectedSortOption === 'priceLow'
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() => sortProducts('priceLow')}
                    />
                    <Text style={styles.textColor}>Low to High</Text>
                  </View>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    setSelectedSortOption('relevance');
                    sortProducts('relevance');
                    handleCloseModal();
                  }}
                  style={[
                    styles.sortOption,
                    selectedSortOption === 'relevance' &&
                      styles.selectedSortOption,
                  ]}>
                  <View style={styles.radioButtonContainer}>
                    <RadioButton
                      value="relevance"
                      status={
                        selectedSortOption === 'relevance'
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() => sortProducts('relevance')}
                    />
                    <Text style={styles.textColor}>Relevance</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    setSelectedSortOption('lowToHigh');
                    sortProducts('lowToHigh');
                    handleCloseModal();
                  }}
                  style={[
                    styles.sortOption,
                    selectedSortOption === 'lowToHigh' &&
                      styles.selectedSortOption,
                  ]}>
                  <View style={styles.radioButtonContainer}>
                    <RadioButton
                      value="lowToHigh"
                      status={
                        selectedSortOption === 'lowToHigh'
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() => sortProducts('lowToHigh')}
                    />
                    <Text style={styles.textColor}> Low to High</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    setSelectedSortOption('highToLow');
                    sortProducts('highToLow');
                    handleCloseModal();
                  }}
                  style={[
                    styles.sortOption,
                    selectedSortOption === 'highToLow' &&
                      styles.selectedSortOption,
                  ]}>
                  <View style={styles.radioButtonContainer}>
                    <RadioButton
                      value="highToLow"
                      status={
                        selectedSortOption === 'highToLow'
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() => sortProducts('highToLow')}
                    />
                    <Text style={styles.textColor}> High to Low</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    setSelectedSortOption('latest');
                    sortProducts('latest');
                    handleCloseModal();
                  }}
                  style={[
                    styles.sortOption,
                    selectedSortOption === 'latest' &&
                      styles.selectedSortOption,
                  ]}>
                  <View style={styles.radioButtonContainer}>
                    <RadioButton
                      value="latest"
                      status={
                        selectedSortOption === 'latest'
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() => sortProducts('latest')}
                    />
                    <Text style={styles.textColor}>Latest</Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* filter modal */}
      <View>
        {/* <TouchableOpacity onPress={toggleFilterModal}>
        <Text style={{color:'green'}}>Show Filter Modal</Text>
      </TouchableOpacity> */}
        <Modal
          visible={isModalFilterVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsModalFilterVisible(false)}>
          <ScrollView  style={[styles.modalContainer]}>
            <View style={styles.modalContent}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.title}>Filter Options</Text>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={handleCloseModalFilter}>
                  <Icon name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>
              {/* {filters.map((filter) => (
                <TouchableOpacity
                  key={filter}
                  onPress={() => {
                    toggleFilter(filter);
                    // handleCloseModalFilter();
                  }
                  }
                  style={[
                    styles.filterItem,
                    selectedFilters.includes(filter) && styles.selectedFilter,
                  ]}
                >
                  <Text style={styles.filterText}>{filter}</Text>
                </TouchableOpacity>
              ))} */}
              <View style={{flexDirection: 'row'}}>
                {/* Left side (Brand and Price filters) */}
                <View style={{flex: 1}}>
                  <Text style={styles.filterTitle}>Brand</Text>
                  {brandList.map(brand => (
                    <TouchableOpacity
                      key={brand.brandId}
                      onPress={() => toggleBrandFilter(brand.brandId)}
                      style={[
                        styles.filterItem,
                        selectedBrandFilters.includes(brand.brandId) &&
                          styles.selectedFilter,
                      ]}>
                      <Text style={styles.filterText}>
                        {selectedBrandFilters.includes(brand.brandId)
                          ? '√ '
                          : ''}
                        {brand.brandName}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Right side (Selected filters for categories) */}
                {/* <View style={{ flex: 2 }}>
            
                  <Text style={styles.selectedTitle}>Selected Brands</Text>
                  {selectedBrandFilters.map((brand) => (
                    <Text key={brand} style={styles.selectedItem}>
                      {brand}
                    </Text>
                  ))}

             
                  <Text style={styles.selectedTitle}>Selected Prices</Text>
                  {selectedPriceFilters.map((price) => (
                    <Text key={price} style={styles.selectedItem}>
                      {price}
                    </Text>
                  ))}
                </View> */}
              </View>
              <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={clearFilters}
                    style={styles.clearButton}>
                    <Text style={styles.clearButtonText}>Clear</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    // onPress={applyFilters}
                    style={styles.applyButton}>
                    <Text style={styles.applyButtonText}>Apply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sortAndFilter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(192,192,192,0.0)',
    paddingVertical: 8,
    paddingHorizontal: 20,
    zIndex: 2,
  },
  icon: {
    marginHorizontal: 8,
  },
  sortBorder: {
    borderRadius: 50,
    borderWidth: 1,
    width: 90,
    borderColor: 'rgba(128,128,128,0.5)',
    paddingVertical: 8,
  },
  filterBorder: {
    borderRadius: 50,
    borderWidth: 1,
    width: 90,
    borderColor: 'rgba(128,128,128,0.6)',
    paddingVertical: 8,
    marginLeft: 5,
  },
  sortFilterInsideFirstRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortFilterText: {
    color: 'rgba(0,128,128,1)',
    fontWeight: '600',
  },
  //sorting modal
  modalContainer: {
    flex: 1,
    padding: 10,
    // justifyContent: 'flex-end',
    backgroundColor: '#000000aa',
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    // borderTopLeftRadius: 5,
    // borderTopRightRadius: 5,
    borderRadius: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  sortOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  selectedSortOption: {
    backgroundColor: 'lightblue',
  },
  closeModalButton: {
    alignSelf: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginTop: 10,
    // marginBottom: 20,
  },
  closeModalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  textColor: {
    color: 'black',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollToTopButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,1)', // Customize the button style
    padding: 10,
    zIndex: 1,
  },
  // modal filter

  // modalContainer: {
  //   flex: 1,
  //   justifyContent: 'flex-end',
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
  // },
  // modalContent: {
  //   backgroundColor: 'white',
  //   borderTopLeftRadius: 20,
  //   borderTopRightRadius: 20,
  //   padding: 20,
  // },

  // Add these styles for the horizontal scroll view
  nestedItemsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginHorizontal: 0,
    marginTop: 6,
    // marginBottom: 12,
    height: 50,
  },
  nestedItemContainer: {
    backgroundColor: 'rgba(0, 128, 128, 0.2)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  nestedItemText: {
    color: 'rgba(0, 128, 128, 1)',
    fontWeight: 'bold',
    fontSize: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filterItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    color: '#888888',
  },
  selectedFilter: {
    backgroundColor: '#e0e0e0',
    color: '#888888',
  },
  filterText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },
  selectedFilter: {
    backgroundColor: '#f0f0f0',
    color: '#888888',
  },
  filterText: {
    fontSize: 16,
  },
  selectedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },
  selectedItem: {
    fontSize: 14,
    marginVertical: 5,
    color: '#888888',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  clearButton: {
    flex: 1,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  applyButton: {
    flex: 1,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  clearButton: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 5,
  },
  clearButtonText: {
    fontSize: 16,
    color: 'white',
  },
  applyButton: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 5,
  },
  applyButtonText: {
    fontSize: 16,
    color: 'white',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});
export default ProductListSection;
