// import { Ionicons } from '@expo/vector-icons';
// import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {
  Linking, Modal, TouchableHighlight, ViewAsyncStorage, StyleSheet, Text, View, ScrollView, RefreshControl, Dimensions, Image, TouchableOpacity, Alert, AsyncStorage, Share
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { Container, Header, Left, Body, Right, H1, H2, H3, Thumbnail, Button, Icon, Title, Content, CardItem, Accordion, Switch, Picker, Tabs, Tab } from 'native-base';
// import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { LinearGradient } from 'expo-linear-gradient';
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
import Dog from './Dog'
import axios from 'axios';
import * as Updates from 'expo-updates';
import { Card } from 'react-native-elements'
import * as GoogleSignIn from 'expo-google-sign-in';
import * as StoreReview from 'expo-store-review';
let sc = true;
let m = []
export default function ProfileScreen({ navigation }) {
  const [state, setstate] = React.useState('')
  const [name, setname] = React.useState('');
  const [pic, setpic] = React.useState('');
  const [username, setusername] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalVisible1, setModalVisible1] = React.useState(false);
  const [stats, setstats] = React.useState(false);

  const [savedCards, setSavedCards] = React.useState([])
  const onValueChange = (value) => {
    const change = async () => {
      setstate(value)
      const hello = await axios.post("https://asia-northeast1-socialegg-news.cloudfunctions.net/region", {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          "region": value,
          "username": username
        }
      })
      AsyncStorage.setItem('region', value);
      AsyncStorage.setItem("IndiaCards", "");
      AsyncStorage.setItem("PoliticsCards", "");
      AsyncStorage.setItem("SnTCards", "");
      AsyncStorage.setItem("LifeStyleCards", "");
      AsyncStorage.setItem("WorldCards", "");
      AsyncStorage.setItem("SportsCards", "");
      AsyncStorage.setItem("BusinessCards", "");
      AsyncStorage.setItem("EntertainmentCards", "");
      Updates.reloadAsync()
    }
    Alert.alert(
      "Changing Region",
      "App will restart for the region change to take effect",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => change() }
      ],
      { cancelable: false }
    );
  }
  const getUser = async () => {


    // console.log(m);

    try {
      let hello = await AsyncStorage.getItem('username');
      setusername(hello);
      hello = await AsyncStorage.getItem('name');
      setname(hello);
      hello = await AsyncStorage.getItem('pic');
      setpic(hello)
      console.log(user, name, pic);
    } catch (error) {
      console.log(error)
    }
  }
  const [isScroll, setIsScroll] = React.useState(false);

  const scrollCheck = async () => {
    try {

      sc = await AsyncStorage.getItem('scroll');
      setIsScroll(sc);
      console.log(sc);
    }
    catch (e) {
      console.log(e);
    }
  }
  const NavigateToSaved = async () => {
    m = await AsyncStorage.getItem('likedNews');
    m = JSON.parse(m);
    navigation.navigate('Saved', { savedCards: m })
  }

  const logout = async () => {
    AsyncStorage.getAllKeys().then(async (result) => {
      for (var i = 0; i < result.length; i++) {
        if (result[i] != "HasBeenOpened")
          await AsyncStorage.removeItem(result[i])
      }
    })

    AsyncStorage.getAllKeys((res) => {
      console.log(res);
    })
    // AsyncStorage.setItem('username', '')
    // AsyncStorage.setItem('name', '')
    // AsyncStorage.setItem('pic', '')
    // AsyncStorage.setItem("IndiaCards", "");
    // AsyncStorage.setItem("PoliticsCards", "");
    // AsyncStorage.setItem("SnTCards", "");
    // AsyncStorage.setItem("LifeStyleCards", "");
    // AsyncStorage.setItem("WorldCards", "");
    // AsyncStorage.setItem("SportsCards", "");
    // AsyncStorage.setItem("BusinessCards", "");
    // AsyncStorage.setItem("EntertainmentCards", "");
    // navigation.navigate('Login')
    try {
      await GoogleSignIn.signOutAsync();
    }
    catch
    {
      console.log("nothing");
    }
    Updates.reloadAsync();
  }
  const _header = (item, expanded) => {
    return (
      <View style={{ backgroundColor: '#2e2e2e', color: 'white', flexDirection: 'row', padding: 10 }}>
        <View style={{ flexDirection: 'row' }}>

          <Icon type="AntDesign" name={item.icon} style={{ color: 'white', }} />
          <Text style={{ color: 'white', flex: 4, fontSize: 20 }}> {" "}{item.title}</Text>
        </View>
        {expanded
          ? <Icon style={{ fontSize: 6, color: 'white', flex: 4 }} type="AntDesign" style={{ color: 'white' }} name="caretup" />
          : <Icon style={{ fontSize: 6, flex: 4 }} name="caretdown" type="AntDesign" style={{ color: 'white' }} />}
      </View>
    )
  }
  React.useEffect(() => {
    getUser();
    async function helloworld() {
      let hello = await AsyncStorage.getItem('region');
      let hello1 = await AsyncStorage.getItem(hello + 'swipes');
      setstate(hello)
      setstats(hello1)
      return hello
    }
    let wasup = helloworld();
    setstate(wasup)
    console.log(wasup)
    console.log('dd');
    setSavedCards(m);
    console.log(savedCards)
    scrollCheck();
  }, [])
  const hellostats = () => {
    var data = []
    if(stats){
    Object.keys(JSON.parse(stats)).map((item)=>{
    data.push(<Text style={styles.modalText}>{item+'  :    '+JSON.parse(stats)[item]}</Text>)
    })
  }
  else{
    data.push(<Text style={styles.modalText}>{'No swipes yet!'}</Text>)
  }
    return (data);
  }
  
  const shareapp = async () => {
    const url = StoreReview.storeUrl();
    const result = await Share.share({
      message: 'Hey I found this app, with a completely new news experience. There are a lot of other features, which I think you might love. Check it out:' + url
    });
  }
  return (
    <ScrollView style={{ backgroundColor: '#2e2e2e' }}>
      <View style={{ alignSelf: 'center', width: width }}>
        <View style={{ backgroundColor: 'black', marginTop: 30, height: height / 2.5, alignContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 29, alignSelf: 'center', marginTop: '20%', fontFamily: 'Headings' }}>PROFILE</Text>
        </View>
        <Card containerStyle={{ borderRadius: 20, backgroundColor: '#2e2e2e', position: 'absolute', marginTop: '49%', width: width - 30, alignSelf: 'center', borderWidth: 0, elevation: 15 }}>
          <View key='we' >
            <Image
              style={{ width: 170, height: 170, borderRadius: 400, alignSelf: 'center', marginTop: 20 }}
              resizeMode="cover"
              source={{ uri: pic }}
            />
            <Text style={{ color: 'white', alignSelf: 'center', fontSize: 22, fontFamily: 'Headings' }}>{"\n"}{name}{"\n"}</Text>
          </View>
        </Card>

        <View style={{ flexDirection: 'column', marginTop: 220 }}>
          <TouchableOpacity onPress={() => { setModalVisible(true); }} style={{ flex: 1, flexDirection: 'row', borderRadius: 20, elevation: 10, backgroundColor: '#2e2e2e', width: width - 30, alignSelf: 'center' }}>
            <Icon type="FontAwesome5" name='globe' style={{ color: 'white', width: 50, height: 50, marginLeft: 40, marginRight: 20, marginTop: 16 }} />
            <Text style={{ color: 'white', fontSize: 19, alignSelf: 'center', fontFamily: 'Headings' }}>Default Region</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View style={styles.centeredView}>
              <Text style={styles.modalText}>Select your default region</Text>
              <View style={styles.modalView}>
                <TouchableOpacity onPress={() => onValueChange('en_IN')}><Text style={styles.modalText}><Text style={state === 'en_IN' ? styles.bg1 : styles.bg2}>{'\u2B24' + "   "}</Text>India</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => onValueChange('en_GB')}><Text style={styles.modalText}><Text style={state === 'en_GB' ? styles.bg1 : styles.bg2}>{'\u2B24' + "   "}</Text>Europe</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => onValueChange('en_US')}><Text style={styles.modalText}><Text style={state === 'en_US' ? styles.bg1 : styles.bg2}>{'\u2B24' + "   "}</Text>United States</Text></TouchableOpacity>
              </View>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableHighlight>
            </View>
          </Modal>

          <TouchableOpacity onPress={NavigateToSaved} style={{ flex: 1, flexDirection: 'row', borderRadius: 20, elevation: 10, backgroundColor: '#2e2e2e', width: width - 30, alignSelf: 'center', marginTop: 10 }}>
            <Icon type="FontAwesome5" name='newspaper' style={{ color: 'white', width: 50, height: 50, marginLeft: 40, marginRight: 20, marginTop: 16 }} />
            <Text style={{ color: 'white', fontSize: 19, alignSelf: 'center', fontFamily: 'Headings' }}>Saved News</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setModalVisible1(true); }} style={{ flex: 1, flexDirection: 'row', borderRadius: 20, elevation: 10, backgroundColor: '#2e2e2e', width: width - 30, alignSelf: 'center', marginTop: 10 }}>
            <Icon type="Ionicons" name='md-stats' style={{ color: 'white', width: 50, height: 50, marginLeft: 40, marginRight: 20, marginTop: 16 }} />
            <Text style={{ color: 'white', fontSize: 19, alignSelf: 'center', fontFamily: 'Headings' }}>Statistics</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => shareapp() } style={{ flex: 1, flexDirection: 'row', borderRadius: 20, elevation: 10, backgroundColor: '#2e2e2e', width: width - 30, alignSelf: 'center', marginTop: 10 }}>
            <Icon type="Ionicons" name='md-share' style={{ color: 'white', width: 50, height: 50, marginLeft: 40, marginRight: 20, marginTop: 16 }} />
            <Text style={{ color: 'white', fontSize: 19, alignSelf: 'center', fontFamily: 'Headings' }}>Share App</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => StoreReview.requestReview()} style={{ flex: 1, flexDirection: 'row', borderRadius: 20, elevation: 10, backgroundColor: '#2e2e2e', width: width - 30, alignSelf: 'center', marginTop: 10 }}>
            <Icon type="Ionicons" name='md-star' style={{ color: 'white', width: 50, height: 50, marginLeft: 40, marginRight: 20, marginTop: 16 }} />
            <Text style={{ color: 'white', fontSize: 19, alignSelf: 'center', fontFamily: 'Headings' }}>Rate Us on Play Store</Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible1}
          >
            <View style={styles.centeredView1}>
              <Text style={styles.modalText}>Category score on the basis of swipes</Text>
              <View style={styles.modalView}>
                {hellostats()}
              </View>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setModalVisible1(!modalVisible1);
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableHighlight>
            </View>
          </Modal>

          <TouchableOpacity onPress={() => logout()} style={{ flex: 1, flexDirection: 'row', borderRadius: 20, elevation: 10, backgroundColor: '#2e2e2e', width: width - 30, alignSelf: 'center', marginTop: 10 }}>
            <Icon type="AntDesign" name='logout' style={{ color: 'white', width: 50, height: 50, marginLeft: 40, marginRight: 20, marginTop: 16 }} />
            <Text style={{ color: 'white', fontSize: 19, alignSelf: 'center', fontFamily: 'Headings' }}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity><Text onPress={() => Linking.openURL('mailto:dev.phoenix.app@gmail.com')} style={{textAlign: 'center', color: 'white', marginTop: 20, fontSize: 15, fontFamily:'Headings'}}>Contact us at: {'\n'} dev.phoenix.app@gmail.com</Text></TouchableOpacity>
          <Text>{"\n"}</Text>
        </View>
        </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: height / 2,
    backgroundColor: 'black',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  centeredView1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: height / 3.5,
    backgroundColor: 'black',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  modalView: {
    margin: 20,
    elevation: 20,
    backgroundColor: "#2e2e2e",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  openButton: {
    backgroundColor: "#5873FF",
    borderRadius: 20,
    padding: 5,
    elevation: 20,
    width: 150
  },
  bg1: {
    color: '#5873FF'
  },
  bg2: {
    color: '#2e2e2e'
  },
  textStyle: {
    color: "white",
    textAlign: "center",
    fontFamily: 'Headings'
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    alignSelf: 'center',
    marginRight: 10,
    color: 'white',
    fontFamily: 'Headings'
  }
});
