import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';

const ShippingPolicyScreen = () => {
    return (
        <ScrollView style={styles.container}>
            {/* <Text style={styles.heading}>Terms and Conditions</Text> */}

            <Text style={styles.sectionHeading}>Shipping Policy</Text>
            <Text style={styles.paragraph}>
                At Now Grocery, our aim is to ship our products in a quick, safe and inexpensive manner. We try our best to ship goods to you as soon as possible. On an average we try to deliver the product ordered by our customers before 7.00 pm everyday within 90 mins in Bhubaneshwar or as indicated by our customers ( i.e if the customer requires a slot wise delivery)

            </Text>

            <Text style={styles.sectionHeading}>Exchange Policy</Text>
            <Text style={styles.paragraph}>
                Our shipments are carefully inspected before leaving our warehouse, but if you are not satisfied with your purchase please follow the instructions below:

                If you are unsatisfied with your purchase within that time period, we will return your purchase or exchange with a new product of equal or lesser value, however we work together to decide.

                Returns or Exchange, if any, need to be made within 7 days of receiving the goods

                In case of Exchange, the Products will be replaced with in 48 hours from receiving a complaint from the customer We do not cover misuse and abuse of the product inside of or outside of the 7 day period.
            </Text>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
        // margin: 10
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    sectionHeading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 5,
        color: '#333',
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 5,
        textAlign: 'justify', // Add this line
        color: '#333333',
    },
});

export default ShippingPolicyScreen;