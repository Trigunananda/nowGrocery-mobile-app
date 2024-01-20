import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import Loader from '../../../component/Loader';
const ReferAndEarn = () => {
  const [loading, setLoading] = useState(true);
    const lottieRef = useRef(null);

    useEffect(() => {
      if (lottieRef.current) {
        lottieRef.current.play(); // Start the animation when the component mounts
      }
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
     
     {/* <LottieView
        source={require('../../../../assets/lottie/AnimationReferLottie.json')} // Replace with your Lottie animation file
        autoPlay
        loop
        style={styles.animation}
      /> */}

{/*      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Refer & Earn</Text>
      </View> */}
      <View style={styles.subheadingContainer}>
        <Text style={styles.subheading}>What is Referral Point?</Text>
        <Text style={styles.description}>
          When a user gets registered on nowgrocery.com, users receive Promotional{' '}
          <Text style={styles.boldText}>1000 referral Points</Text> to use while shopping.
        </Text>
        <Text style={styles.subheading}>How to use Referral Point?</Text>
        <Text style={styles.description}>
          Shop worth{' '}
          <Text style={styles.boldText}>1000/-</Text> & above & use{' '}
          <Text style={styles.boldText}>5%</Text> from the referral points.
        </Text>
        <Text style={styles.description}>
          (If your cart value is 1000/-, then you can use{' '}
          <Text style={styles.boldText}>50 points</Text> from the referral point.)
        </Text>
        <Text style={styles.description}>
          <Text style={styles.boldText}>1 Point = 1 Rupee</Text>
        </Text>
      </View>
      <View style={styles.inviteButtonContainer}>
        <TouchableOpacity style={styles.inviteButton}>
          <Text style={styles.inviteButtonText}>Invite Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  animation: {
    width: 350, // Adjust the width of the animation as needed
    height: 350, // Adjust the height of the animation as needed
    // marginBottom: 10,
  },
  lottieBackground: {
    // borderColor:'blue',
    marginHorizontal:10,
    ...StyleSheet.absoluteFillObject,
    zIndex: -1, // Place the Lottie animation behind other components
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: 'rgb(102,102,102)',
  },
  subheadingContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  subheading: {
    fontSize: 22,
    color: 'rgb(184,105,108)',
    marginBottom: 5,
  },
  description: {
    color: 'rgb(106,106,106)',
    fontSize: 18,
    marginBottom: 15,
  },
  boldText: {
    fontWeight: 'bold',
    color: 'rgb(102,102,102)',
  },
  inviteButtonContainer: {
    alignItems: 'center',
  },
  inviteButton: {
    backgroundColor: 'rgb(255,0,0)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  inviteButtonText: {
    color: 'rgb(255,228,228)',
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

export default ReferAndEarn;
