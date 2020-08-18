import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState, Linking } from 'react';
import { AsyncStorage, Image, Platform, StyleSheet, Text, TouchableOpacity, View, Share,  ImageBackground, FlatList,  RefreshControl, TouchableWithoutFeedback } from 'react-native';
import {WebView} from 'react-native-webview'
import { ScrollView } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';
import { Container, Header, DeckSwiper, Card, CardItem, Thumbnail, Left, Body,Button, Icon, Fab, Right, Tabs,Tab, ScrollableTab, Title } from 'native-base';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import Complete from './VideoLoader'
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const subscription_key = '637afc20a2114f60aaa357fc6863388c';
let i = 0, j = 0, l = 0;
sportsNews = new Array;
generalNews = new Array;
techNews = new Array;

// ];

var data = new Array;

const VideoScreen = ({ navigation }) => {

  let user;
  const getUser = async () => {
    try{
      user = await AsyncStorage.getItem('username');  
  console.log(user);  
    } catch (error){
      console.log(error)
    }
  }
  function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

  const [Active, setActive] = useState(false);


  // const [urls, setUrls] = useState(["https://socialegg.in"]);
  const [cards, setCards] = useState({
    general: [],
    sports: [],
    tech: []
  });
  // console.log(navigation);
  var dat = [];
  
  
  useEffect(() => {
    const loadData = async () => {
    await axios.get("https://asia-northeast1-socialegg-news.cloudfunctions.net/getVideo", 
    ).then(res => {
      // console.log(res.data);
      data = ((res.data));
      console.log(data.sports.length)
      for(; i < 10; )
      {
        sportsNews.push(data.sports[i]);
        generalNews.push(data.general[i]);
        techNews.push(data.tech[i]);
        i++;
        j++;
        l++;
      }
    }).then(() => {
      setCards({
        general: [...(generalNews)],
        sports: [...(sportsNews)],
        tech: [...(techNews)]
      });
      console.log(sportsNews);
      // console.log((cards.length));
    })
    .catch(err => {
      console.log(err);
    })}
    loadData();
    // console.log(cards);
    getUser();
  }, [])

  const refreshSports = () => {
    var tmp = i;
    sportsNews = [];
    for(i; i < tmp+10 && i < data.sports.length;i++)
    {
      sportsNews.push(data.sports[i]);
    }
    setCards({
      // general: [...(generalNews)],
      ...cards,
      sports: [...(sportsNews)],
      // tech: [...(techNews)]
    });
    scroll.scrollTo({x: 0, y: 0, animated: true});
    // console.log(i);
  }
  const refreshGeneral = () => {
    var tmp = j;
    generalNews = [];
    for(j; j < tmp+10 && j < data.general.length;j++)
    {
      generalNews.push(data.general[j]);
    }
    setCards({
      // general: [...(generalNews)],
      ...cards,
      general: [...(generalNews)],
      // tech: [...(techNews)]
    });
    // console.log(i);
    scroll.scrollTo({x: 0, y: 0, animated: true});
  }
  const refreshTech = () => {
    var tmp = l;
    techNews = [];
    for(l; (l < tmp+10) && (l < data.tech.length);l++)
    {
      techNews.push(data.tech[l]);
    }
    setCards({
      // general: [...(generalNews)],
      ...cards,
      tech: [...(techNews)],
      // tech: [...(techNews)]
    });
    scroll.scrollTo({x: 0, y: 0, animated: true});
    // console.log(i);
  }


  return (
    <Container style={{backgroundColor: 'black',alignSelf:'center'}}>
      
      <ScrollView
        ref={(c) => {scroll = c}}
      >
    <View style={{flex: 1, flexDirection:'column'}}>
      <Header hasTabs transparent>
              
                  <Body>
                    <Title style={{fontSize: 25, marginTop:2,alignSelf:'center',fontFamily:'Headings'}}>Snapshots</Title>
                  </Body>
              </Header>
                <Tabs style={{alignItems: 'center'}}  renderTabBar={()=> <ScrollableTab tabsContainerStyle={{backgroundColor: 'black', alignItems: 'center', textAlign: 'center'}} style={{borderBottomWidth: 0}} />}>
                <Tab  style={{marginLeft: 20}}  textStyle={{fontFamily:'Font'}} activeTextStyle={{fontFamily:'Font'}} activeTabStyle={{backgroundColor: "black"}} tabStyle={{backgroundColor:'black',alignSelf:'center'}} style={{backgroundColor: 'black'}}  heading='GENERAL' >
      <FlatList
        data={cards.general}
        ListEmptyComponent={() =>
              <View style={{ alignSelf: "center" }}>
                <Complete />
              </View>
            } 
        keyExtractor={item => ( item.link)}
        renderItem={({item}) =>
        <ScrollView style={{marginTop:20}}>
            
                  <TouchableWithoutFeedback  onPress={() => navigation.navigate('YoutubeScreen', { url: item.link,name:item.author }) }>
                  <Card elevation={0}  style={{ backgroundColor: '#2e2e2e',borderRadius:20, borderColor: "#2e2e2e", height: 430,shadowColor: "#000",marginRight: 20, marginLeft: 20,width:width-47 }}>
            <ImageBackground source={require('./background.jpg')} style={styles.background} imageStyle={{opacity:0.5}}>
            <LinearGradient
                  colors={['#38495D', 'transparent']}
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: 490,
                    borderRadius:20
                  }}
                  start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
                />
            <CardItem style={{backgroundColor: 'transparent'}}>
                      <Text style={{textAlign: 'left', color:'#e3e3e3', flexDirection: 'row', flex: 1,fontFamily:'Font'}} >{item.author}</Text>
                      <Text style={{ textAlign: 'right', color:'#e3e3e3',fontFamily:'Font' }}>{item.published.split('T')[0]}</Text>
                    </CardItem>
                    <CardItem cardBody style={{backgroundColor: 'transparent'}}>
                    <ImageBackground style={{ height: 250, flex: 1, borderRadius: 20,alignItems: 'center', justifyContent: 'center', opacity: 0.8 }} source={{uri: item.thumbnail}}>
                        <FontAwesome name="play" style={{alignSelf: 'center', fontSize: 60, color: 'red',}} />
                    </ImageBackground>
                    </CardItem>
                    <CardItem style={{backgroundColor: 'transparent'}}>
                      <Text style={{color:'#5873FF',fontSize:22,textAlign: 'center', flexDirection: 'row', flex: 1,fontSize:20,fontFamily:'Font'}} >{item.title}</Text>
                    </CardItem>
                    <CardItem style={{backgroundColor: 'transparent', flexDirection: 'row',}}> 
                    <View style={{flexDirection:'row'}}>
                    
                    </View>
                    </CardItem>
          </ImageBackground>
                      </Card>
                    </TouchableWithoutFeedback>
          </ScrollView>
        }
      />
      <TouchableOpacity style={{marginLeft: 110, marginRight: 110, marginBottom: 20, marginTop: 20,padding: 10 ,backgroundColor: "#2e2e2e", }} onPress={refreshGeneral}><Text style={{color: 'white', alignSelf: 'center'}}>Load More</Text></TouchableOpacity>
      </Tab>
      <Tab  style={{marginLeft: 20}}  textStyle={{fontFamily:'Font'}} activeTextStyle={{fontFamily:'Font'}} activeTabStyle={{backgroundColor: "black"}} tabStyle={{backgroundColor:'black',alignSelf:'center'}} style={{backgroundColor: 'black'}}  heading='SPORTS' >
      <FlatList
        data={cards.sports}
        ListEmptyComponent={() =>
              <View style={{ alignSelf: "center" }}>
                <Complete />
              </View>
            } 
        keyExtractor={item => ( item.link)}
        renderItem={({item}) =>
        <ScrollView style={{marginTop:20}}>
            
                  <TouchableWithoutFeedback  onPress={() => navigation.navigate('YoutubeScreen', { url: item.link,name:item.author }) }>
                  <Card elevation={0}  style={{ backgroundColor: '#2e2e2e',borderRadius:20, borderColor: "#2e2e2e", height:490,shadowColor: "#000",marginRight: 20, marginLeft: 20,width:width-47 }}>
            <ImageBackground source={require('./background.jpg')} style={styles.background} imageStyle={{opacity:0.5}}>
            <LinearGradient
                  colors={['#38495D', 'transparent']}
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: 490,
                    borderRadius:20
                  }}
                  start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
                />
            <CardItem style={{backgroundColor: 'transparent'}}>
                      <Text style={{textAlign: 'left', color:'#e3e3e3', flexDirection: 'row', flex: 1}} >{item.author}</Text>
                      <Text style={{ textAlign: 'right', color:'#e3e3e3' }}>{item.published.split('T')[0]}</Text>
                    </CardItem>
                    <CardItem cardBody style={{backgroundColor: 'transparent'}}>
                    <ImageBackground style={{ height: 250, flex: 1, borderRadius: 20,alignItems: 'center', justifyContent: 'center', opacity: 0.8 }} source={{uri: item.thumbnail}}>
                        <FontAwesome name="play" style={{alignSelf: 'center', fontSize: 60, color: 'red',}} />
                    </ImageBackground>
                    </CardItem>
                    <CardItem style={{backgroundColor: 'transparent'}}>
                      <Text style={{color:'#5873FF',fontSize:22,textAlign: 'center', flexDirection: 'row', flex: 1,fontSize:20}} >{item.title}</Text>
                    </CardItem>
                    <CardItem style={{backgroundColor: 'transparent', flexDirection: 'row',}}> 
                    <View style={{flexDirection:'row'}}>
                    
                    </View>
                    </CardItem>
          </ImageBackground>
                      </Card>
                    </TouchableWithoutFeedback>
          </ScrollView>
        }
      />
      <TouchableOpacity onPress={refreshSports} style={{marginLeft: 110, marginRight: 110, marginBottom: 20, marginTop: 20,padding: 10 ,backgroundColor: "#2e2e2e", }}><Text style={{color: 'white', alignSelf: 'center'}}>Load More</Text></TouchableOpacity>
      </Tab>
      <Tab  style={{marginLeft: 20}}  textStyle={{fontFamily:'Font'}} activeTextStyle={{fontFamily:'Font'}} activeTabStyle={{backgroundColor: "black"}} tabStyle={{backgroundColor:'black',alignSelf:'center'}} style={{backgroundColor: 'black'}}  heading='TECH'>
      <FlatList
        data={cards.tech}
        ListEmptyComponent={() =>
              <View style={{ alignSelf: "center" }}>
                <Complete />
              </View>
            } 
        keyExtractor={item => ( item.link)}
        renderItem={({item}) =>
          <ScrollView style={{marginTop:20}}>
            
                  <TouchableWithoutFeedback onPress={() => navigation.navigate('YoutubeScreen', { url: item.link,name:item.author }) }>
                  <Card elevation={0}  style={{ backgroundColor: '#2e2e2e',borderRadius:20, height: 490,borderColor: "#2e2e2e", shadowColor: "#000",marginRight: 20, marginLeft: 20,width:width-47 }}>
            <ImageBackground source={require('./background.jpg')} style={styles.background} imageStyle={{opacity:0.5}}>
            <LinearGradient
                  colors={['#38495D', 'transparent']}
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: 490,
                    borderRadius:20
                  }}
                  start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
                />
            <CardItem style={{backgroundColor: 'transparent'}}>
                      <Text style={{textAlign: 'left', color:'#e3e3e3', flexDirection: 'row', flex: 1}} >{item.author}</Text>
                      <Text style={{ textAlign: 'right', color:'#e3e3e3' }}>{item.published.split('T')[0]}</Text>
                    </CardItem>
                    <CardItem cardBody style={{backgroundColor: 'transparent'}}>
                    <ImageBackground style={{ height: 250, flex: 1, borderRadius: 20,alignItems: 'center', justifyContent: 'center', opacity: 0.8 }} source={{uri: item.thumbnail}}>
                        <FontAwesome name="play" style={{alignSelf: 'center', fontSize: 60, color: 'red',}} />
                    </ImageBackground>
                    </CardItem>
                    <CardItem style={{backgroundColor: 'transparent'}}>
                      <Text style={{color:'#5873FF',fontSize:22,textAlign: 'center', flexDirection: 'row', flex: 1,fontSize:20}} >{item.title}</Text>
                    </CardItem>
                    <CardItem style={{backgroundColor: 'transparent', flexDirection: 'row',}}> 
                    <View style={{flexDirection:'row'}}>
                    
                    </View>
                    </CardItem>
          </ImageBackground>
                      </Card>
                    </TouchableWithoutFeedback>
          </ScrollView>
        }
      />
      <TouchableOpacity onPress={refreshTech} style={{marginLeft: 110, marginRight: 110, marginBottom: 20, marginTop: 20,padding: 10 ,backgroundColor: "#2e2e2e", }}><Text style={{color: 'white', alignSelf: 'center'}}>Load More</Text></TouchableOpacity>
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
  );
}

VideoScreen.navigationOptions = {
  header: null,
};

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
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    borderRadius:30,
  },
});

export default VideoScreen;