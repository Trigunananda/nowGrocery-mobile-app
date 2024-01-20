import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  Image,
  // TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'
import apiService from '../../services/ApiServices';
import eyeOpenIcon from '../../../assets/pngIcon/visible.png';
import eyeClosedIcon from '../../../assets/pngIcon/hide.png';
import { IconButton, TextInput } from 'react-native-paper';
const SignUpScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [passwordVisibleConfirmPassword, setPasswordVisibleConfirmPassword] = useState(false);
  const [isPasswordFocusedConfirmPassword, setIsPasswordFocusedConfirmPassword] = useState(false);
  const generateOTP = () => {
    const otp = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
    return otp.toString(); // Convert the number to a string
  };

  const handleSignUp = async () => {
    // Generate a 4-digit OTP
    const otp = generateOTP();

    // Log the OTP (you can remove this line once you've confirmed it's working)
    console.log('Generated OTP:', otp);

    // Define the data to send in the POST request
    const data = {
      CustomerMobile: mobile, // Use the mobile number from your state
      TextMsg: `Use ${otp} as your login OTP. OTP is confidential. Nowgrocery never calls you asking for OTP. Sharing it with anyone gives them full access to your Nowgrocery Account`,
    };

    try {
      // Make the POST request using Axios
      const response = await apiService.post('SMSAPI/SendSMS', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("response sinup", response);
      // Check if the response is successful
      if (response.status === 200) {
        // Handle the success case
        console.log('API response:', response.data);
        navigation.navigate('Verify OTP', {
          otp: otp,
          firstName: firstName,
          email: email,
          mobile: mobile,
          currentPassword: currentPassword,
          confirmPassword: confirmPassword,
        });
      } else {
        // Handle unexpected status codes or errors from the API
        console.error('Unexpected API response:', response);
        // Show an error message to the user
        // You can customize this message based on the response
        alert('Error sending OTP. Please try again later.');
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error('API error:', error);
      // Show an error message to the user
      alert('Error sending OTP. Please check your network connection and try again.');
    }
  };

  // Function to check if the email is available
  const isEmailAvailable = async (email) => {
    try {
      const response = await apiService.get(
        `ESignUpAPI/IsEmailOrMobileNoAvailable/${email}`,
      );
      console.log('email response', response)
      if (response.data == 'Email Id is already used') {
        console.log('email-response', response.data);
        return false; // Email is not available
      } else {
        // Email is available
        return true;
      }
    } catch (error) {
      console.error('Error checking email availability:', error);
      return false;
    }
  };

  // Function to check if the mobile number is available
  const isMobileAvailable = async (mobile) => {
    try {
      const response = await apiService.get(
        `ESignUpAPI/IsEmailOrMobileNoAvailable/${mobile}`,
      );
      if (response.data == 'Mobile Number is already used') {
        console.log('mobile-response', response.data);
        return false; // Email is not available
      } else {
        // Email is available
        return true;
      }
    } catch (error) {
      console.error('Error checking mobile availability:', error);
      return false;
    }
  };
  const isEmailValid = email => {
    // Regular expression for validating email addresses
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const isMobileValid = mobile => {
    // You can customize the mobile number validation logic here
    return /^\d{10}$/.test(mobile); // Example: Validate if the mobile number is exactly 10 digits
  };

  const handleCreateAccount = () => {
    // Implement your "Create Account" logic here
    navigation.navigate('Login');
    console.log('Now You have in Login Account');
  };

  return (

    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <ImageBackground
        source={require('../../../assets/images/loginBackgroundImage.png')}
        style={styles.imageBackground}>
        <View style={styles.contentContainer}>
          <View style={styles.formContainer}>
            <View style={styles.logoContainer}>
              <Image
                            source={require('../../../assets/nowgrocery-logo/NowGrocery_Logo.png')}
                            style={styles.imageLogo}
                        />
              {/* <View style={{ flexDirection: 'row' }}>
                <View style={styles.logoBorder}>
                  <Text style={styles.logoText}>Now</Text>
                </View>

                <Text style={styles.groceryText}>Grocery</Text>
              </View>

              <View style={styles.com}>
                <Text style={styles.comText}>.com</Text>
              </View> */}
            </View>
            <TextInput
              // style={styles.input}
              label="Name"
              mode="flat"
              width={300}
              placeholder="Enter name"
              placeholderTextColor="black"
              onChangeText={text => setFirstName(text)}
            />
            {/* <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#ccc"

                            onChangeText={text => setEmail(text)}
                        /> */}
            <TextInput
              // style={styles.input}
              label="Email"
              mode="flat"
              width={300}
              placeholder="Enter email"
              placeholderTextColor="black"
              onChangeText={text => setEmail(text)}
              onBlur={async () => {
                if (!isEmailValid(email)) {
                  setEmailError('Invalid email');
                } else {
                  const isAvailable = await isEmailAvailable(email);
                  if (!isAvailable) {
                    setEmailError('Email is already used');
                  } else {
                    setEmailError(''); // Reset the error message if email is valid and not used
                  }
                }
              }}
            />
            {emailError ? (
              <Text style={{ color: 'red' }}>{emailError}</Text>
            ) : null}
            {/* <TextInput
                            style={styles.input}
                            keyboardType = 'numeric'
                            placeholder="Mobile"
                            placeholderTextColor="#ccc"
                            onChangeText={text => setMobile(text)}
                            maxLength={10} 
                        /> */}
            <TextInput
              // style={styles.input}
              label="Mobile"
              mode="flat"
              width={300}
              keyboardType="numeric"
              placeholder="Enter mobile number"
              placeholderTextColor="black"
              onChangeText={text => setMobile(text)}
              maxLength={10}
              onBlur={async () => {
                if (!isMobileValid(mobile)) {
                  setMobileError('Invalid mobile number');
                } else {
                  const isAvailable = await isMobileAvailable(mobile);
                  if (!isAvailable) {
                    setMobileError('Mobile number is already used');
                  } else {
                    setMobileError(''); // Reset the error message if mobile is valid
                  }
                }
              }}
            />
            {mobileError ? (
              <Text style={{ color: 'red' }}>{mobileError}</Text>
            ) : null}
            <TextInput
              // style={styles.input}
              label="Password"
              mode="flat"
              width={300}
              placeholder="Enter password"
              placeholderTextColor="black"
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              secureTextEntry={!passwordVisible}
              onChangeText={text => setCurrentPassword(text)}
            />
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
            <TextInput
              // style={styles.input}
              label="Confirm Password"
              mode="flat"
              width={300}
              placeholder="Enter confirm password"
              placeholderTextColor="black"
              onFocus={() => setIsPasswordFocusedConfirmPassword(true)}
              onBlur={() => setIsPasswordFocusedConfirmPassword(false)}
              secureTextEntry={!passwordVisibleConfirmPassword}
              onChangeText={text => setconfirmPassword(text)}
            />
             {isPasswordFocusedConfirmPassword && (
              <IconButton
                icon={() => (
                  <Image
                    source={passwordVisibleConfirmPassword ? eyeOpenIcon : eyeClosedIcon}
                    style={{ width: 24, height: 24, tintColor: 'black' }}
                  />
                )}
                onPress={() => setPasswordVisibleConfirmPassword(!passwordVisibleConfirmPassword)}
                style={styles.eyeIconConfirmPassword}
              />
            )}
            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity onPress={handleCreateAccount}>
                <Text style={styles.createAccount}>Already account? Login</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.loginContainer}>
              <TouchableOpacity
                style={styles.signUpButton}
                onPress={handleSignUp}>
                <Text style={styles.loginButtonText}>Sign up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.CancelButton}
                onPress={() => navigation.goBack()}>
                <Text style={styles.loginButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>

    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLogo: {
    height: 80,
    width: 200,
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBorder: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: 'rgba(224, 38, 38, 1)',
    borderRadius: 50, // Half of the container's width
    // marginRight: 5,
    width: 65,
    height: 65,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(233, 216, 216, 1)',
    textTransform: 'uppercase',
  },
  groceryText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'rgba(25, 156, 53, 1)',
    fontFamily: 'Azeret Mono',
    // marginLeft: 10,
    marginTop: 14,
  },
  com: {
    position: 'absolute',
    fontFamily: 'Azeret Mono',
    bottom: 10,
    right: 54,
  },
  comText: {
    color: '#fff',
    fontSize: 12,
  },
  formContainer: {
    // backgroundColor: 'rgba(73, 73, 73, 0.5060763888888888)',
    backgroundColor: 'rgba(73, 73, 73, 0.8)',
    borderTopLeftRadius: 35,
    borderBottomRightRadius: 35,
    padding: 20,
    width: '80%',
    // height: 280
  },
  input: {
    // width: '80%',
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
    // backgroundColor: 'rgba(247, 248, 253, 1)',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: 'rgba(56, 204, 119, 1)',
    width: '40%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CancelButton: {
    backgroundColor: '#f75d25',
    width: '40%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  createAccount: {
    color: '#50DBB4',
    fontSize: 16,
    fontWeight: 'bold',
  },
  eyeIcon: {
    position: 'absolute',
    bottom: 140, // Adjust the top position based on your design
    right: 17
  },
  eyeIconConfirmPassword:{
    position: 'absolute',
    bottom: 90, // Adjust the top position based on your design
    right: 17
  }
});

export default SignUpScreen;
