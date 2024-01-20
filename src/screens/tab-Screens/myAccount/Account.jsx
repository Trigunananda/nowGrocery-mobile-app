import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Account({ navigation }) {
  const { customerName, isLoggedIn,logout,customerId } = useAuth();
  const { clearCart } = useCart();
  // console.log('acc-navigation', navigation.navigate)
  // const handleLogout = () => {
  //   // Implement your logout logic here
  //   // ...

  //   navigation.navigate('Home'); // Navigate to the login screen after log out
  // };
  const handleLogout = () => {
    // Call the logout function from the useAuth hook
    logout();
    clearCart()
    // Additional logout logic if needed

    // Navigate to the login screen after log out
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.contentContainer}>
        <Text style={styles.rotatedText}>NowGrocery.com</Text>
      </View> */}
      <ScrollView>

        <View style={styles.card} >
        <View style={styles.cardContent}>

<View style={styles.leftContent}>
{isLoggedIn ? (
  <Text style={styles.LogIncardTitleName}>Welcome to! <Text style={{textTransform:'uppercase'}}>{customerName}</Text></Text>
 //  <Icon name="shopping-cart" size={20} color="#3cc288" style={styles.userIcon} />
 ) : (
   <Text style={styles.LogIncardTitle}>Log in to get exclusive offers</Text>
 )}
</View>
{!isLoggedIn && (
<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
  <Text style={styles.logInButtonText}>Log In</Text>
</TouchableOpacity>
   )} 
