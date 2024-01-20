import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Button } from 'react-native-paper'

export default function Cart({ navigation }) {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.headerContainer} >
          {/* <View style={styles.backBtn}>
            <TouchableOpacity  >
              <Icon name={"arrow-left-thick"} size={40} color="#35BDD0" />
            </TouchableOpacity>
          </View> */}
          <View style={styles.headerText}>
            <Text style={{ fontSize: 23, fontWeight: 900, }}>CART</Text>
          </View>
        </View>

        <View style={styles.Card}>
          <View Style={styles.Card}>
            <View style={styles.lable}>
              <Text>Address</Text>
            </View>
            <Text>Hello</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  container:{
    flex:1,

  },
  headerText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Card:{
    backgroundColor:'#fff',
    height:100
  },
  lable:{
    
  }
})