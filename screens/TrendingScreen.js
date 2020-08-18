import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState, Linking } from 'react';
import { AsyncStorage, Image, Platform, StyleSheet, Text, TouchableOpacity, View, Share,  ImageBackground, FlatList, TouchableWithoutFeedback,SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';
import { Container, Header, DeckSwiper, Card, CardItem, Thumbnail, Left, Body,Button, Icon, Fab, Right,Tabs,Tab, ScrollableTab,Title } from 'native-base';
import axios from 'axios';
import Complete from './NewsLoader'
import * as Analytics from 'expo-firebase-analytics';
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;


var data = new Array;

const FeedScreen = ({ navigation }) => {

  let user;
  const getUser = async () => {
    try{
      user = await AsyncStorage.getItem('username');  
  console.log(user);  
    } catch (error){
      console.log(error)
    }
  }
  useEffect(() => {
    getUser();
  }, [])

  function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load our initial navigation state
        getUser();
        let user2 = await AsyncStorage.getItem('username');
        newsData = await getData(user2);
        console.log(user2);
        let array = shuffleArray(newsData);
        // console.log(newsData);
        setCards([...array]);
      } catch (e) {
        console.warn(e);
      } finally {
        // setIsReady(true);
      }
    }

    loadResourcesAndDataAsync();
        
  }, [])


  const [Active, setActive] = useState(false);


  const [urls, setUrls] = useState(["https://socialegg.in"]);
  const [cards, setCards] = useState([{"datePublished": "", "description": "", "image": {"thumbnail": {"contentUrl": ""}}, "name": "", "provider": [{"image": {"thumbnail": {"contentUrl": ""}}, "name": ""}], "url": "" }]);
  const [breaking, setBreaking] = useState([])
  // console.log(navigation);

  const loadData = async () => {
    let reg = await AsyncStorage.getItem('region');
    await axios({
      url: 'https://asia-northeast1-socialegg-news.cloudfunctions.net/get_en_INtrending',
      method: 'get',
    }).then((result) => {

      // setCards([...(result['data'])]);
      data = result['data']['data'];
    }).then(() => {

    setCards([...data]);
    // console.log(cards);
    });
    await axios({
      url: 'https://asia-northeast1-socialegg-news.cloudfunctions.net/sendBreaking',
      method: 'get'
    }).then((result) => {
      // console.log(result);
      data = result['data']['in']
    }).then(() => {
      setBreaking([...data])
    }).catch(err => {
      console.warn(err);
    })
                
    // console.log('breaking',breaking.length, data.length, reg);
    // const data = res.data.articles;
    // setCards(data);
    // console.log(data);
  }
  useEffect(() => {
    loadData();
  }, [])

  const LogNews =  () =>{
     Analytics.logEvent('ButtonTapped', {
      name: 'News Seen',
      screen: 'Trending',
      purpose: 'Opened a news article',
    });
  }
  

  return (
    <ScrollView>
    <Container style={{backgroundColor: 'black',alignSelf:'center'}}>
      
      <ScrollView persistentScrollbar={true}> 
    <View style={{flex: 1, flexDirection:'column'}}>
       <Header hasTabs transparent>
              
                  <Body>
                    <Title style={{fontSize: 25,alignSelf:'center',fontFamily:'Headings',marginTop:2}}>What's Trending?</Title>
                  </Body>
              </Header>
                <Tabs style={{alignItems: 'center'}} renderTabBar={()=> <ScrollableTab tabsContainerStyle={{backgroundColor: 'black', alignItems: 'center', textAlign: 'center'}} style={{borderBottomWidth: 0}} />}>
                <Tab style={{marginLeft: 20}}  textStyle={{fontFamily:'Font'}} activeTextStyle={{fontFamily:'Font'}} activeTabStyle={{backgroundColor: "black"}} tabStyle={{backgroundColor:'black',alignSelf:'center'}} style={{backgroundColor: 'black'}} heading="BREAKING NEWS" > 
        
      <FlatList
      style={{marginTop:20}}
        data={breaking}
        ListEmptyComponent={() =>
              <View style={{ alignSelf: "center" }}>
                <Complete />
              </View>
            } 
        keyExtractor={item => item.urlToImage}
        renderItem={({item}) =>
        <View>
        <TouchableWithoutFeedback onPress={() => {Analytics.logEvent('login', {
  name: 'settings',
  screen: 'profile',
  purpose: 'Opens the internal settings',
});navigation.navigate('BrowserScreen', { url: item.url,name:item.source.name });} } >
          <Card elevation={0}  style={{ backgroundColor: '#2e2e2e',borderRadius:5, padding: 10,borderColor: "#2e2e2e", flexDirection: "row",width:width-30,alignSelf:'center'}}>
            <CardItem style={{backgroundColor: '#2e2e2e', flexDirection: "row", flex: 1}} >
            <ImageBackground  borderRadius={5} blurRadius={40} source={{uri: item.urlToImage}} style={{  justifyContent: "center",flex: 1, resizeMode: "cover", width:100,height:100}}>
                <Image style={{ borderRadius: 5, marginLeft: 10, height: 70, flex: 1, borderRadius: 10,width:80,margin:10 }} source={{uri: item.urlToImage}} />
            </ImageBackground>
                <Text style={{color:'#e3e3e3', fontSize: 17,flex:2,marginLeft:width/10,fontFamily:'Font'}}>{(item.title).substring(0, 70)+'....'}</Text>

            </CardItem>
           
              </Card>
              
            </TouchableWithoutFeedback>
            <View
                style={{
                    borderBottomColor: '#5873FF',
                    borderBottomWidth: 2,
                    margin: 10,
                    width:width/1.2,
                    alignSelf:'center'
                }}
                />
        </View>
      
        }
      />
      </Tab>
       <Tab textStyle={{fontFamily:'Font'}} activeTextStyle={{fontFamily:'Font'}} activeTabStyle={{backgroundColor: "black"}} tabStyle={{backgroundColor:'black'}} style={{backgroundColor: 'black'}} heading="HAPPENING TODAY" > 
        
      <FlatList
      style={{marginTop:20}}
        data={cards}
        keyExtractor={item => item.ampUrl}
        ListEmptyComponent={() =>
              <View style={{ alignSelf: "center" }}>
                <Text style={{fontSize:20,color:'white',paddingLeft:'3%',textAlign:'center',fontFamily:'Headings'}}>It Looks like you went through all the news present in this category{"\n"}{"\n"}Come back later or change the category for more news</Text>
                <Complete />
              </View>
            } 
        renderItem={({item}) =>
        <View>
        <TouchableWithoutFeedback onPress={() => {Analytics.logEvent('login', {
  name: 'settings',
  screen: 'profile',
  purpose: 'Opens the internal settings',
});navigation.navigate('BrowserScreen', { url: item.url,name: item.provider[0].name });} } >
          <Card elevation={0}  style={{ backgroundColor: '#2e2e2e',borderRadius:5, padding: 10,borderColor: "#2e2e2e", flexDirection: "row",width:width-30,alignSelf:'center'}}>
            <CardItem style={{backgroundColor: '#2e2e2e', flexDirection: "row", flex: 1}} >

            <ImageBackground  borderRadius={5} blurRadius={40} source={{uri: item.image.thumbnail.contentUrl}} style={{ justifyContent: "center",flex: 1, resizeMode: "cover", width:100,height:100}}>
                <Image style={{ borderRadius: 5, margin: 10, marginLeft: 10, marginRight: 15, height: 130, flex: 1}} source={{uri: item.image.thumbnail.contentUrl}} />
            </ImageBackground>
            <Text style={{color:'#e3e3e3', fontSize: 17,flex:2,marginLeft:width/10,fontFamily:'Font'}}>{(item.name).substring(0, 70)+'....'}</Text>
           </CardItem>
              </Card>
              
            </TouchableWithoutFeedback>
            <View
                style={{
                  borderBottomColor: '#5873FF',
                  borderBottomWidth: 2,
                  margin: 10,
                  width:width/1.2,
                  alignSelf:'center'
                }}
                />
        </View>
      
        }
      />
      </Tab>
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
  </ScrollView>

  </Container>
  </ScrollView>
  );
}

FeedScreen.navigationOptions = {
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
    paddingTop: 30,
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
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});

export default FeedScreen;