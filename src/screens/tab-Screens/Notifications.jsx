import { Image, SafeAreaView, StyleSheet, Text, View ,Switch} from 'react-native'
import React,{useState} from 'react'
import { ScrollView } from 'react-native-gesture-handler'

const Notifications = () => {

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    // <View style ={{flex:1, justifyContent:'center',alignItems:'center'}}>
    //   <Text  style={{color:'black'}}>NOTIFICATIOn</Text>
    //   <Text  style={{color:'green'}}>Page have no content yet.....!!!!</Text>
    // </View>
    <SafeAreaView style={{ padding: 8 }}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>NOTIFICATION</Text>
        </View>

        <View style={styles.card}>

          <View style={{ flex:0.8 }}>
            <Image
              source={require('../../../assets/pngIcon/notification.png')}
              style={styles.notificationIcon} />
          </View>

          <View style={styles.cardContainer}>
            <Text style={styles.cardStoryHeader}>Special offer for you!</Text>
            <Text style={styles.cardStory}>A Long Text field can  and supports rich text formatting, such as different colors, fonts, and highlighting.</Text>
          </View>

          <View style={{  justifyContent: 'center', alignItems: 'center', flex:1.5, paddingRight:3 }}>
            <Image source={require('../../../assets/pngIcon/product.png')}
              style={styles.notificationImg} />
          </View>
        </View>

        <View style={styles.container}>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Notifications

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 50,
    borderBottomWidth: 1
  },
  headerText: {
    color: '#888',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 12
  },
  card: {
    // padding:20,
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    // minHeight: 100,
    marginTop: 20,
    borderBottomWidth: 1,
    // borderRadius: 13,
    elevation: 2,
    justifyContent: 'space-between',
  },
  notificationIcon: {
    height: 42,
    width: 42,
    margin: 5,
    resizeMode: 'contain',
    tintColor: 'green'
  },
  cardStoryHeader: {
    color:'black',
    fontSize: 18,
    padding: 6
  },
  cardStory: {
    paddingHorizontal: 6,
    // fontSize:1,
    color:'#888'
  },
  cardContainer: {
    // backgroundColor: 'yellow',
    // width: '50%',
    flex:4,
    marginBottom:4,
    // flexDirection:'row'
  },
  notificationImg: {
    height: 75,
    width: 75,
    resizeMode: 'cover'
  }

})