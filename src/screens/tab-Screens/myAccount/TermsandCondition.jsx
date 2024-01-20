// import React from 'react';
// import { View, ScrollView, Text, StyleSheet } from 'react-native';

// const TermsAndConditionsScreen = () => {
//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.heading}>Terms and Conditions</Text>

//       <Text style={styles.sectionHeading}>Personal Information</Text>
//       <Text style={styles.paragraph}>
//         This Privacy Policy briefly outlines how your data is collected and used by NowGrocerywheels.co.in.
//         As a visitor to the Site, it is advised to read the Privacy Policy carefully. By accessing the services provided by the Site, you agree to the collection and use of your data by us.
//       </Text>

//       <Text style={styles.sectionHeading}>Copyright</Text>
//       <Text style={styles.paragraph}>
//         All content included on this site, such as text, graphics, logos, button icons, images, digital downloads, data compilations, and software, is the property of NowGrocerywheels.co.in or its content suppliers.
//       </Text>

//       <Text style={styles.sectionHeading}>Site Access</Text>
//       <Text style={styles.paragraph}>
//         All shoppers must register and log in for placing orders on the Site. Keep your account and registration details current and correct for communications related to your purchases from the site. You agree to accept responsibility for all activities that occur under your account or password. NowGrocerywheels.co.in reserves the right to refuse service, terminate accounts, remove or edit content, or cancel orders at their sole discretion.
//       </Text>
//       <Text style={styles.sectionHeading}>Pricing</Text>
//       <Text style={styles.paragraph}>
//       All the products listed on the Site will be sold at MRP unless otherwise specified. The prices mentioned at the time of ordering will be the prices charged on the date of the delivery. Although prices of most of the products do not fluctuate on a daily basis but some of the commodities do change on a daily basis. In case the prices are higher or lower on the date of delivery not additional charges will be collected or refunded as the case may be at the time of the delivery of the order.
//       </Text>
//       <Text style={styles.sectionHeading}>Cancellation by Customer</Text>
//       <Text style={styles.paragraph}>
//       You as a customer can cancel your order anytime up to the cut-off time of the slot for which you have placed an order. Cancellation will be made on request by customer by calling our customer service No: 0674-6505144, 0674-6505155, 0674-6505166 OR a e-mail sent to us on the following e-email id : care@NowGrocerywheels.co.in In such a case we will refund any payments already made by you for the order via original method of payment If we suspect any fraudulent transaction, We will maintain a negative list of all fraudulent transactions and customers and would deny access to them or cancel any orders placed by them. 
//     </Text>
//       <Text style={styles.sectionHeading}>Order Lost/Damaged</Text>
//       <Text style={styles.paragraph}>
//       Please be aware that we are not responsible for any package that is lost or mis-delivered if incorrect address information is provided on the order form. If you receive an item that is damaged, or if you receive something other than what you ordered, please contact our customer service No: 0674-6505144, 0674-6505155, 0674-6505166 immediately. We will do our best to correct the situation. 
//      </Text>
//       <Text style={styles.sectionHeading}>You may not use the Site for any of the following purposes:</Text>
//       <Text style={styles.paragraph}>
//       Disseminating any unlawful, harassing, libellous, abusive, threatening, harmful, vulgar, obscene, or otherwise objectionable material.
// Transmitting material that encourages conduct that constitutes a criminal offence or results in civil liability or otherwise breaches any relevant laws, regulations or code of practice.
// Gaining unauthorized access to other computer systems.
// Interfering with any other person's use or enjoyment of the Site.
// Breaching any applicable laws;
// Interfering or disrupting networks or web sites connected to the Site.
// Making, transmitting or storing electronic copies of materials protected by copyright without the permission of the owner.     </Text>

//       {/* Repeat the above structure for other sections like Pricing, Cancellation by Customer, Order Lost/Damaged, etc. */}

//       <Text style={styles.sectionHeading}>Applicable Law</Text>
//       <Text style={styles.paragraph}>
//         This User Agreement shall be construed in accordance with the applicable laws of India. The Courts at Bhubaneswar shall have exclusive jurisdiction in any proceedings arising out of this agreement.
//       </Text>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   sectionHeading: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 10,
//     marginBottom: 10,
//     color: '#333',
//   },
//   paragraph: {
//     fontSize: 16,
//     marginBottom: 15,
//     color: '#555',
//   },
// });

