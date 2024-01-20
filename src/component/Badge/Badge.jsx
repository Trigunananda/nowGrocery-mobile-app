import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Badge = ({ count }) => {
  if (count > 0) {
    return (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{count}</Text>
      </View>
    );
  }

  return null; // Don't display the badge if the count is 0.
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    bottom: 13,
    left: 15,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
});

export default Badge;
