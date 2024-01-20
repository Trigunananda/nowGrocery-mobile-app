import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

const NestedItemsTabs = ({ nestedItems, selectedTab, onTabPress }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.nestedItemsContainer}>
      {nestedItems &&
        nestedItems.map((nestedItem, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => onTabPress(nestedItem.slug)}
              style={[
                styles.nestedItemContainer,
                selectedTab === nestedItem.slug && styles.selectedTab,
              ]}>
              <Text style={styles.nestedItemText}>
                {nestedItem.categoryName}
              </Text>
            </TouchableOpacity>
          );
        })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
 // Add these styles for the horizontal scroll view
 nestedItemsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginHorizontal: 0,
    marginTop: 6,
    // marginBottom: 12,
    height: 50,

  },
  nestedItemContainer: {
    backgroundColor: 'rgba(0, 128, 128, 0.2)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  selectedTab: {
    backgroundColor: 'rgba(0, 128, 128, 0.2)', // Add your selected tab background color
  },
  nestedItemText: {
    color: 'rgba(0, 128, 128, 1)',
    fontWeight: 'bold',
    fontSize: 16,
  },

});

export default NestedItemsTabs;
