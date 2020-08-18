import * as React from 'react';
import { Share, AsyncStorage, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import { AppLoading } from 'expo';
import { useFonts } from '@use-expo/font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import Browser from './screens/Browser';
import IntroSlider from './screens/IntroSlider'
import FeedScreen from './screens/FeedScreen'
import Youtube from './screens/Youtube'
import { Icon } from 'native-base';
import SocialContext from './context/Context'
import Animations from './screens/Animations'
import axios from 'axios';
import * as StoreReview from 'expo-store-review';



function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

console.disableYellowBox = true;

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);
  // const [region, setregion] = React.useState('');
  const [EntertainmentCards, setEntertainmentCards] = React.useState([]);
  const [IndiaCards, setIndiaCards] = React.useState([]);
  const [BusinessCards, setBusinessCards] = React.useState([]);
  const [LifeStyleCards, setLifeStyleCards] = React.useState([]);
  const [PoliticsCards, setPoliticsCards] = React.useState([]);
  const [ScienceAndTechnologyCards, setScienceAndTechnologyCards] = React.useState([]);
  const [SportsCards, setSportsCards] = React.useState([]);
  const [WorldCards, setWorldCards] = React.useState([]);
  const [hasbo, setHasbo] = React.useState(false);


  const HasBeenOpened = async () => {
    let hso =  await AsyncStorage.getItem("HasBeenOpened");
    console.log("hso", hso);
    if(hso === 'true')
    {
        console.log(hso);
        setHasbo(true);
    }
}
// HasBeenOpened();
  // Load any resources or data that we need prior to rendering the app

  // const region = 'en_IN'


  const ShareNews = async (url, type) => {

    try {
      if (type == "article") {
        const url1 = StoreReview.storeUrl();
        const result = await Share.share({
          message: 'Hey I found an article ' + 'you might find interesting : ' + url + "\n" + "Read more such articles at SocialEGG. Download now at - "+ url1,
        });
      }
      else {
        const result = await Share.share({
          message: 'Hey I found a video ' + 'you might find interesting : https://www.youtube.com/watch?v=' + url + "\n" + "Find more such videos at SocialEGG. Download now at - "+url1,
        });
      }

      // if (result.action === Share.sharedAction) {
      //   if (result.activityType) {
      //     // shared with activity type of result.activityType
      //   } else {
      //     // shared
      //   }
      // } else if (result.action === Share.dismissedAction) {
      //   // dismissed
      // }
    } catch (error) {
      alert(error.message);
    }
  }
  const [x, setX] = React.useState(false);

  React.useEffect(() => {
  

    HasBeenOpened();
    //     const getFonts = async () =>{

    //       try{
    //         await Font.loadAsync({

    //          'Font': require ('./assets/fonts/myriad.otf'),
    //          'Headings':require('./assets/fonts/Poppins-Medium.ttf'),
    //          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),

    //      });
    //    }
    //      catch(e){
    //        // setFontsLoaded(true);
    //        console.log(e);
    //      }
    //      finally {
    //        setFontsLoaded(true);
    //      }
    //  }
    // getFonts()
    async function fetchData() {


      let a1 = await AsyncStorage.getItem("EntertainmentCards");
      let a2 = await AsyncStorage.getItem("BusinessCards");
      let a3 = await AsyncStorage.getItem("SportsCards");
      let a4 = await AsyncStorage.getItem("WorldCards");
      let a5 = await AsyncStorage.getItem("LifeStyleCards");
      let a6 = await AsyncStorage.getItem("SnTCards");
      let a7 = await AsyncStorage.getItem("PoliticsCards");
      let a8 = await AsyncStorage.getItem("IndiaCards");
      // console.log(1);
      let ssc = await AsyncStorage.getItem('username')
      if (ssc) {    
      let region1 = await AsyncStorage.getItem('region');
      if (!region1) {
        AsyncStorage.setItem('region','en_IN');
        region1 = 'en_IN'
      }
      console.log(region1)
        let swipedata = await AsyncStorage.getItem(region1+'swipes');
        console.log(swipedata)
        console.log('wtf is happening')
        try{
        if(swipedata){
          console.log('yea it happened')
        const hello = await axios.post("https://asia-northeast1-socialegg-news.cloudfunctions.net/categories", {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "region":region1,
            "data": swipedata,
            "username":ssc
          }
        })
      }
    }
    catch(error){
      console.log(error)
    }
        setX(true);
      }
      if (a1 && a2 && a3 && a4 && a5 && a6 && a7 && a8) {
        //  console.log(2);
        a1 = JSON.parse(a1)
        shuffle(a1);
        // console.log(a1)
        a2 = JSON.parse(a2)
        shuffle(a2);
        a3 = JSON.parse(a3)
        shuffle(a3);
        a4 = JSON.parse(a4)
        shuffle(a4);
        a5 = JSON.parse(a5)
        shuffle(a5);
        a6 = JSON.parse(a6)
        shuffle(a6);
        a7 = JSON.parse(a7)
        shuffle(a7);
        a8 = JSON.parse(a8)
        shuffle(a8);


        setEntertainmentCards([...(a1)]);
        setBusinessCards([...(a2)]);
        setSportsCards([...(a3)]);
        setWorldCards([...(a4)]);
        setLifeStyleCards([...(a5)]);
        setScienceAndTechnologyCards([...(a6)]);
        setPoliticsCards([...(a7)]);
        setIndiaCards([...(a8)]);
        // console.log(a8);  
      }


      else {

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
        let array1 = shuffleArray(Entertainment['data']);
        setEntertainmentCards(array1);
        await AsyncStorage.setItem("EntertainmentCards", JSON.stringify(array1));
        const Business = await axios({
          url: 'https://asia-northeast1-socialegg-news.cloudfunctions.net/get_' + region + 'Business',
          method: 'get',
        });
        console.log('https://asia-northeast1-socialegg-news.cloudfunctions.net/get_' + region + 'Entertainment');
        let array2 = shuffleArray(Business['data']);
        setBusinessCards(array2);
        await AsyncStorage.setItem("BusinessCards", JSON.stringify(array2));
        const Sports = await axios({
          url: 'https://asia-northeast1-socialegg-news.cloudfunctions.net/get_' + region + 'Sports',
          method: 'get',
        });
        let array3 = shuffleArray(Sports['data']);
        setSportsCards(array3);
        await AsyncStorage.setItem("SportsCards", JSON.stringify(array3));
        const World = await axios({
          url: 'https://asia-northeast1-socialegg-news.cloudfunctions.net/get_' + region + 'World',
          method: 'get',
        });

        let array4 = shuffleArray(World['data']);
        setWorldCards(array4);
        await AsyncStorage.setItem("WorldCards", JSON.stringify(array4));
        const LifeStyle = await axios({
          url: 'https://asia-northeast1-socialegg-news.cloudfunctions.net/get_' + region + 'LifeStyle',
          method: 'get',
        });
        let array5 = shuffleArray(LifeStyle['data']);
        setLifeStyleCards(array5);
        await AsyncStorage.setItem("LifeStyleCards", JSON.stringify(array5));
        const Technology = await axios({
          url: 'https://asia-northeast1-socialegg-news.cloudfunctions.net/get_' + region + 'ScienceAndTechnology',
          method: 'get',
        });
        let array6 = shuffleArray(Technology['data']);
        setScienceAndTechnologyCards(array6);
        await AsyncStorage.setItem("SnTCards", JSON.stringify(array6));
        const Politics = await axios({
          url: 'https://asia-northeast1-socialegg-news.cloudfunctions.net/get_' + region + 'Politics',
          method: 'get',
        });
        let array7 = shuffleArray(Politics['data']);
        setPoliticsCards(array7);
        await AsyncStorage.setItem("PoliticsCards", JSON.stringify(array7));
        if (region === 'en_IN') {
          const Country = await axios({
            url: 'https://asia-northeast1-socialegg-news.cloudfunctions.net/get_' + region + 'India',
            method: 'get',
          });

          let array8 = shuffleArray(Country['data']);
          setIndiaCards(array8);
          await AsyncStorage.setItem("IndiaCards", JSON.stringify(array8));
        }
        if (region === 'en_US') {
          const Country = await axios({
            url: 'https://asia-northeast1-socialegg-news.cloudfunctions.net/get_' + region + 'US',
            method: 'get',
          });

          let array8 = shuffleArray(Country['data']);
          setIndiaCards(array8);
          await AsyncStorage.setItem("IndiaCards", JSON.stringify(array8));
        }
        if (region === 'en_GB') {
          const Country = await axios({
            url: 'https://asia-northeast1-socialegg-news.cloudfunctions.net/get_' + region + 'UK',
            method: 'get',
          });

          let array8 = shuffleArray(Country['data']);
          setIndiaCards(array8);
          await AsyncStorage.setItem("IndiaCards", JSON.stringify(array8));
        }
        var d = new Date();
        var n = d.getTime();
        console.log(n);
        await AsyncStorage.setItem("lastSaved", JSON.stringify(n));
        return (response);
      }
    }
    fetchData();
    async function loadResourcesAndDataAsync() {
   
      let x = await AsyncStorage.getItem('likedNews');
      if (x == null) {
        await AsyncStorage.setItem('likedNews', JSON.stringify([]));

        // console.log(JSON.stringify([{...dt}]));
      }
      // let x = await AsyncStorage.getItem('likedNews');
      // if(x == null)
      // {
      //   AsyncStorage.setItem('likedNews', []);
      // }
      // else {
      //   console.log(x);
      // }


      // let hello = await AsyncStorage.getItem('region');
      try {
        // await Font.loadAsync({
        //   'Hello': require('./assets/fonts/MontserratAlternates-ExtraLight.ttf'),
        // });

        // SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        // await Font.loadAsync({
        //   'Font': require('./assets/fonts/myriad.otf'),
        //   'Headings': require('./assets/fonts/Poppins-Medium.ttf'),
        //   'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        // });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }

    }

    loadResourcesAndDataAsync();
  }, []);
  let [fontsLoaded] = useFonts({
    'Font': require('./assets/fonts/myriad.otf'),
    'Headings': require('./assets/fonts/Poppins-Medium.ttf'),
    'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
  });
  if (!fontsLoaded) {
      return <Animations />;
  }
  else {
    if (!isLoadingComplete && (!LifeStyleCards.length || !BusinessCards.length || !IndiaCards.length || !EntertainmentCards.length || !ScienceAndTechnologyCards.length || !PoliticsCards.length || !SportsCards.length || !WorldCards.length)) {
      return <Animations />;
    }
    else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
            <SocialContext.Provider value={{ EntertainmentCards, IndiaCards, BusinessCards, LifeStyleCards, PoliticsCards, ScienceAndTechnologyCards, SportsCards, WorldCards, setWorldCards, setEntertainmentCards, setBusinessCards, setLifeStyleCards, setPoliticsCards, setScienceAndTechnologyCards, setSportsCards, setIndiaCards }}>
              <Stack.Navigator>
            {
              !hasbo ? (
              <React.Fragment>
                <Stack.Screen name="IntroSlide" component={IntroSlider} options={{ headerShown: false, backgroundColor: 'black', color: 'black', }} />
              </React.Fragment>) :
              (
                <React.Fragment></React.Fragment>
              )
            }
              {
                  !x ? (
                    <React.Fragment>
                      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, backgroundColor: 'black', color: 'black', }} />
                    </React.Fragment>
                  ) : <React.Fragment></React.Fragment>
                }
                
                    
                 
                <React.Fragment>
                  <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false, backgroundColor: 'black', color: 'black', }} />
                  <Stack.Screen name="Animate" component={Animations} options={{ headerShown: false, backgroundColor: 'black', color: 'black', }} />
                  <Stack.Screen name="Saved" component={FeedScreen} options={{ headerTintColor: '#fff', headerStyle: { backgroundColor: 'black' }, headerTitleStyle: { color: 'white' }, backgroundColor: 'black', color: 'black', }} />
                  <Stack.Screen name="BrowserScreen" component={Browser} options={({ route }) => ({
                    title: route.params.name, headerTitleAlign: 'center', headerRight: () => (
                      <Icon
                        onPress={() => ShareNews(route.params.url, 'article')}
                        name='share'
                        type='SimpleLineIcons'
                        style={{ marginRight: 10 }}
                      />
                    ),
                  })} />
                  <Stack.Screen name="YoutubeScreen" component={Youtube} options={({ route }) => ({
                    title: route.params.name, headerTitleAlign: 'center', headerRight: () => (
                      <Icon
                        onPress={() => ShareNews(route.params.url, 'video')}
                        name='options'
                        type='SimpleLineIcons'
                        style={{ marginRight: 10 }}
                      />
                    ),
                  })} />
                </React.Fragment>
              </Stack.Navigator>
            </SocialContext.Provider>
          </NavigationContainer>
        </View>
      );
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c34',
  },
});
