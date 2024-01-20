import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'


export default DaailyStapleHome = ({ imageSource,bannerId, navigation }) => {
    // console.log('navigation',navigation)
    // console.log('bannerId',bannerId);
    return (
        // <TouchableOpacity style={styles.stapleCard} onPress={() => navigation.navigate('Top Selling Products',{bannerId:bannerId})}>
        <View style={styles.stapleCard}>
            <Image source={imageSource} style={styles.cardImage} />
            {/* <Text style={styles.cardTitle}>{title}</Text> */}
        </View>
    );
};
const styles = StyleSheet.create({
    stapleCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16, // Padding inside each card
        margin: 3, // Margin around each card
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 4,
        // height:150
    },
    cardImage: {
        width: '100%',
        height: 100,
        borderRadius: 8,
        resizeMode:'cover'
    },
    cardTitle: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333', // Text color
        textTransform: 'capitalize', // Capitalize the title text
        // textShadowColor: 'rgba(0, 0, 0, 0.3)', // Add a text shadow
        // textShadowOffset: { width: 3, height: 3 },
        // textShadowRadius: 2,
    },

})

