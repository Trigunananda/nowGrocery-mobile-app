// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { StyleSheet, Text, View, Image } from 'react-native';
// //Screens


// import Notifications from '../../screens/tab-Screens/Notifications';
// import Account from '../../screens/tab-Screens/myAccount/Account';
// import CartStack from '../stackNavigator/cartStack';
// import HomeScreen from '../../screens/tab-Screens/Home/Home';
// import Category from '../../screens/tab-Screens/Category';
// import { useCart } from '../../context/CartContext';
// import Badge from '../../component/Badge/Badge';
// import { useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';




// const icon = {
//   home: require('../../../assets/bottomTabIcon/home.png'),
//   bell: require('../../../assets/bottomTabIcon/alarm.png'),
//   cat: require('../../../assets/bottomTabIcon/menu.png'),
//   bag: require('../../../assets/bottomTabIcon/bag.png'),
//   bag3d: require('../../../assets/bottomTabIcon/bag.png'),
//   // user: require('../../../assets/bottomTabIcon/profile.png'),
//   men: require('../../../assets/bottomTabIcon/profile.png'),
// }


// const Tab = createBottomTabNavigator();

// const MainTabNavigator = ({navigation}) => {
//   const {cart,getTotalQuantity,saveCartToStorage} = useCart();


//   const bagTabScreenOptions = {
//     tabBarLabel: 'Bag',
//     tabBarIcon: ({ focused, color, size }) => {
//       return (
//         <View style={{ position: 'relative' }}>
//           <Icon
//             name={focused ? 'cart' : 'cart'}
//             size={size}
//             color={focused ? '#077d1b' : '#000'}
//           />
//           <Badge count={getTotalQuantity()} /> 
//         </View>
//       );
//     },
//   };
//   return (
//     <Tab.Navigator screenOptions={({ route }) => ({
//       tabBarIcon: ({ focused, color, size }) => {
//         let iconName;
//         let colorchange;
//         if (route.name === 'Home') {
//           iconName = focused ? icon.home : icon.home  ;
//           colorchange = focused ? '#077d1b' : '#000';
//         // } else if (route.name === 'Notice') {
//         //   iconName = focused ? icon.bell : icon.bell;
//         //   colorchange = focused ? '#077d1b' : '#000';
//         } else if (route.name === 'Category') {
//           iconName = focused ? icon.cat : icon.cat;
//           colorchange = focused ? '#077d1b' : '#000';
//         } else if (route.name === 'Account') {
//           iconName = focused ? icon.men : icon.men;
//           colorchange = focused ? '#077d1b' : '#000';
//         } else if (route.name === 'Bag') {
//           iconName = focused ? icon.bag : icon.bag;
//           colorchange = focused ? '#077d1b' : '#000';
//         }

//         return <View>
//           <Image
//             source={iconName}
//             style={{
//               width: 30,
//               height:30,
//               borderWidth:2,
//               marginHorizontal:3,
//               resizeMode: 'contain',
//               tintColor:colorchange
//             }}
//           />
//           {/* <Text style={{color:colorchange}} >
//             {route.name}
//           </Text> */}
//                  {/* <Badge count={getTotalQuantity()} /> */}
//         </View>


//       },

//       tabBarStyle: { 
//         showLabel:false,
//         elevation: 0,
//         backgroundColor: '#fff',
//         height: 60,
//         borderRadius: 15,
//         size:12
//         // ...styles.shadow/
//       },
//       headerShown: false,
//       // tabBarShowLabel:false,
//       tabBarLabelStyle: {
//         fontSize: 12,
//         marginBottom:3
//       },
//       tabBarInactiveTintColor: '#000', 
//       tabBarActiveTintColor: '#077d1b',
//       // tabBarActiveBackgroundColor:'#242B2E',
//     })}

//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       {/* <Tab.Screen name="Notice" component={Notifications}  /> */}
//       <Tab.Screen name="Category" component={Category}
//         />
//       <Tab.Screen name="Account" component={Account} />
//       <Tab.Screen name="Bag" component={CartStack} options={bagTabScreenOptions} />
//     </Tab.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   shadow: {
//     shadowColor: '#758283',
//     shadowOffset: {
//       width: 0,
//       height: 10
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.5,
//     elevation: 5
//   }
// })

// export default MainTabNavigator;


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
// Screens
import Notifications from '../../screens/tab-Screens/Notifications';
import Account from '../../screens/tab-Screens/myAccount/Account';
import CartStack from '../stackNavigator/cartStack';
import HomeScreen from '../../screens/tab-Screens/Home/Home';
import Category from '../../screens/tab-Screens/Category';
import { useCart } from '../../context/CartContext';
import Badge from '../../component/Badge/Badge';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const Tab = createBottomTabNavigator();

const MainTabNavigator = ({ navigation }) => {
  const { cart, getTotalQuantity, saveCartToStorage, } = useCart();


  const icon = {
    home: 'home',
    bell: 'bell',
    cat: 'menu',
    men: 'account',
    bag: 'cart',
  };

  const bagTabScreenOptions = {
    tabBarLabel: 'Bag',
    tabBarIcon: ({ focused, color, size }) => {
      return (
        <View style={{ position: 'relative' }}>
          <Icon
            name={focused ? 'cart' : 'cart-outline'}
            size={size}
            color={focused ? '#077d1b' : '#000'}
          />
          <Badge count={getTotalQuantity()} />
        </View>
      );
    },
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let colorchange;
          if (route.name === 'Home') {
            iconName = focused ? icon.home : icon.home;
            colorchange = focused ? '#077d1b' : '#000';
          } else if (route.name === 'Category') {
            iconName = focused ? icon.cat : icon.cat;
            colorchange = focused ? '#077d1b' : '#000';
          } else if (route.name === 'Account') {
            iconName = focused ? icon.men : icon.men;
            colorchange = focused ? '#077d1b' : '#000';
          } else if (route.name === 'Bag') {
            iconName = focused ? icon.bag : icon.bag;
            colorchange = focused ? '#077d1b' : '#000';
          }

          return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Icon
                name={iconName}
                size={size}
                style={{
                  color: colorchange,
                }}
              />
            </View>
          );
        },

        tabBarStyle: {
          showLabel: false,
          elevation: 0,
          backgroundColor: '#fff',
          height: Platform.OS === 'ios' ? '10%' :'6%', // Adjust as needed
          borderRadius: 15,
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          // marginBottom: 3,
        },
        tabBarInactiveTintColor: '#000',
        tabBarActiveTintColor: '#077d1b',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Category" component={Category} />
      <Tab.Screen name="Account" component={Account} />
      <Tab.Screen name="Bag" component={CartStack} options={bagTabScreenOptions} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({

});

export default MainTabNavigator;