// export default TermsAndConditionsScreen;
import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';

const TermsAndConditionsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.heading}>Terms and Conditions</Text> */}

      <Text style={styles.sectionHeading}>Personal Information</Text>
      <Text style={styles.paragraph}>
        This Privacy Policy briefly outlines how your data is collected and used by NowGrocerywheels.co.in.
        As a visitor to the Site, it is advised to read the Privacy Policy carefully. By accessing the services provided by the Site, you agree to the collection and use of your data by us.
      </Text>

      <Text style={styles.sectionHeading}>Copyright</Text>
      <Text style={styles.paragraph}>
        All content included on this site, such as text, graphics, logos, button icons, images, digital downloads, data compilations, and software, is the property of NowGrocerywheels.co.in or its content suppliers.
      </Text>

      <Text style={styles.sectionHeading}>Site Access</Text>
      <Text style={styles.paragraph}>
        All shoppers must register and log in for placing orders on the Site. Keep your account and registration details current and correct for communications related to your purchases from the site. You agree to accept responsibility for all activities that occur under your account or password. NowGrocerywheels.co.in reserves the right to refuse service, terminate accounts, remove or edit content, or cancel orders at their sole discretion.
      </Text>
      <Text style={styles.sectionHeading}>Pricing</Text>
      <Text style={styles.paragraph}>
        All the products listed on the Site will be sold at MRP unless otherwise specified. The prices mentioned at the time of ordering will be the prices charged on the date of the delivery. Although prices of most of the products do not fluctuate on a daily basis but some of the commodities do change on a daily basis. In case the prices are higher or lower on the date of delivery not additional charges will be collected or refunded as the case may be at the time of the delivery of the order.
      </Text>
      <Text style={styles.sectionHeading}>Cancellation by Customer</Text>
      <Text style={styles.paragraph}>
        You as a customer can cancel your order anytime up to the cut-off time of the slot for which you have placed an order. Cancellation will be made on request by customer by calling our customer service No: 0674-6505144, 0674-6505155, 0674-6505166 OR an e-mail sent to us on the following e-email id : care@NowGrocerywheels.co.in In such a case we will refund any payments already made by you for the order via original method of payment. If we suspect any fraudulent transaction, We will maintain a negative list of all fraudulent transactions and customers and would deny access to them or cancel any orders placed by them. 
      </Text>
      <Text style={styles.sectionHeading}>Order Lost/Damaged</Text>
      <Text style={styles.paragraph}>
        Please be aware that we are not responsible for any package that is lost or mis-delivered if incorrect address information is provided on the order form. If you receive an item that is damaged, or if you receive something other than what you ordered, please contact our customer service No: 0674-6505144, 0674-6505155, 0674-6505166 immediately. We will do our best to correct the situation. 
      </Text>
      <Text style={styles.sectionHeading}>You may not use the Site for any of the following purposes:</Text>
      <Text style={styles.paragraph}>
        Disseminating any unlawful, harassing, libelous, abusive, threatening, harmful, vulgar, obscene, or otherwise objectionable material. Transmitting material that encourages conduct that constitutes a criminal offense or results in civil liability or otherwise breaches any relevant laws, regulations or code of practice. Gaining unauthorized access to other computer systems. Interfering with any other person's use or enjoyment of the Site. Breaching any applicable laws; Interfering or disrupting networks or websites connected to the Site. Making, transmitting or storing electronic copies of materials protected by copyright without the permission of the owner.
      </Text>

      {/* Repeat the above structure for other sections like Pricing, Cancellation by Customer, Order Lost/Damaged, etc. */}

      <Text style={styles.sectionHeading}>Applicable Law</Text>
      <Text style={styles.paragraph}>
        This User Agreement shall be construed in accordance with the applicable laws of India. The Courts at Bhubaneswar shall have exclusive jurisdiction in any proceedings arising out of this agreement.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
margin:10
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

export default TermsAndConditionsScreen;
