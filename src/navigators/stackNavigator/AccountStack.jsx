// AccountStack.js
import { createStackNavigator } from '@react-navigation/stack';
// import EditAddress from '../screens/Account/EditAddress'; // Import your EditAddress screen
import AddEditAddressScreen from '../../screens/address/AddEditAddressScreen';
import AddAddressScreen from '../../screens/address/AddAddressScreen';
import LoginScreen from '../../screens/login/LoginScreen';
import SignUpScreen from '../../screens/register/SignUpScreen';
import OrderScreen from '../../screens/tab-Screens/myAccount/OrdersScreen';
import OrderStatus from '../../screens/tab-Screens/myAccount/OrderStatus';
import ForgotPassword from '../../screens/forgotPassword/ForgotPassword';
import ProfileScreen from '../../screens/tab-Screens/myAccount/ProfileScreen';
import Account from '../../screens/tab-Screens/myAccount/Account';
import MainTabNavigator from '../bottomTabNavigator/MainTabsNavigator';
const Stack = createStackNavigator();

const AccountStack = () => {
    return (
        <Stack.Navigator initialRouteName="Account" screenOptions={{ headerShown: false }}>
            {/* Other screens */}
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="AddAddress" component={AddAddressScreen} />
            <Stack.Screen name="EditAddress" component={AddEditAddressScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Orders" component={OrderScreen} />
            <Stack.Screen name="Order-status" component={OrderStatus} />
            <Stack.Screen name="Forgot-Password" component={ForgotPassword} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            {/* <Stack.Screen name="home" component={MainTabNavigator} /> */}
        </Stack.Navigator>
    );
};

export default AccountStack;