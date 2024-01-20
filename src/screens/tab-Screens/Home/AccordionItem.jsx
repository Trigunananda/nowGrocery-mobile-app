// BankOfferAccordionScreen.js

import React from 'react';
import { ScrollView, Text,StyleSheet } from 'react-native';
import { List } from 'react-native-paper'; // Import List from react-native-paper

const BankOfferAccordionScreen = () => {
  const accordionItems = [
    { title: 'Accordion Item 1', content: 'Content for Item 1' },
    { title: 'Accordion Item 2', content: 'Content for Item 2' },
    { title: 'Accordion Item 3', content: 'Content for Item 3' },
    // Add more accordion items as needed
  ];

  return (
    <ScrollView>
      <List.AccordionGroup>
        {accordionItems.map((item, index) => (
          <List.Accordion
            key={index}
            id={index.toString()}
            title={item.title}
            style={styles.accordionContainer}
          >
            <ScrollView>
              <Text style={{ color: '#333333' }}>{item.content}</Text>
            </ScrollView>
          </List.Accordion>
        ))}
      </List.AccordionGroup>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F7F7F7', // Adjust the background color as needed
      padding: 16,
    },
    accordionContainer: {
      marginBottom: 16,
      backgroundColor: 'white', // Adjust the background color as needed
      borderRadius: 4,
      elevation: 2,
    },
    accordionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333', // Adjust the title color as needed
    },
    accordionContent: {
      backgroundColor: '#F7F7F7', // Adjust the background color as needed
      padding: 16,
      borderRadius: 4,
    },
    accordionText: {
      fontSize: 14,
      color: '#555', // Adjust the text color as needed
    },
  });
export default BankOfferAccordionScreen;
