
import LottieView from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from '../../../component/Loader';

const ContactUs = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../../../assets/lottie/AnimationContactLottie.json')} // Replace with your Lottie animation file
        autoPlay
        loop
        style={styles.animation}
      />
      <View containerStyle={styles.card}>
        <View style={styles.contactInfo}>
          <Icon
            name="location-arrow"
            size={24}
            color="#007BFF"
            style={styles.icon}
          />
          <View style={styles.textContainer}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.infoText}>A unit of Hindustan Agencies</Text>
            <Text style={styles.infoText}>Bhubaneswar, Odisha, India</Text>
          </View>
        </View>
        <View style={styles.contactInfo}>
          <Icon name="envelope" size={24} color="#007BFF" style={styles.icon} />
          <Text style={styles.infoText}>Mail: info@nowgrocery.com</Text>
        </View>
        {/* <View style={styles.contactInfo}>
          <Icon name="phone" size={24} color="#007BFF" style={styles.icon} />
          <Text style={styles.infoText}>New orders: 1800-313-7533</Text>
        </View> */}
        <View style={styles.contactInfo}>
          <Icon name="phone" size={24} color="#007BFF" style={styles.icon} />
          <Text style={styles.infoText}>Whatsapp- 7327859113</Text>
        </View>
        <View style={styles.contactInfo}>
          <Icon name="phone" size={24} color="#007BFF" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.label}>Toll Free- 1800-313-7533</Text>
            {/* <Text style={styles.infoText}>1800-313-7533</Text> */}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  animation: {
    width: 350, // Adjust the width of the animation as needed
    height: 350, // Adjust the height of the animation as needed
    marginBottom: 10,
  },
  card: {
    // height:400,
    width: '100%', // Adjust the width of the card as needed
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  infoText: {
    fontSize: 16,
    color: 'black',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default ContactUs;
