// import react, { useState, useEffect } from 'react';
// import { StyleSheet, SafeAreaView, TouchableOpacity, Text, View, ScrollView, Image, FlatList } from 'react-native'
// import { List, Card, } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/FontAwesome';
// // import products from '../../../data/Product';

// const Category = () => {

//   const accordionItems = [
//     { id: 1, title: 'Grocery & Gourmet', img: require('../../../assets/images/groceryFoods/attaFlour/flour-mix.jpg') },
//     { id: 2, title: 'Bakery, Diary & Eggs', img: require('../../../assets/images/groceryFoods/attaFlour/jowar-daliya.jpg') },
//     { id: 3, title: 'Beverages', img: require('../../../assets/images/groceryFoods/attaFlour/agririch-maida-500-g.jpg') },
//     { id: 4, title: 'Snacks & Packged Foods', img: require('../../../assets/images/groceryFoods/attaFlour/multigrain-sattu.jpg') },
//     { id: 5, title: 'Personal Care & Hygiene', img: require('../../../assets/images/groceryFoods/attaFlour/sorghum-dalia.jpg') },
//     { id: 6, title: 'Cleaning & Household', img: require('../../../assets/images/groceryFoods/attaFlour/rice-flour.jpg') },
//     { id: 7, title: 'Pet Zone', img: require('../../../assets/images/groceryFoods/attaFlour/ragi-flour.jpg') },
//     { id: 8, title: 'Baby Care', img: require('../../../assets/images/groceryFoods/attaFlour/maida.jpg') },
//   ];

//   const [categoryItem, setCategoryItem] = useState([
//     { id: 1, title: 'Oil', img: require('../../../assets/images/groceryFoods/oils/olive-oil-1.jpg') },
//     { id: 2, title: 'Dry fruits', img: require('../../../assets/images/groceryFoods/dryFruits/hazelnut.jpg') },
//     { id: 3, title: 'Dalpilses', img: require('../../../assets/images/groceryFoods/dalPulses/chana.jpg') },
//     { id: 4, title: 'Oil', img: require('../../../assets/images/groceryFoods/oils/olive-oil-1.jpg') },
//     { id: 5, title: 'Dry fruits', img: require('../../../assets/images/groceryFoods/dryFruits/hazelnut.jpg') },
//     { id: 6, title: 'Dalpilses', img: require('../../../assets/images/groceryFoods/dalPulses/chana.jpg') },
//     // { id: 4, title: 'Snacks & Packged Foods', img: require('../../../assets/images/groceryFoods/oils/olive-oil-1.jpg')},
//     // { id: 5, title: 'Personal Care & Hygiene', img:require('../../../assets/images/groceryFoods/oils/olive-oil-1.jpg')},
//     // { id: 6, title: 'Cleaning & Household', img: require('../../../assets/images/groceryFoods/oils/olive-oil-1.jpg')},
//     // { id: 7, title: 'Pet Zone', img:require('../../../assets/images/groceryFoods/oils/olive-oil-1.jpg')},
//     // { id: 8, title: 'Baby Care', img: require('../../../assets/images/groceryFoods/oils/olive-oil-1.jpg')},
//   ]);

//   const subCategoryItem = ({ item }) => (

//     <View style={styles.productItemContainer}>
//       <Image source={item.img} style={styles.productImage} />
//       <Text style={styles.productName}>{item.title}</Text>
//     </View>

//     // <Text>hello</Text>
//   );
//   const subCategoryTab = () => (
//     console.log('pratyush')
//   )

//   const createRows = () => {
//     const rows = [];
//     for (let i = 0; i < categoryItem.length; i += 3) {
//       const rowItems = categoryItem.slice(i, i + 3);
//       rows.push(rowItems);
//     }
//     return rows;
//   };



//   return (
//     <SafeAreaView>
//       <ScrollView>
//         <View style={{ flex: 1, justifyContent: 'center', padding: 8 }}>
//           <List.AccordionGroup>

//             {accordionItems.map((item, index) => (

//               <List.Accordion
//                 key={index}
//                 id={index.toString()} // Unique ID for each accordion
//                 style={{ borderColor: 'grey', borderBottomWidth: 1 }}
//                 title={
//                   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                     <Image
//                       source={item.img} // Replace with your image URL
//                       style={{ width: 100, height: 100, marginRight: 10 }}
//                     />
//                     <Text style={{ color: 'black' }}>{item.title}</Text>
//                   </View>
//                 }
//               >

//                 {/* <FlatList
//                   data={categoryItem}
//                   renderItem={subCategoryItem}
//                   keyExtractor={item => item.id}
//                   horizontal
//                   showsHorizontalScrollIndicator={false}
//                 /> */}

