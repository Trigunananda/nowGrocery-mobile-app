import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';

const PrivacyPolicyScreen = () => {
    return (
        <ScrollView style={styles.container}>
            {/* <Text style={styles.heading}>Terms and Conditions</Text> */}

            <Text style={styles.sectionHeading}>General</Text>
            <Text style={styles.paragraph}>
                NowGrocery.co.in values your concerns about online privacy & security while browsing and shopping at our website. We make every effort to guarantee that the information you provide will not be misused.

                We will not sell, share or rent your personal information to any 3rd party or use your email address/mobile number for unsolicited emails and/or SMS. Any emails and/or SMS sent by us will only be for your transactions that you do on the site. We reserve the right to communicate your personal information to any third party that makes a legally-compliant request for its disclosure.
            </Text>

            <Text style={styles.sectionHeading}>What Information do we collect?</Text>
            <Text style={styles.paragraph}>
                We collects basic personal information required to service your requests, including your name, mailing address, email and phone number. When you browse through website, we may collect information regarding the domain and host from which you access the internet, the Internet Protocol [IP] address of the computer or Internet service provider [ISP] you are using, and anonymous site statistical data.      </Text>

            <Text style={styles.sectionHeading}>When information is collected?</Text>
            <Text style={styles.paragraph}>
                This information is gathered when you purchase any product. Your card information is requested only when you place an order and is submitted via the highest level of encryption to ensure the greatest amount of safety and security.      </Text>
            <Text style={styles.sectionHeading}>Cookies</Text>
            <Text style={styles.paragraph}>
                A "cookie" is a small piece of information stored by a web server on a web browser so it can be later read back from that browser. When you browse our website, we also use “cookies” or bits of tracking data to gather information about your preferences. This includes your internet service provider’s address and your clicks and activity on our website. We do not trace this information to individual customers and will never use cookies to save confidential information such as passwords or credit/debit card information.      </Text>
            <Text style={styles.sectionHeading}>Use of Personal Information</Text>
            <Text style={styles.paragraph}>
            The primary reason we gather information is for order processing, shipping and customer service. We also use this information to improve our products, services, website content and navigation.
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

export default PrivacyPolicyScreen;