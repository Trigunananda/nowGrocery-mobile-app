// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import axios from 'axios';
// import apiService from '../../../services/ApiServices';
// import { useAuth } from '../../../context/AuthContext';
// import Loader from '../../../component/Loader';

// export default function OrderScreen({ navigation }) {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [orders, setOrders] = useState([]);
//   const {customerId } = useAuth();
//   const handleSearch = () => {
//     // Perform search logic based on searchQuery
//   };

//   const handleFilter = () => {
//     // Open filter modal or perform filter logic
//   };

//   useEffect(() => {
//     // Function to fetch orders from the API
//     const fetchOrders = async () => {
//       try {
//         const response = await apiService.get(`EOrderAPI/GetAllOrderByCustomerId/${customerId}`);
//         setOrders(response.data);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       }
//     };

//     // Call the function when the component mounts
//     fetchOrders();
//   }, []);
// // console.log("all orders",orders);
//  // Function to render each order item
// const renderItem = ({ item }) => {
//   // console.log('Rendering item:', item);

//   return (
//     <TouchableOpacity
//       style={styles.orderItem}
//       onPress={() => navigation.navigate('Order Details', { orderId: item.eorderMasterId })}
//     >
//       <View style={styles.orderDetails}>
//         <Text style={styles.orderNumber}>{`Invoice Number: ${item.eorderNo}`}</Text>
//         <Text style={styles.orderDate}>{`Order Date: ${item.eorderDate}`}</Text>
//         <Text style={styles.orderStatus}>{`Order Status: ${item.eorderStatus}`}</Text>
//         <Text style={styles.orderAmount}>{`Order Amount: ₹${Math.round(item.egrandTotal)}`}</Text>
//       </View>
//       <TouchableOpacity style={styles.chevronButton}>
//         <Icon name="chevron-right" size={12} color="#787878" />
//       </TouchableOpacity>
//     </TouchableOpacity>
//   )
// }

// if (!orders) {
//   return (
//       <View  style={{flex:1,justifyContent: "center",alignItems: "center"}}>
//       <Loader/>
//       </View>
//   );
// }
//   return (
    
//     <View style={styles.container}>

//       <View style={styles.searchBar}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search for orders..."
//           placeholderTextColor="#6e6b64"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//         <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
//           <Icon name="search" size={20} color="#FFFFFF" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.filterButton} onPress={handleFilter}>
//           <View style={styles.filterContent}>
//             <Icon name="filter" size={20} color="#FFFFFF" style={styles.filterIcon} />
//             <Text style={styles.filterButtonText}>Filter</Text>
//           </View>
//         </TouchableOpacity>
//       </View>

//       <FlatList
//         data={orders}
//         keyExtractor={(item) => item.eorderMasterId.toString()}
//         renderItem={renderItem}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   searchBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   searchInput: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#6e6b64',
//     borderRadius: 8,
//     padding: 8,
//     marginRight: 8,
//   },
//   searchButton: {
//     backgroundColor: '#1B98F5',
//     padding: 10,
//     borderRadius: 8,
//   },
//   filterButton: {
//     marginLeft: 'auto',
//   },
//   filterContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   filterIcon: {
//     marginRight: 5,
//   },
//   filterButtonText: {
//     color: '#FFFFFF',
//   },
//   orderItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderWidth: 1,
//     borderColor:'black',
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 16,

//   },
//   orderDetails: {
//     flex: 1,

//   },
//   orderNumber: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color:'black'
//   },
//   orderDate: {
//     marginTop: 4,
//     color:'black'
//   },
//   orderStatus: {
//     marginTop: 4,
//     color:'black'
//   },
//   orderAmount: {
//     marginTop: 4,
//     color:'black'
//   },
//   chevronButton: {
//     marginLeft: 16,
//   },
// });



import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import apiService from '../../../services/ApiServices';
import { useAuth } from '../../../context/AuthContext';
import Loader from '../../../component/Loader';

export default function OrderScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);
  const { customerId } = useAuth();
  const [loading, setLoading] = useState(true); 

  const handleSearch = () => {
    // Perform search logic based on searchQuery
  };

  const handleFilter = () => {
    // Open filter modal or perform filter logic
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiService.get(`EOrderAPI/GetAllOrderByCustomerId/${customerId}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchOrders();
  }, [customerId]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.orderItem}
        onPress={() => navigation.navigate('Order Details', { orderId: item.eorderMasterId })}
      >
        <View style={styles.orderDetails}>
          <Text style={styles.orderNumber}>{`Invoice Number: ${item.eorderNo}`}</Text>
          <Text style={styles.orderDate}>{`Order Date: ${item.eorderDate}`}</Text>
          <Text style={styles.orderStatus}>{`Order Status: ${item.eorderStatus}`}</Text>
          <Text style={styles.orderAmount}>{`Order Amount: ₹${Math.round(item.egrandTotal)}`}</Text>
        </View>
        <TouchableOpacity style={styles.chevronButton}>
          <Icon name="chevron-right" size={12} color="#787878" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }


  if (!orders || orders.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.centeredView}>
          <View style={styles.noOrdersCard}>
          <Text style={styles.noOrdersText}><Text style={{color:'black',fontWeight: 'bold',}}>You haven't placed any orders yet.</Text> Once you make a purchase, your orders will be displayed here.</Text>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {/* <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for orders..."
          placeholderTextColor="#6e6b64"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Icon name="search" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={handleFilter}>
          <View style={styles.filterContent}>
            <Icon name="filter" size={20} color="#FFFFFF" style={styles.filterIcon} />
            <Text style={styles.filterButtonText}>Filter</Text>
          </View>
        </TouchableOpacity>
      </View> */}

      <FlatList
        data={orders}
        keyExtractor={(item) => item.eorderMasterId.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#6e6b64',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: '#1B98F5',
    padding: 10,
    borderRadius: 8,
  },
  filterButton: {
    marginLeft: 'auto',
  },
  filterContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterIcon: {
    marginRight: 5,
  },
  filterButtonText: {
    color: '#FFFFFF',
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  orderDetails: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  orderDate: {
    marginTop: 4,
    color: 'black',
  },
  orderStatus: {
    marginTop: 4,
    color: 'black',
  },
  orderAmount: {
    marginTop: 4,
    color: 'black',
  },
  chevronButton: {
    marginLeft: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noOrdersCard: {
    backgroundColor: '#FFFFFF', // Change the background color
    borderRadius: 16,
    padding: 15,
    marginHorizontal:10,
    // marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  noOrdersText: {
    fontSize: 20, // Increase font size
    fontWeight: 'normal',
    color: 'rgb(102,102,102)', // Change text color
    textAlign: 'center',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});
