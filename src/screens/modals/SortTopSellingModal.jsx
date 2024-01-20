// FilterSortModal.js
import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import products from '../../data/Product';


// Define your sorting function outside the component
const sortProducts = (products, selectedSortOption) => {
    return products.slice().sort((a, b) => {
      if (selectedSortOption === 'highToLow') {
        return b.price - a.price;
      } else if (selectedSortOption === 'lowToHigh') {
        return a.price - b.price;
      } else if (selectedSortOption === 'latest') {
        // Add your logic to compare by date or any other relevant criteria
      }
      // Default case: Sort by relevance or do nothing
      return 0;
    });
  };
const SortTopSellingModal = ({ isVisible, onClose }) => {
    const [selectedSortOption, setSelectedSortOption] = useState('relevance');
    const [sortedProducts, setSortedProducts] = useState(products); // Initialize with your products data
  
    // Function to handle sort option change
    const handleSortOptionChange = (option) => {
      setSelectedSortOption(option);
      // Call the sorting function to update the sorted products
      const newSortedProducts = sortProducts(products, option);
      setSortedProducts(newSortedProducts);
    };
  
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Sort</Text>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>
          <TouchableOpacity
            onPress={() => handleSortOptionChange('relevance')}
            style={[
              styles.sortOption,
              selectedSortOption === 'relevance' && styles.selectedSortOption,
            ]}
          >
            <Text style={styles.textColor}>Relevance</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSortOptionChange('highToLow')}
            style={[
              styles.sortOption,
              selectedSortOption === 'highToLow' && styles.selectedSortOption,
            ]}
          >
            <Text style={styles.textColor}>Price: High to Low</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSortOptionChange('lowToHigh')}
            style={[
              styles.sortOption,
              selectedSortOption === 'lowToHigh' && styles.selectedSortOption,
            ]}
          >
            <Text style={styles.textColor}>Price: Low to High</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSortOptionChange('latest')}
            style={[
              styles.sortOption,
              selectedSortOption === 'latest' && styles.selectedSortOption,
            ]}
          >
            <Text style={styles.textColor}>Latest</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.closeModalButton} onPress={onClose}>
          <Text style={styles.closeModalButtonText}>Close</Text>
        </TouchableOpacity> */}
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  sortOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  selectedSortOption: {
    backgroundColor: 'lightblue',
  },
  closeModalButton: {
    alignSelf: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginTop:10
    // marginBottom: 20,
  },
  closeModalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  textColor:{
    color:'black'
  }
};

export default SortTopSellingModal;
