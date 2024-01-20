import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  Alert,
  // TextInput,
} from 'react-native';
// import {TextInput} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import VerifyOtp from './VerifyOtp';
import apiService from '../../services/ApiServices';
import { useAuth } from '../../context/AuthContext';
import { TextInput, IconButton } from 'react-native-paper';
import eyeOpenIcon from '../../../assets/pngIcon/visible.png';
import eyeClosedIcon from '../../../assets/pngIcon/hide.png';
import Loader from '../../component/Loader';
// import { useCart } from '../../context/CartContext';

const LoginScreen = ({ navigation }) => {
  const { email, setEmail, password, setPassword, emailError, passwordError, invalidCredentialsError, login } = useAuth();

  console.log("email", email);
  console.log("password", password);
  const [mode, setMode] = useState('mobile');
  //   const [email, setEmail] = useState('');
  //   const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  //   const [emailError, setEmailError] = useState('');
  //   const [passwordError, setPasswordError] = useState('');
  //   const [invalidCredentialsError, setInvalidCredentialsError] = useState('');

  const handleForgotPassword = () => {
    // Implement your "Forgot Password" logic here
    console.log('Forgot Password');
    navigation.navigate('Forgot-Password');
  };

  const handleCreateAccount = () => {
    // Implement your "Create Account" logic here
    console.log('Now You have in SignUp Account');
    navigation.navigate('SignUp');
  };

  const handleLogin = async () => {
    try {
      // Show loader or alert here before making the login API call
      // You can use a state variable to control the visibility of the loader or manage an alert
    // Show loader before making the login API call
    setIsLoading(true);
      // Call the login function from the context
      await login(email, password);
        // Hide the loader after login API call
        setIsLoading(false);
    } catch (error) {
 // Handle login error and hide the loader
 setIsLoading(false);
      console.error('Login error:', error);
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
   {isLoading ? (
        <Loader />
      ) : (
      <ImageBackground
        source={require('../../../assets/images/loginBackgroundImage.png')}
        style={styles.imageBackground}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          activeOpacity={3}
          style={{ alignItems: 'flex-end', margin: 12 }}>
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: 700 }}>
            Skip Login
          </Text>
        </TouchableOpacity>
        <View style={styles.contentContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../../assets/nowgrocery-logo/NowGrocery_Logo.png')}
              style={styles.imageLogo}
            />
          </View>
          <View style={styles.formContainer}>
            <Text style={{ color: 'rgb(247,33,60)' }}>
              {invalidCredentialsError}
            </Text>
            <>
              <TextInput
                // style={styles.input}
                label="Email/Mobile"
                mode="flat"
                width={300}
                placeholder="Enter your email or mobile"
                placeholderTextColor="black"
                onChangeText={text => setEmail(text)}
              />
              <Text style={{ color: 'rgb(255,0,0)' }}>{emailError}</Text>
              <TextInput
                // style={styles.input}
                label="Password"
                width={300}
                mode="flat"
                placeholder="Enter your Password"
                placeholderTextColor="black"
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                secureTextEntry={!passwordVisible}
                onChangeText={text => setPassword(text)}
              />

              <Text style={{ color: 'red' }}>{passwordError}</Text>
            </>
            {isPasswordFocused && (
              <IconButton
                icon={() => (
                  <Image
                    source={passwordVisible ? eyeOpenIcon : eyeClosedIcon}
                    style={{ width: 24, height: 24, tintColor: 'black' }}
                  />
                )}
                onPress={() => setPasswordVisible(!passwordVisible)}
                style={styles.eyeIcon}
              />
            )}
            <View style={styles.loginContainer}>
      
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin} // Call the handleLogin function on button press
                disabled={isLoading} // Disable the login button while loading
              >
                <View style={styles.loginButtonText}>
                  <Icon name="arrow-right" size={20} color="green" />
                </View>
              </TouchableOpacity>
  
            </View>
      
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account?</Text>
              <TouchableOpacity onPress={handleCreateAccount}>
                <Text style={styles.signupLink}> SignUp</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgotPassword}>
                  {/* {mode === 'mobile' ? ' ' : 'Forgot Your Password?'} */}
                  {/* Forgot Password */}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
        )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'rgba(155,255,153,1)'
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  crossIcon: {
    position: 'absolute',
    top: 85,
    left: 20,
    zIndex: 2, // Ensure the icon is above other content
  },
  logoContainer: {
    // alignItems: 'center',
    marginVertical: 15,
    // backgroundColor: '#fff',
    // elevation: 3,
    // borderRadius: 12,
  },
  loginSignupText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'right',
    // marginTop: 30,
  },
  logoBorder: {
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 5,
    // backgroundColor: '#FF1800',
    // borderRadius: 50, // Half of the container's width
    // marginRight: 5,
    // width: 65,
    // height: 65
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(255,0,0,1)',
    textTransform: 'lowercase',
  },
  groceryText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00e300',
    fontFamily: 'Azeret Mono',
    textTransform: 'lowercase',
  },
  com: {
    position: 'absolute',
    fontFamily: 'Azeret Mono',
    right: 15,
    bottom: -2,
  },
  comText: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 12,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(73, 73, 73, 0.8)',
    borderTopLeftRadius: 35,
    borderBottomRightRadius: 35,
    padding: 25,
    // marginTop: 3,
  },
  input: {
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    // borderTopEndRadius: 10,
    // borderTopLeftRadius: 10,
    // marginBottom: 7,
    height: 50,
    borderWidth: 1,
    padding: 10,
    color: '#000',
    borderColor: '#ccc',
    borderRadius: 10,
    // paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
    color: 'white',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  signupText: {
    color: '#ffffff',
    fontSize: 16,
  },
  signupLink: {
    color: '#27e6b9',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // marginTop: 3,
  },
  loginButton: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  loginButtonText: {
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  forgotPasswordContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  forgotPassword: {
    color: '#27e6b9',
    fontSize: 16,
    fontWeight: '500',
  },
  bottomImage: {
    width: '100%', // To stretch the image across the entire width of the container
    height: 300, // Adjust the height as needed
    resizeMode: 'cover', // or 'contain' depending on your image aspect ratio preference
  },
  imageLogo: {
    height: 80,
    width: 200,
  },
  mobileLoginContainer: {
    backgroundColor: '#4CAF50', // Choose your desired background color
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  mobileLoginText: {
    color: '#FFFFFF', // Choose your desired text color
    fontWeight: 'bold',
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    top: 125, // Adjust the top position based on your design
    right: 17
  },
});

export default LoginScreen;