</View>
           {/* <View style={styles.leftContent}>
        {isLoggedIn ? (
          <Text style={styles.LogIncardTitle}>Welcome, {customerName}!</Text>
        ) : (
          <Text style={styles.LogIncardTitle}>Log in to get exclusive offers</Text>
        )}
      </View>
      {!isLoggedIn && (
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.logInButtonText}>Log In</Text>
        </TouchableOpacity>
      )} */}
        </View>
        {customerId && (
        <View style={[styles.card]}>
          <View style={[styles.buttonsRow]}>
            <TouchableOpacity style={styles.cardOrder} onPress={() => navigation.navigate('My Orders')}>
              <View style={styles.cardContent}>
                <View style={styles.leftContent}>
                  <Icon name="shopping-basket" size={18} color="#3cc288" style={styles.userIcon} />
                  <Text style={styles.cardTitle}>Orders</Text>
                </View>
                {/* <Icon name="chevron-right" size={15} color="#cfcac0" style={styles.rightIcon} /> */}
              </View>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.cardOrder} onPress={() => navigation.navigate('Refer-earn')}>
              <View style={styles.cardContent}>
                <View style={styles.leftContent}>
                  <Icon name="heart" size={20} color="#3cc288" style={styles.userIcon} />
                  <Text style={styles.cardTitle}>Refer & Earn</Text>
                </View>
              </View>
            </TouchableOpacity> */}
            {/* <TouchableOpacity style={styles.cardOrder} onPress={() => navigation.navigate('Wishlist')}>
              <View style={styles.cardContent}>
                <View style={styles.leftContent}>
                  <Icon name="heart" size={20} color="#3cc288" style={styles.userIcon} />
                  <Text style={styles.cardTitle}>Wishlist</Text>
                </View>
              </View>
            </TouchableOpacity> */}
          </View>

          <View style={[styles.buttonsRow, { marginTop: 5 }]}>
            <TouchableOpacity activeOpacity={1} style={styles.cardOrder} onPress={() => navigation.navigate('Contact Us')}>
              <View style={styles.cardContent}>
                <View style={styles.leftContent}>
                  <Icon name="address-book" size={24} color="#3cc288" style={styles.userIcon} />
                  <Text style={styles.cardTitle}>Contact us</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        )}

        {customerId && (
        <View style={styles.card}>
          <Text style={styles.AccountTitle}>Account Settings</Text>
          <View style={styles.sectionContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <View style={styles.cardContent}>
                <View style={styles.leftContent}>
                  <Icon name="user" size={20} color="#3cc288" style={styles.userIcon} />
                  <Text style={styles.cardTitle}>Edit Profile</Text>
                </View>
                <Icon name="chevron-right" size={12} color="#787878" style={styles.rightIcon} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 15 }} onPress={() => navigation.navigate('AddAddress', { isFromOrderSummary: false})}>
              <View style={styles.cardContent}>
                <View style={styles.leftContent}>
                  <Icon name="map-marker" size={24} color="#3cc288" style={styles.userIcon} />
                  <Text style={styles.cardTitle}>Saved Addresses</Text>
                </View>
                <Icon name="chevron-right" size={12} color="#787878" style={styles.rightIcon} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
)}
        {/* <View style={styles.card}>
          <Text style={styles.AccountTitle}>My Activity</Text>
          <View style={styles.sectionContainer}>
            <TouchableOpacity>
              <View style={styles.cardContent}>
                <View style={styles.leftContent}>
                  <Icon name="star" size={15} color="#3cc288" style={styles.userIcon} />
                  <Text style={styles.cardTitle}>Reviews</Text>
                </View>
                <Icon name="chevron-right" size={12} color="#787878" style={styles.rightIcon} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 15 }}>
              <View style={styles.cardContent}>
                <View style={styles.leftContent}>
                  <Icon name="question-circle" size={16} color="#3cc288" style={styles.userIcon} />
                  <Text style={styles.cardTitle}>Question & Answers</Text>
                </View>
                <Icon name="chevron-right" size={12} color="#787878" style={styles.rightIcon} />
              </View>
            </TouchableOpacity>
          </View>
        </View> */}
        <View style={styles.feedBackCard}>
          <Text style={styles.AccountTitle}>Feedback & Information</Text>
          <View style={styles.sectionContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('terms-and-conditions')}>
              <View style={styles.cardContent}>
                <View style={styles.leftContent}>
                  <Icon name="file-text" size={15} color="#3cc288" style={styles.userIcon} />
                  <Text style={styles.cardTitle}>Terms and Condition</Text>
                </View>
                <Icon name="chevron-right" size={12} color="#787878" style={styles.rightIcon} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 15 }} onPress={() => navigation.navigate('privacy-policy')}>
              <View style={styles.cardContent}>
                <View style={styles.leftContent}>
                  <Icon name="question" size={22} color="#3cc288" style={styles.userIcon} />
                  <Text style={styles.cardTitle}>Privacy Policy</Text>
                </View>
                <Icon name="chevron-right" size={12} color="#787878" style={styles.rightIcon} />
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity style={{ marginTop: 15 }}>
              <View style={styles.cardContent}>
                <View style={styles.leftContent}>
                  <Icon name="info-circle" size={15} color="#3cc288" style={styles.userIcon} />
                  <Text style={styles.cardTitle}>About Now Grocery</Text>
                </View>
                <Icon name="chevron-right" size={12} color="#787878" style={styles.rightIcon} />
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity style={{ marginTop: 15 }} onPress={() => navigation.navigate('shipping-policy')}>
              <View style={styles.cardContent}>
                <View style={styles.leftContent}>
                  <Icon name="info-circle" size={15} color="#3cc288" style={styles.userIcon} />
                  <Text style={styles.cardTitle}>Shipping & Exchange policy</Text>
                </View>
                <Icon name="chevron-right" size={12} color="#787878" style={styles.rightIcon} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DataPrivacy')}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Data Privacy</Text>
            <Icon name="shield" size={20} color="#6e6b64" style={styles.dataPrivacyIcon} />
          </View>
          <Text style={styles.bottomText}>Learn more about how we handle your data</Text>
        </TouchableOpacity> */}
        {/* Logout Button */}
        {customerId && (
        <View style={styles.LogOutcard}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
        )}
      </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',

    // padding: 20,
  },
  contentContainer: {
    // flexDirection:'row',
    flex: 2,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 3,
  },
  rotatedText: {
    // borderWidth: 1,
    fontSize: 48,
    transform: [{ rotate: '270deg' }],
    width: '800%',      // Ensure text takes full width of container
    textAlign: 'center',
    color: '#787878'
    // Use this to ensure vertical text orientation
  },
  card: {
    backgroundColor: '#FFFFFF',
    // borderRadius: 10,
    padding: 20,
    marginBottom: 8,
    elevation: 3,
  },
  cardOrder: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 8,
    // elevation: 2,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    width: '45%'
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  LogIncardTitleName: {
    fontSize: 20,
    color: '#606060',
    fontWeight:'600'
  },
  LogIncardTitle: {
    fontSize: 14,
    color: '#606060'
  },
  leftContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    flexDirection: 'column',
  },
  AccountTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'normal',
    color: 'black',
    marginLeft: 5
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#0abcf2',
    padding: 10,
    borderRadius: 5
  },
  logInButtonText: {
    color: '#FFFFFF'
  },
  userIcon: {
    marginRight: 8,
  },
  rightIcon: {
    // fontWeight: '400'
  },
  addPrivacy: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6e6b64',
    marginBottom: 10,
  },
  bottomText: {
    fontSize: 12,
    color: '#91908d',
    marginTop: 5,
  },
  dataPrivacyIcon: {
    marginRight: 10,
  },
  successMessage: {
    color: 'green',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  feedBackCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  LogOutcard: {
    backgroundColor: '#EFEEF1',
    padding: 20,
    elevation: 3,
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    elevation: 2,
  },
  logoutButtonText: {
    color: 'red',
    fontSize: 16,
    fontWeight: '600'
  },
})