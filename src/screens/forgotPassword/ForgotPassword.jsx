import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper'; // Import the Card component
import Icon from 'react-native-vector-icons/FontAwesome';

const ForgotPassword = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../../assets/images/little-toy-supermarket-cart.jpg')}
                style={styles.imageBackground}
            >   
                <View style={styles.contentContainer}>
                    <Card style={{ width: '90%', padding: 20, backgroundColor: 'rgba(73, 73, 73, 0.7)' }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: "rgba(255,255,255,1)" }}>
                            Forgot Password
                        </Text>
                        <TextInput

                            style={{
                                height: 40,
                                borderWidth: 1,
                                borderColor: '#ccc',
                                borderRadius: 5,
                                padding: 10,
                                marginBottom: 20,
                                color: "#9e9c95"
                            }}
                            placeholder="Enter your email"
                            placeholderTextColor="#ccc"
                        />
                        <View style={styles.loginContainer}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: 'rgba(56, 204, 119, 1)',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    borderRadius: 5,
                                    width: '40%'
                                }}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>Submit</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#f75d25',
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    borderRadius: 5,
                                    width: '40%'
                                }} onPress={() => navigation.goBack()}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>cancel</Text>
                                <Icon name="angle-double-right" size={18} color="white" />
                            </TouchableOpacity>
                        </View>
                    </Card>
                </View>
            </ImageBackground>
        </View>
    );
};
const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 50,
        alignItems: 'center',
    },
    loginContainer: {
        // marginTop:2,
        flexDirection: 'row',

        justifyContent: 'space-between',
        alignItems: 'center'
    },
})
export default ForgotPassword;