//                 {createRows().map((row, rowIndex) => (
//                   <View key={rowIndex} style={styles.rowContainer}>
//                     {row.map(item => (
//                       <TouchableOpacity activeOpacity={1} key={item.id} style={styles.wishlistItem}
//                         onPress={() => subCategoryTab()}
//                       >
//                         <View style={styles.imageContainer} >
//                           <Image source={item.img} style={styles.image} />
//                         </View>
//                         <Text style={styles.name} >{item.title}</Text>
//                         {/* <TouchableOpacity style={{ backgroundColor: '#39b84f', padding: 10, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('Cart')}>
//                     <Text style={{ color: '#fff' }}>Add to Cart</Text>
//                   </TouchableOpacity> */}
//                       </TouchableOpacity>
//                     ))}
//                   </View>
//                 ))}
//               </List.Accordion>
//             ))}
//           </List.AccordionGroup>
//         </View>

//       </ScrollView>
//     </SafeAreaView>
//   )
// }

// export default Category

// const styles = StyleSheet.create({
//   container: {

//   },
//   header: {
//     flexDirection: 'row'
//   },

//   productTitle: {
//     color: '#fff',
//     textAlign: 'center'
//   },
//   productItemContainer: {
//     // flexDirection:'row',
//     padding: 5,
//     backgroundColor: 'black',
//     borderWidth: 1,
//     // width:'100%'
//   },
//   productImage: {
//     height: 100,
//     width: 100
//   },
//   productName: {
//     color: '#fff',
//     textAlign: 'center'
//   },

//   productPrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginTop: 5,
//   },
//   rowContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     // marginBottom: 12, // Add margin between rows
//     height: 170,
//     marginTop: 10,
//     marginBottom: 3
//   },
//   wishlistItem: {
//     width: '32%', // Adjust the width to leave space for margins
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 10,
//     elevation: 4,
//   },
//   topContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   heartIconContainer: {
//     borderRadius: 50,
//     padding: 5,
//   },
//   costContainer: {
//     marginLeft: 10,
//   },
//   imageContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderColor: 'rgba(192,192,192,0.8)',
//     borderWidth: 2,
//     borderRadius: 7,
//     elevation: 2
//   },
//   image: {
//     width: '100%',
//     height: 100,
//     borderRadius: 8,
//     resizeMode: 'cover',
//   },
//   name: {
//     marginTop: 7,
//     fontWeight: 'bold',
//     color: '#888888',
//     textAlign: 'center'
//     // fontSize: 18,
//   },
//   cost: {
//     marginBottom: 10,
//     color: '#888',
//     fontSize: 14,
//   },

// })


import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import apiService from '../../services/ApiServices';
import Loader from '../../component/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';

const Category = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiService.get('CategoryAPI/GetAllMenuCategory');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const toggleAccordion = (categoryId) => {
    setExpanded((prev) => (prev === categoryId ? null : categoryId));
  };

  const renderSubCategories = (subCategories) => {
    return (
      <View style={styles.cardContainer}>
        {subCategories.map((item) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={item.categoryId}
            style={styles.subCategoryCard}
            onPress={() => navigateToProductList(item.slug, item.child)}
          >
            <Image
              source={{ uri: 'https://via.placeholder.com/150' }}
              style={styles.subCategoryImage}
            />
            <Text style={styles.subCategoryCardText}>{item.categoryName}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const navigateToProductList = async (slug, nestedItems) => {
    try {
      const response = await apiService.post(
        'ProductAPI/GetProductByCategorySlug',
        {
          BrndIds: null,
          Limit: 12,
          Offset: 0,
          Slug: slug,
          SortType: 'PriceHigh',
        }
      );

      navigation.navigate('Top Selling Products', {
        data: response.data,
        slug: slug,
        categoryTrue: true,
        nestedItems: nestedItems,
        screenOptions: {
          headerTitle: slug,
        },
      });
    } catch (error) {
      console.error('Error fetching products', error);
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
    <SafeAreaView style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.categoryId.toString()}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => toggleAccordion(item.categoryId)}
            >
              <View
                style={[
                  styles.categoryHeader,
                  expanded === item.categoryId && styles.expandedCategoryHeader,
                ]}
              >
                <Image
                  source={{ uri: 'https://via.placeholder.com/150' }}
                  style={styles.categoryImage}
                />
                <Text
                  style={[
                    styles.categoryHeaderText,
                    expanded === item.categoryId &&
                      styles.expandedCategoryHeaderText,
                  ]}
                >
                  {item.categoryName}
                </Text>
              </View>
            </TouchableOpacity>
            {expanded === item.categoryId &&
              renderSubCategories(item.child)}
          </View>
        )}
        ListHeaderComponent={() => <View style={{ height: 20 }} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    marginHorizontal: 10,
  },
  categoryItem: {
    marginVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  expandedCategoryHeader: {
    backgroundColor: '#4CAF50', // Green color for expanded header
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0', // Light grey border
  },
  categoryHeaderText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  expandedCategoryHeaderText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 20,
    textTransform: 'capitalize',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 8,
  },
  subCategoryCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  subCategoryCardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  subCategoryImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
});

export default Category;




