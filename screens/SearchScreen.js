import { Searchbar } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
import * as Font from 'expo-font';
import React, { useEffect, useState, Linking } from 'react';
import { AsyncStorage, Image, Platform, StyleSheet, Text, TouchableOpacity, View, Share,  ImageBackground, FlatList,TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';
import { Container, Header, DeckSwiper, Card, CardItem, Thumbnail, Left, Body,Button, Icon, Fab, Right } from 'native-base';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import SearchAnimate from './SearchAnimate'
import { Dimensions } from 'react-native';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const subscription_key = 'a556adc4959e4d9fa0a7ab9a02c9102f';
var data = new Array;
const SearchBar = ({ navigation }) => {
 

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

  

  const [Active, setActive] = useState(false);


  const [searched, setSearched] = useState("block");
  const [Load,setLoad] = useState()
  const [display,setdisplay] = useState('flex')
  const [searchdis,setsearchdis] = useState('none')
  const [urls, setUrls] = useState(["https://socialegg.in"]);
  const [cards, setCards] = useState([]);

var dat = [];
    const [state, setstate] = useState('');
    useEffect(() => {
      async function loadResourcesAndDataAsync() {
        
        try {
          // await Font.loadAsync({
          //   Hello: require('../assets/fonts/MontserratAlternates-ExtraLight.ttf'),
          // });
          
  
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

      const  _onChangeSearch = query => setstate(query)
      const _keyboardDidHide = async () => {
        setCards([])
        setdisplay('none')
        setsearchdis('flex')
        console.log(state)
       await axios.get("https://api.cognitive.microsoft.com/bing/v7.0/news/search",{
            headers :{"Ocp-Apim-Subscription-Key" : subscription_key},
            params  :{"q": state,"count":100}
        })
        .then(res => {
            // var hello = Object.keys(res['data']['value']);
            console.log(res['data']['value'])

            setSearched("none");
        setsearchdis('none')
            setCards([...res['data']['value']])
        }).catch(err => {
          console.log(err);
        })
      };
    return (
        <Container style={{backgroundColor: 'black',alignSelf:'center'}}>
          <Text style={{fontSize:40,color:'white',marginTop:10,paddingLeft:'3%'}}>
          </Text>
          <ScrollView>
           <Text style={{fontSize:30,color:'white',marginBottom:30,paddingLeft:'3%'  ,alignSelf:'center',fontFamily:'Headings'}}>
            SEARCH
          </Text>
      <Searchbar
        // placeholder="Search for news"
        onChangeText={_onChangeSearch}
        value={state}
        onSubmitEditing={_keyboardDidHide}
        style={{width:'75%',alignSelf:'center',backgroundColor:'#2e2e2e'  }}
        theme={{
          colors: {
                     placeholder: 'white', text: 'white', primary: 'white',
                     underlineColor: 'transparent'  ,
             }
       }}
        />
        
        
        <View style={{ flex: 1, flexDirection: 'column', paddingTop: 40, width:width }}>
        <View style={{ alignSelf: "center",display:display }}>
                
                <Text style={{fontSize:20,color:'white',paddingLeft:'3%',textAlign:'center',fontFamily:'Headings'}}>Uh-Oh, it's pretty quite here.{'\n'} Keep searching for fresh news{'\n'} on the topics you love!</Text>
                <SearchAnimate />
              </View>
              {/* <View style={{ alignSelf: "center",display:searchdis }}>
                
                <Text style={{fontSize:20,color:'white',paddingLeft:'3%',textAlign:'center',fontFamily:'Headings'}}>Searching</Text>
        <AnimatedEllipsis numberOfDots={4} /> 
              </View> */}
                 
        <FlatList
          data={cards}
          keyExtractor={item => item.url}
          ListEmptyComponent={() =>
            <View style={{alignContent:'center',alignItems:'center', alignSelf:'center', display:searchdis
            }}>
            <Text style={{fontSize:20,color:'white',paddingLeft:'3%',textAlign:'center',fontFamily:'Headings'}}>Searching</Text>
        <AnimatedEllipsis numberOfDots={4} /> 
              </View>
            }
            renderItem={item =>
            <ScrollView style={{marginTop:20}}>
            
                  <TouchableWithoutFeedback  onPress={() => navigation.navigate('BrowserScreen', { url: item.item.url,name:item.item.provider[0].name }) }>
                  <Card elevation={0}  style={{ backgroundColor: '#2e2e2e',borderRadius:20, borderColor: "#2e2e2e", minHeight: 500,shadowColor: "#000",marginRight: 20, marginLeft: 20,width:width-47 }}>
            <ImageBackground source={require('./background.jpg')} style={styles.background} imageStyle={{opacity:0.5}}>
            <LinearGradient
                  colors={['#38495D', 'transparent']}
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: 500,
                    borderRadius:20
                  }}
                  start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
                />
            <CardItem style={{backgroundColor: 'transparent'}}>
                      <Text style={{textAlign: 'left', color:'#e3e3e3', flexDirection: 'row', flex: 1,fontFamily:'Font'}} >{item.item.provider[0].name}</Text>
                      <Text style={{ textAlign: 'right', color:'#e3e3e3',fontFamily:'Font' }}>{item.item.datePublished.split('T')[0]}</Text>
                    </CardItem>
                    <CardItem cardBody style={{backgroundColor: 'transparent'}}>
                    {/* <ImageBackground  borderRadius={20} blurRadius={2} source={{uri: item.item.image.thumbnail.contentUrl}} style={styles.image}>
                      <Image style={{ height: 100, flex: 1, borderRadius: 20, margin: 40, marginLeft: 100, marginRight: 100,width:100,alignSelf:'center' }} source={{uri: item.item.image.thumbnail.contentUrl}} />
                    </ImageBackground> */}
                    </CardItem>
                    <CardItem style={{backgroundColor: 'transparent'}}>
                      <Text style={{color:'#5873FF',fontSize:22,textAlign: 'center', flexDirection: 'row', flex: 1,fontSize:20,fontFamily:'Headings'}} >{item.item.name}</Text>
                    </CardItem>
                    <CardItem style={{backgroundColor: 'transparent'}}> 
                      <Text style={{color:'#e3e3e3', textAlign: 'center', flexDirection: 'row', flex: 1,fontSize:18,fontFamily:'Font'}}>{item.item.description}</Text>
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

SearchBar.navigationOptions = {
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
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    borderRadius:50,
  },
});

export default SearchBar;