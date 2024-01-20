import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import apiService from '../../services/ApiServices';
import { useAuth } from '../../context/AuthContext';
import Loader from '../../component/Loader';
import LottieView from 'lottie-react-native';

const VerifyOtp = ({ route, navigation }) => {
  const { login } = useAuth();
  const { otp, firstName, email, currentPassword, confirmPassword, mobile } = route.params;
  const [verificationCode, setVerificationCode] = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
  // const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(30);


  const iTxt1 = useRef();
  const iTxt2 = useRef();
  const iTxt3 = useRef();
  const iTxt4 = useRef();



  useEffect(() => {
    const interval = setInterval(() => {
      if (count === 0) {
        clearInterval(interval);
      } else {
        setCount(count - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [count]);

  // useEffect(() => {
  //   // Autofill OTP when it's received
  //   if (otp) {
  //     const otpArray = otp.split('');
  //     setOtpDigits(otpArray);
  //     otpArray.forEach((digit, index) => {
  //       setInputValue(index + 1, digit);
  //     });
  //   }
  // }, [otp]);


  const handleDigitChange = (i, text) => {
    if (text.length === 1) {
      const updatedOtpDigits = [...otpDigits];
      updatedOtpDigits[i - 1] = text;
      setOtpDigits(updatedOtpDigits);
  
      if (i < 4) {
        setInputValue(i + 1, '');
        
        // Automatically move to the next OTP field
        switch (i) {
          case 1:
            iTxt2.current.focus();
            break;
          case 2:
            iTxt3.current.focus();
            break;
          case 3:
            iTxt4.current.focus();
            break;
          default:
            break;
        }
      }
    } else if (text.length === 0 && i !== 1) {
      const updatedOtpDigits = [...otpDigits];
      updatedOtpDigits[i - 1] = text;
      setOtpDigits(updatedOtpDigits);
  
      // If text is cleared, move back to the previous input field
      setInputValue(i - 1, '');
    }
  };

  const setInputValue = (index, value) => {
    switch (index) {
      case 1:
        iTxt1.current.setNativeProps({ text: value });
        break;
      case 2:
        iTxt2.current.setNativeProps({ text: value });
        break;
      case 3:
        iTxt3.current.setNativeProps({ text: value });
        break;
      case 4:
        iTxt4.current.setNativeProps({ text: value });
        break;
      default:
        break;
    }
  };




  

  const handleVerification = async () => {
    // setIsLoading(true); // Show the loader when verification starts
    const enteredOtp = otpDigits.join('');
    if (enteredOtp !== '' && enteredOtp === otp) {
      // If verification code matches the OTP, proceed with the Signup API call
      const signupData = {
        ConfirmPassword: confirmPassword,
        CustomerGroupId: 5,
        CustomerName: firstName,
        Email: email,
        LoginType: 'Normal',
        MobileNumber: mobile,
        Password: currentPassword,
        ReferralCode: null,
        ReferralId: null,
      };

      try {
        // Make the POST request to the Signup API using Axios
        const signupResponse = await apiService.post('ESignUpAPI/Signup', signupData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
     // Hide the loader when the API call is complete
    //  setIsLoading(false);
        // Handle the response from the Signup API
        console.log('Signup API response:', signupResponse.data);
        // Call the login function to update the authentication state
        login(signupData.Email, signupData.Password);
        // You can navigate to the desired screen upon successful signup
        navigation.navigate('Home');
      } catch (error) {
        // Handle errors from the Signup API
        console.error('Signup API error:', error);
      }
    } else {
      // setIsLoading(false); // Hide the loader in case of an invalid OTP
      // You can show an error message or take appropriate action.
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };

  const goBack = () => {
    navigation.goBack();
  };
  
    return (
      <View style={styles.container}>
      
        <TouchableOpacity onPress={goBack} style={{ padding: 20, marginTop: 10 }}>
          <Image style={styles.backBtn} source={require('../../../assets/pngIcon/angle-left.png')} />
        </TouchableOpacity>
        <View>
          <Image source={require('../../../assets/pngIcon/Verify-Otp.png')} style={styles.otpIcon} />
        </View>
        {/* <LottieView
       source={require('../../../assets/lottie/AnimationOtp.json')} // Replace with your Lottie animation file
        autoPlay
        loop
        style={styles.otpIcon}
      /> */}
        <View>
          <Text style={styles.headerText}>OTP Verification</Text>
          <Text style={styles.subText}>Enter the 4 digit code Sent to +91 {mobile}</Text>
        </View>
        <View style={styles.otpBox}>
          <TextInput
            ref={iTxt1}
            style={[styles.inputBox, { borderColor: otpDigits[0] ? 'green' : 'black' }]}
            maxLength={1}
            value={otpDigits[0]}
            keyboardType='number-pad'
            onChangeText={text => handleDigitChange(1, text)}
          />
          <TextInput
            ref={iTxt2}
            style={[styles.inputBox, { borderColor: otpDigits[1] ? 'green' : 'black' }]}
            maxLength={1}
            value={otpDigits[1]}
            keyboardType='number-pad'
            onChangeText={text => handleDigitChange(2, text)}
          />
          <TextInput
            ref={iTxt3}
            style={[styles.inputBox, { borderColor: otpDigits[2] ? 'green' : 'black' }]}
            maxLength={1}
            value={otpDigits[2]}
            keyboardType='number-pad'
            onChangeText={text => handleDigitChange(3, text)}
          />
          <TextInput
            ref={iTxt4}
            style={[styles.inputBox, { borderColor: otpDigits[3] ? 'green' : 'black' }]}
            maxLength={1}
            value={otpDigits[3]}
            keyboardType='number-pad'
            onChangeText={text => handleDigitChange(4, text)}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
        <TouchableOpacity>
            <Text style={[styles.countDown, { color: count === 0 ? '#5490f0' : '#8888' }]}>Resend OTP   </Text>
          </TouchableOpacity>
          {count !== 0 && (
            <View><Text style={styles.countSection}>in {count} Sec</Text></View>
          )}
        </View>
        <View style={{ marginTop: 30 }}>
          {/* <TouchableOpacity onPress={() => navigation.navigate('Home')}
            style={[styles.verifyOtpBtn, { backgroundColor: otpDigits.join('') === otp ? '#5490f0' : '#8888' }]}
            disabled={otpDigits.join('') === otp ? false : true}
            
          > */}
          <TouchableOpacity  onPress={handleVerification}
            style={[styles.verifyOtpBtn, { backgroundColor: otpDigits.join('') === otp ? '#5490f0' : '#8888' }]}
            disabled={otpDigits.join('') === otp ? false : true}
            
          >
            <Text style={styles.btnTxt}>Verify Now</Text>
          </TouchableOpacity>
        </View>
        {/* <Loader visible={isLoading}/> */}
      </View>
    );
  };

  

export default VerifyOtp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    otpIcon: {
        alignSelf: 'center',
        height: 120,
        width: 120,
        marginTop: 60,
    },
    headerText: {
        color: '#000',
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 30
    },
    subText: {
        marginTop: 12,
        textAlign: 'center',
        fontSize: 16,
        color:'#888'
    },
    otpBox: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 30,
        marginBottom:12,
        // backgroundColor:'blue'
    },
    inputBox: {
        height: 50,
        width: 50,
        borderWidth: 2,
        marginLeft: 15,
        borderRadius: 5,
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 15,
        color:'#000'
    },
    verifyOtpBtn: {
        width: '80%',
        height: 50,
        backgroundColor: '#f0c654',
        alignSelf: 'center',
        // marginTop:30,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnTxt: {
        color: '#fff',
        fontSize: 20
    },
    countDown: {
        fontSize:18,
        fontWeight:'500',
        color:'green',
        // backgroundColor:'red'
     },
     countSection:{
        fontSize:14,
        color:'rgba(0,0,0,1)'
     },
     backBtn:{
        height:30,
        width:30,
     }

})