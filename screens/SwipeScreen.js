import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState, Linking, useContext } from 'react';
import { AsyncStorage, Image, Platform, StyleSheet, Text, TouchableOpacity, View, Share, Vibration, ImageBackground, FlatList, TouchableWithoutFeedback } from 'react-native';
import { ScrollView, BorderlessButton } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';
import { Container, Header, DeckSwiper, Card, CardItem, Thumbnail, Left, Body, Title, Button, Icon, Fab, Right, Tabs, Tab, ScrollableTab, Grid, Col, Row, Badge } from 'native-base';
import axios from 'axios';
import Animation from './NewsLoader'
import Complete from './Complete'
import { Ionicons } from '@expo/vector-icons';
import { Notifications } from 'expo';
import { LinearGradient } from 'expo-linear-gradient';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import SocialContext from '../context/Context'
import { Dimensions } from 'react-native';
import { Snackbar } from 'react-native-paper';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
console.log(height)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}





let array1 = [], array2 = [], array3 = [], array4 = [], array5 = [], array6 = [], array7 = [], array8 = [];

const SwipeScreen = ({ navigation, route }) => {
  const { EntertainmentCards, IndiaCards, BusinessCards, LifeStyleCards, PoliticsCards, ScienceAndTechnologyCards, SportsCards, WorldCards, setEntertainmentCards, setIndiaCards, setBusinessCards, setLifeStyleCards, setPoliticsCards, setScienceAndTechnologyCards, setSportsCards, setWorldCards } = useContext(SocialContext);
  let India = {'WORLD': WorldCards, 'POLITICS': PoliticsCards, 'TECHNOLOGY': ScienceAndTechnologyCards, 'INDIA': IndiaCards,'SPORTS': SportsCards,'BUSINESS': BusinessCards, 'ENTERTAINMENT': EntertainmentCards,  'LIFESTYLE': LifeStyleCards }
  const [World, setWorld] = useState(WorldCards)
  const [region, setregion] = useState('');
  const [user, setuser] = useState('guest');
  const [notif, setNotification] = useState({});
  var i = 0;
  const [snack, setSnack] = useState(false);
  const getUser = async () => {
    try {
      let user1 = await AsyncStorage.getItem('username');
      setuser(user1);
      // getData(user);
    } catch (error) {
      console.log(error)
    }
  }
  const [Active, setActive] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const _handleNotification = notification => {
    Vibration.vibrate();
    console.log(notification);
    console.log("Mil gaya");
    const { origin, data } = notification;
    setNotification({ notification: notification });

    if (origin === 'selected') {
      navigation.navigate('BrowserScreen', { url: data.url, name: data.headline })
    }

    // console.log(not)
  };
  const data = () => {
    try {
      if (WorldCards) {
        return (WorldCards)
      }
    }
    catch (e) {
      console.log(e)
    }
  }
  const [urls, setUrls] = useState(["https://socialegg.in"]);
  useEffect(() => {
    const getFonts = async () => {

      try {
        await Font.loadAsync({

          'Font': require('../assets/fonts/myriad.otf'),
          'Headings': require('../assets/fonts/Poppins-Medium.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),

        });
      }
      catch (e) {
        // setFontsLoaded(true);
        console.log(e);
      }
      finally {
        setFontsLoaded(true);
      }
    }
    getFonts()
    async function fetchData() {
      let hello = await AsyncStorage.getItem('region')
      console.log(hello)
      if (hello === 'en_IN') {
        setregion('INDIA')
      }
      else if (hello === 'en_US') {
        setregion('US')
      }
      else if (hello === 'en_GB') {
        setregion('UK')
      }
      else {
        setregion('INDIA')
      }


      function shuffleArray(array) {
        let hello = [];
        for (let i = Object.keys(array).length - 1; i > 0; i--) {
          // const j = Math.floor(Math.random() * (i + 1));
          // [array[i], array[j]] = [array[j], array[i]];
          hello.push(array[i])
        }
        return (hello)
      }
      // You can await here
      let region = await AsyncStorage.getItem('region');
      if (!region) {
        region = 'en_IN'
      }
      const Entertainment = await axios({
        url: 'https://asia-northeast1-socialegg-news.cloudfunctions.net/get_' + region + 'Entertainment',
        method: 'get',
      });
      array1 = shuffleArray(Entertainment['data']);

      const Business = await axios({
        url: 'https://asia-northeast1-socialegg-news.cloudfunctions.net/get_' + region + 'Business',
        method: 'get',
      });
      console.log('https://asia-northeast1-socialegg-news.cloudfunctions.net/get_' + region + 'Entertainment');
      array2 = shuffleArray(Business['data']);

      const Sports = await axios({
        url: 'https://asia-northeast1-socialegg-news.cloudfunctions.net/get_' + region + 'Sports',
        method: 'get',
      });
      array3 = shuffleArray(Sports['data']);

      const World = await axios({
        url: 'https://asia-northeast1-socialegg-news.cloudfunctions.net/get_' + region + 'World',
        method: 'get',
      });

      array4 = shuffleArray(World['data']);

      const LifeStyle = await axios({
        url: 'https://asia-northeast1-socialegg-news.cloudfunctions.net/get_' + region + 'LifeStyle',
        method: 'get',
      });
      array5 = shuffleArray(LifeStyle['data']);

      const Technology = await axios({
        url: 'https://asia-northeast1-socialegg-news.cloudfunctions.net/get_' + region + 'ScienceAndTechnology',
        method: 'get',
      });
      array6 = shuffleArray(Technology['data']);

      const Politics = await axios({
        url: 'https://asia-northeast1-socialegg-news.cloudfunctions.net/get_' + region + 'Politics',
        method: 'get',
      });
      array7 = shuffleArray(Politics['data']);

      if (region === 'en_IN') {
        const Country = await axios({
          url: 'https://asia-northeast1-socialegg-news.cloudfunctions.net/get_' + region + 'India',
          method: 'get',
        });

        array8 = shuffleArray(Country['data']);
      }
      if (region === 'en_US') {
        const Country = await axios({
          url: 'https://asia-northeast1-socialegg-news.cloudfunctions.net/get_' + region + 'US',
          method: 'get',
        });

        array8 = shuffleArray(Country['data']);
      }
      if (region === 'en_GB') {
        const Country = await axios({
          url: 'https://asia-northeast1-socialegg-news.cloudfunctions.net/get_' + region + 'UK',
          method: 'get',
        });

        array8 = shuffleArray(Country['data']);

      }
      var d = new Date();
      var n = d.getTime();
      var ls = await AsyncStorage.getItem("lastSaved");
      ls = JSON.parse(ls);
      var msInHour = 60 * 60 * 1000;
      // n += msInHour*12;
      // console.log(msInHour);
      console.log((n - ls) / (msInHour));
      // console.log(ls);

      let pq = 24;
      if (region === 'en_IN') pq = 12;

      // console.log(pq);

      if (array8.length != 0 && (n - ls) / (msInHour) >= pq) {
        setSnack(true);
      }
      // return(response);


    }

    fetchData()
    const _notificationSubscription = Notifications.addListener(_handleNotification);


    async function loadResourcesAndDataAsync() {
      try {
        // Load our initial navigation state


        getUser();
        let user2 = await AsyncStorage.getItem('username');
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    loadResourcesAndDataAsync();

  }, [])

  const UpdateState = async () => {
    // console.log(array7)
    // console.log(array8);
    shuffle(array1);
    shuffle(array2);
    shuffle(array3);
    shuffle(array4);
    shuffle(array5);
    shuffle(array6);
    shuffle(array7);
    shuffle(array1);
    setIndiaCards([...array8]);
    setPoliticsCards([...array7]);
    setScienceAndTechnologyCards([...array6]);
    setLifeStyleCards([...array5]);
    setWorldCards([...array4]);
    setSportsCards([...array3]);
    setBusinessCards([...array2]);
    setEntertainmentCards([...array1]);
    await AsyncStorage.setItem("IndiaCards", JSON.stringify(array8));
    await AsyncStorage.setItem("PoliticsCards", JSON.stringify(array7));
    await AsyncStorage.setItem("SnTCards", JSON.stringify(array6));
    await AsyncStorage.setItem("LifeStyleCards", JSON.stringify(array5));
    await AsyncStorage.setItem("WorldCards", JSON.stringify(array4));
    await AsyncStorage.setItem("SportsCards", JSON.stringify(array3));
    await AsyncStorage.setItem("BusinessCards", JSON.stringify(array2));
    await AsyncStorage.setItem("EntertainmentCards", JSON.stringify(array1));
    navigation.navigate('Animate', { revert: true });
  }


  console.log(region)
  if (!isReady) {
    return (
      <Container style={{ backgroundColor: 'black' }}>
        <Text style={{ fontSize: 25, alignSelf: 'center', fontFamily: 'Headings', marginTop: 2 }}>
          Your News Feed
          </Text>
        <Animation />
      </Container>
    )
  }

  const image = () => {
    try {
      return (<Thumbnail source={{ uri: item.provider.data.image.thumbnail.contentUrl }} style={{ borderRadius: 100 }} />)
    } catch (error) {
      //do nothing
    }
  }
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  function hashtags(topics) {
    if (height > 700) {
      var data = [];
      if (Object.keys(topics).length > 4) {
        (['0', '1', '2', '3']).map(hello =>
          data.push(
            <Text style={{ color: 'white', backgroundColor: '#5873FF', borderRadius: 20, margin: 2, height: 24, fontFamily: 'Font' }}>{'   #' + (topics[hello]).replace(/ /g, '') + '    '}</Text>)
        )
        return (data)
      }
      else {
        var data = []
        Object.keys(topics).map(hello =>
          data.push(
            <Text style={{ color: 'white', backgroundColor: '#5873FF', borderRadius: 20, margin: 2, height: 24, fontFamily: 'Font' }}>{'   #' + (topics[hello]).replace(/ /g, '') + '    '}</Text>)
        )
        return (data)
      }
    }
    else {
      return ([])
    }
  }
  function namered(name) {
    if (height > 700) {
      if (name.length > 100) {
        return (name.substring(0, 100) + '....')
      }
      else {
        return (name)
      }
    }
    else {
      if (name.length > 80) {
        return (name.substring(0, 80) + '....')
      }
      else {
        return (name)
      }
    }
  }
  function desred(name) {
    if (height > 700) {
      if (name.length > 200) {
        return (name.substring(0, 200) + '....')
      }
      else {
        return (name)
      }
    }
    else {
      if (name.length > 150) {
        return (name.substring(0, 150) + '....')
      }
      else {
        return (name)
      }
    }
  }
  function backgroundget(item) {
    if (height > 750) {
      return (
        <ImageBackground borderRadius={20} blurRadius={2} source={{ uri: item.data.image.thumbnail.contentUrl }} style={styles.image}>
          <Image style={{ height: 100, borderRadius: 20, marginTop: 16, width: 100, alignSelf: 'center' }} source={{ uri: item.data.image.thumbnail.contentUrl }} />
        </ImageBackground>)
    }
    else {
      return (<Image style={{ height: 100, borderRadius: 20, width: 100, alignSelf: 'center' }} source={{ uri: item.data.image.thumbnail.contentUrl }} />)
    }
  }
  var count;
  var category;
  let color = 'green'
  return (

    <Container style={{ backgroundColor: 'black' }}>
      <Snackbar
        visible={snack}
        onDismiss={() => setSnack(false)}
        action={{
          label: 'Refresh',
          onPress: () => {
            UpdateState();
          },
        }}
        duration={100000}
        style={{ backgroundColor: "red", zIndex: 100, width: 300, alignSelf: 'center', color: "#2e2e2e" }}
      >
        Click on the refresh button to refresh
        </Snackbar>
      {/*<Text style={{fontSize:40,color:'white',marginTop:45,paddingLeft:'3%',textAlign:'center'}}>
            Your News Feed
          </Text>*/}
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'black', }}>
        <Header hasTabs transparent>

          <Body>
            <Title style={{ fontSize: 25, alignSelf: 'center', fontFamily: 'Headings', marginTop: 2 }}>Your News Feed</Title>
          </Body>
        </Header>
        <Tabs style={{ alignItems: 'center' }} locked={true} initialPage={3} renderTabBar={() => <ScrollableTab tabsContainerStyle={{ backgroundColor: 'black', alignItems: 'center', textAlign: 'center' }} style={{ borderBottomWidth: 0 }} />}>
          {Object.keys(India).map(cards =>
            <Tab style={{ marginLeft: 20 }} textStyle={{ fontFamily: 'Font' }} activeTextStyle={{ fontFamily: 'Font' }} activeTabStyle={{ backgroundColor: "black" }} tabStyle={{ backgroundColor: 'black', alignSelf: 'center' }} style={{ backgroundColor: 'black' }} heading={cards === 'INDIA' ? region : cards}>
              <DeckSwiper
                looping={false}
                dataSource={India[cards]}
                onSwipeLeft={(async (item) =>{
                  var region2 = ''
                  if(region==='INDIA'){
                    region2 = 'en_IN'
                  }
                  if(region==='US'){
                    region2 = 'en_US'
                  }
                  if(region==='GB'){
                    region2 = 'en_GB'
                  }
                  let qw = await AsyncStorage.getItem(region2+'swipes');
                  // console.log(qw)
                  // console.log(region)
                  category = item.genre
                  // console.log(category);
                  if(qw){
                  qw = JSON.parse(qw);
                    if(qw[category]){
                      qw[category] = qw[category] -1;
                    }
                    else{
                      qw[category] = -1
                    }
                  }
                  else{
                    qw={}
                    qw[category]=-1;
                  }
                  console.log(qw)
                  await AsyncStorage.setItem(region2+'swipes', JSON.stringify(qw));
                })}
                onSwipeRight={(async (item) => {
                  let x = await AsyncStorage.getItem('likedNews');
                  let dt = {
                    url: item.data.url,
                    name: item.data.provider[0].name,
                    date: item.data.datePublished,
                    title: item.data.name,
                    imgUrl: item.data.image.thumbnail.contentUrl,
                    desc: item.data.description,
                  }
                  x = JSON.parse(x);
                  let y = [];
                  if (x.length > 39) {
                    x.pop();
                    y = [dt, ...x];
                  }
                  // console.log(x);
                  else {
                    y = [dt, ...x];
                  }
                  await AsyncStorage.setItem('likedNews', JSON.stringify(y));
                  var region2 = ''
                  if(region==='INDIA'){
                    region2 = 'en_IN'
                  }
                  if(region==='US'){
                    region2 = 'en_US'
                  }
                  if(region==='GB'){
                    region2 = 'en_GB'
                  }
                  let qw = await AsyncStorage.getItem(region2+'swipes');
                  // console.log(qw)
                  // console.log(region)
                  category = item.genre
                  // console.log(category);
                  if(qw){
                  qw = JSON.parse(qw);
                    if(qw[category]){
                      qw[category] = qw[category] +1;
                    }
                    else{
                      qw[category] = 1
                    }
                  }
                  else{
                    qw={}
                    qw[category]=1;
                  }
                  console.log(qw)
                  await AsyncStorage.setItem(region2+'swipes', JSON.stringify(qw));
                  
                })}
                renderEmpty={() =>
                  <View style={{ alignSelf: "center" }}>
                    <Text style={{ fontSize: 15, color: 'white', paddingLeft: '3%', textAlign: 'center', fontFamily: 'Headings' }}>{"\n"}{"\n"}It Looks like you went through all the news present in this category{"\n"}{"\n"}Come back later or change the category for more news</Text>
                    <Complete />
                  </View>
                }
                renderItem={item =>
                  <View style={{ marginTop: 20 }}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('BrowserScreen', { url: item.data.url, name: item.data.provider[0].name })}>
                      <Card elevation={4} style={{ backgroundColor: '#2e2e2e', borderRadius: 20, borderColor: "#2e2e2e", height: height - 220, shadowColor: "#000", marginRight: 20, marginLeft: 20, width: width - 47 }}>
                        <ImageBackground source={require('./background.jpg')} style={styles.background} imageStyle={{ opacity: 0.5 }}>
                          <LinearGradient
                            colors={['#38495D', 'transparent']}
                            style={{
                              position: 'absolute',
                              left: 0,
                              right: 0,
                              top: 0,
                              height: height - 220,
                              borderRadius: 20
                            }}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                          />
                          <CardItem style={{ backgroundColor: 'transparent' }}>
                            <Text style={{ textAlign: 'left', color: '#e3e3e3', flexDirection: 'row', flex: 1, fontFamily: 'Headings' }} >{item.data.provider[0].name}</Text>
                            <Text style={{ textAlign: 'right', color: '#e3e3e3', fontFamily: 'Headings' }}>{item.data.datePublished.split('T')[0]}</Text>
                          </CardItem>
                          <CardItem cardBody style={{ backgroundColor: 'transparent', alignSelf: 'center' }}>
                            {backgroundget(item)}

                          </CardItem>
                          <CardItem style={{ backgroundColor: 'transparent' }}>
                            <Text style={{ color: '#5873FF', textAlign: 'center', flexDirection: 'row', flex: 1, fontSize: 20, fontFamily: 'Headings' }} >{namered(item.data.name)}</Text>
                          </CardItem>
                          <CardItem style={{ backgroundColor: 'transparent' }}>
                            <Text style={{ color: '#e3e3e3', textAlign: 'center', flexDirection: 'row', flex: 1, fontSize: 16, fontFamily: 'Font' }}>{desred(item.data.description)}</Text>
                            <View style={{}} />
                          </CardItem>
                          <CardItem style={{ backgroundColor: 'transparent' }}>
                            <View style={{
                              flex: 1,
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              alignItems: 'flex-start'
                            }}>
                              {hashtags(item.topics)}
                            </View>
                          </CardItem>
                        </ImageBackground>
                      </Card>
                    </TouchableWithoutFeedback>
                  </View>


                }
              />
            </Tab>
          )}
        </Tabs>
      </View>


      {/* <View>
          <Fab
            active={Active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => setActive(!(Active) )}>
            <Icon name="share" />
            <Button style={{ backgroundColor: '#34A34F' }}>
              <Icon name="logo-whatsapp" />
            </Button>
            <Button style={{ backgroundColor: '#3B5998' }}>
              <Icon name="logo-facebook" />
            </Button>
            <Button disabled style={{ backgroundColor: '#DD5144' }}>
              <Icon name="mail" />
            </Button>
          </Fab>
        </View> */}
    </Container>
  );
}

SwipeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 20,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  image: {
    borderRadius: 50,
    width: width / 3,
    height: width / 3
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    borderRadius: 50,
  },
});

export default SwipeScreen;