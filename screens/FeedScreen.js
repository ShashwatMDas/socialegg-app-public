import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState, Linking } from 'react';
import { AsyncStorage, Image, Platform, StyleSheet, Text, TouchableOpacity, View, Share, ImageBackground, FlatList, TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';
import { Container, Header, DeckSwiper, Card, CardItem, Thumbnail, Left, Body, Button, Icon, Fab, Right } from 'native-base';
import axios from 'axios';
import LottieView from "lottie-react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Complete from './Complete'
import { Dimensions } from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

var data = new Array;

const FeedScreen = ({ navigation, route }) => {

  const [Active, setActive] = useState(false);

  const savedCards = route.params.savedCards;
  
  const [urls, setUrls] = useState(["https://socialegg.in"]);
  const [cards, setCards] = useState(savedCards);

  // console.log(cards);
  // console.log(navigation);

  const loadData = async () => {
    // await axios.get("http://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=8238274e2c804ba7846c193f425ee6d3")
    //   .then(res => {
    //     data = res.data.articles;
    //     setCards([...data]);
    //     // console.log(res.data.articles);
    //   }).catch(err => {
    //     console.log(err);
    //   })
    // AsyncStorage.getItem('likedNews').then(res => {
    //  data = (JSON.parse(res));

    // })
    // console.log(x);
    // console.log(cards);
    // const data = res.data.articles;
    // setCards(data);
    // console.log(data);
  }

  let user;
  const getUser = async () => {
    try {
      user = await AsyncStorage.getItem('username');
      // console.log(user);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadData();
    // setCards([...data]);
    // console.log(cards);
    getUser();
    // this.animation.play();
  }, [])

  // useEffect(() => {
  //   loadData();
  //   this.animation.play();
  // }, [])

  // const resetAnimation = () => {
  //   this.animation.reset();
  //   this.animation.play();
  // };



  return (
    <Container style={{ backgroundColor: 'black',alignSelf:'center' }}>

      
      <View style={{ flex: 1, flexDirection: 'column', paddingTop: 40 }}>
      <Text style={{ color: '#ffffff', alignSelf: 'center', fontSize: 20, marginHorizontal: 30, marginTop: -30, textAlign: 'center'}}>All your right swiped articles are saved here!</Text>

        <FlatList
          data={cards}
          keyExtractor={item => item.url}
          ListEmptyComponent={() =>
              <View style={{ alignSelf: "center" }}>
                <Text style={{fontSize:20,color:'white',paddingLeft:'3%',textAlign:'center'}}>It Looks like you went through all the news present in this category{"\n"}{"\n"}Come back later or change the category for more news</Text>
                <Complete />
              </View>
            }
            renderItem={item =>
            <ScrollView style={{marginTop:20}}>
            
                  <TouchableWithoutFeedback  onPress={() => navigation.navigate('BrowserScreen', { url: item.item.url,name:item.item.name }) }>
                  <Card elevation={0}  style={{ backgroundColor: '#2e2e2e',borderRadius:20, borderColor: "#2e2e2e", minHeight: 600,shadowColor: "#000",marginRight: 20, marginLeft: 20,width:width-47 }}>
            <ImageBackground source={require('./background.jpg')} style={styles.background} imageStyle={{opacity:0.5}}>
            <LinearGradient
                  colors={['#38495D', 'transparent']}
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: height,
                    borderRadius:20
                  }}
                  start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
                />
            <CardItem style={{backgroundColor: 'transparent'}}>
                      <Text style={{textAlign: 'left', color:'#e3e3e3', flexDirection: 'row', flex: 1}} >{item.item.name}</Text>
                      <Text style={{ textAlign: 'right', color:'#e3e3e3', }}>{item.item.date}</Text>
                    </CardItem>
                    <CardItem cardBody style={{backgroundColor: 'transparent'}}>
                    <ImageBackground  borderRadius={20} blurRadius={2} source={{uri: item.item.imgUrl}} style={styles.image}>
                      <Image style={{ height: 100, flex: 1, borderRadius: 20, margin: 40, marginLeft: 100, marginRight: 100,width:100,alignSelf:'center' }} source={{uri: item.item.imgUrl}} />
                    </ImageBackground>
                    </CardItem>
                    <CardItem style={{backgroundColor: 'transparent'}}>
                      <Text style={{color:'#5873FF',fontSize:22,textAlign: 'center', flexDirection: 'row', flex: 1,fontSize:20}} >{item.item.title}</Text>
                    </CardItem>
                    <CardItem style={{backgroundColor: 'transparent'}}> 
                      <Text style={{color:'#e3e3e3', textAlign: 'center', flexDirection: 'row', flex: 1,fontSize:18}}>{item.item.desc}</Text>
                      <View style={{}}/>
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
      </View>
      
    </Container>
  );
}

FeedScreen.navigationOptions = {
  // header: null,
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
    borderRadius:50,
    width:width/2,
    marginLeft:width/5
  },
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
    marginBottom: 100
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    borderRadius:50,
  },
});

export default FeedScreen;