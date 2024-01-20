import React from 'react';
import { View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const PersonalCareHome = ({ title, imageUrl }) => {
  const maxTitleLength = 15;
  // Truncate the title if it exceeds the maximum length and add ellipsis
  const truncatedTitle =
    title.length > maxTitleLength ? title.slice(0, maxTitleLength) + '...' : title;
  return (
    <View style={styles.cardContainer}>
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{truncatedTitle}</Text>
    </View>
    <View style={styles.cardImageContainer}>
      {/* Make sure to use the uri property for Image component */}
      <Image source={{ uri: imageUrl.uri }} style={styles.cardImage} />
    </View>
  </View>
  );
};

const styles = {
  cardContainer: {
    width: '100%', // Adjust as needed to fit single cards in one row
    borderWidth: 1,
    borderColor: 'rgba(192,192,192,1)',
    borderRadius: 8,
    overflow: 'hidden',
    elvation: 5,
    resizeMode: 'cover',
    backgroundColor: 'rgba(255,255,255,1)',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardContent: {
    padding: 10,
    backgroundColor: 'rgba(192,192,192,0.3)',
  },
  cardTitle: {
    fontSize: 16,
    // fontWeight: 'bold',
    color: 'rgba(0,128,128,0.8)',

  },
  cardImageContainer: {
    alignItems: 'flex-end',
  },
  cardImage: {
    width: '100%',
    height: 185, // Adjust the height as needed
    resizeMode: 'contain',
  },
};

export default PersonalCareHome;
