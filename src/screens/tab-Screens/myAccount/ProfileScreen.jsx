// ProfileDetailsScreen.js
import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import apiService from '../../../services/ApiServices';
import { useAuth } from '../../../context/AuthContext';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import Loader from '../../../component/Loader';

const ProfileScreen = ({ navigation }) => {
  const { customerId } = useAuth()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [gender, setGender] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // const navigation = useNavigation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get(`CustomerAPI/GetDetails/${customerId}`);
        const data = response.data;
        // console.log("data5555", data)
        setName(data.customerName);
        setEmail(data.email);
        setMobile(data.mobileNumber);
        setGender(data.gender || ''); // Set the gender, considering it might be null in the response

        // Add logic to set the profile image based on the response (data.profileImage)
      } catch (error) {
        console.error('Error fetching data:', error);
      }finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
  }, []);


  const handleUpdateProfile = async () => {
    try {
      console.log('Update Payload:', {
        customerName: name,
        email: email,
        gender: gender,
        mobileNumber: mobile,
      });
      const response = await apiService.put(`CustomerAPI/EditPerosnalInfo/${customerId}`, {
        customerName: name,
        email: email,
        gender: gender,
        mobileNumber: mobile,
      });

      // console.log('Update response:', response.data);
      // Handle success, update UI or navigate back, etc.
      // Show an alert upon successful update
      Alert.alert('Success', 'Profile updated successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
      // navigation.goBack();
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error, show an alert, etc.
    }
  };

  const handleChooseProfileImage = () => {
    setProfileImage(/* selected image data */);
  };
  // console.log('Current Gender:', gender);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={handleChooseProfileImage}>
          <View style={styles.imageContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <Text style={styles.addImageText}>Add Profile Image</Text>
            )}
          </View>
        </TouchableOpacity>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Mobile</Text>
        <TextInput
          maxLength={10}
          style={styles.input}
          value={mobile}
          onChangeText={setMobile}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Gender</Text>
        <View style={styles.radioButtonContainer}>
          <View style={styles.radioButton}>
            <RadioButton
              value={true}
              status={gender == true ? 'checked' : 'unchecked'} // Check for true instead of 'male'
              onPress={() => setGender(true)} // Set true instead of 'male'
            />
            <Text style={styles.genderColor}>Male</Text>

          </View>

          <View style={styles.radioButton}>
            <RadioButton
              value={false}
              status={gender == false ? 'checked' : 'unchecked'}
              onPress={() => {
                // console.log('Female selected');
                setGender(false);
              }}
            />
            <Text style={styles.genderColor}>Female</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
          <Text style={styles.updateButtonText}>Update Profile</Text>

        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  profileContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  addImageText: {
    fontSize: 16,
    color: '#3cc288',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'flex-start',
    color: 'black'
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: 'gray'
  },
  // updateButton: {
  //   backgroundColor: 'blue',
  //   paddingHorizontal: 20,
  //   paddingVertical: 10,
  //   borderRadius: 5,
  //   alignSelf: 'flex-end',
  // },
  // updateButtonText: {
  //   color: 'white',
  //   fontSize: 16,
  // },
  radioButtonContainer: {
    flexDirection: 'row',
    // alignItems: 'left',
    justifyContent: 'space-around',
    marginBottom: 20,
    // backgroundColor:'red',
    alignSelf: 'flex-start',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genderColor: {
    color: 'black',
    fontSize:15
  },
  updateButton: {
    backgroundColor: '#3cc288',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default ProfileScreen;
