import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Card, Paragraph, Title } from 'react-native-paper'

const SummerDrinks = () => {
    return (
        <View style={{ flex: 1, }}>
            <View style={styles.row}>
                <Card style={styles.card}>
                    <Card.Content>
                    <Card.Cover source={require('../../../../assets/images/household/mops.jpg')} style={styles.img}/>
                        <Title style={styles.title}>Card Title</Title>
                        {/* <Title style={styles.title}>Card Title</Title> */}
                    </Card.Content>
                </Card>
                <Card style={styles.card}>
                    <Card.Content>
                    <Card.Cover source={require('../../../../assets/images/household/mops.jpg')} style={styles.img}/>
                        <Title style={styles.title}>Card Title</Title>
                        {/* <Title style={styles.title}>Card Title</Title> */}
                    </Card.Content>
                </Card>
            </View>

            <View style={styles.row}>
                <Card style={styles.card}>
                    <Card.Content>
                    <Card.Cover source={require('../../../../assets/images/household/mops.jpg')} style={styles.img}/>
                        <Title style={styles.title}>Card Title</Title>
                        {/* <Title style={styles.title}>Card Title</Title> */}
                    </Card.Content>
                </Card>
                <Card style={styles.card}>
                    <Card.Content>
                    <Card.Cover source={require('../../../../assets/images/household/mops.jpg')} style={styles.img}/>
                        <Title style={styles.title}>Card Title</Title>
                        {/* <Title style={styles.title}>Card Title</Title> */}
                    </Card.Content>
                </Card>
            </View>
        </View>
    )
}

export default SummerDrinks

const styles = StyleSheet.create({
    card: {
        backgroundColor:'#fff',
        flex:1,
        marginHorizontal: 8,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8
    },
    title: {
        fontSize: 16,
        textAlign:'center',
        fontWeight:'bold',
        color:'green'
    },
    img: {
        height:120,
        // resizeMode:'cover'
        resizeMode:'center'
    }
})