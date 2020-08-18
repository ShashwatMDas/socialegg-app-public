import React, { useEffect, useState, Linking,useContext } from 'react';
import { AsyncStorage ,Image, Platform, StyleSheet, Text, TouchableOpacity, View, Share,Vibration,  ImageBackground, FlatList, TouchableWithoutFeedback } from 'react-native';
import AppIntroSlider from 'react-native-tutorial-slider';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const hasbeenopened = async () => {
}

const styles = StyleSheet.create({
    image: {
        width: width,
        height: 320,
    },
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10,
        marginTop:10
    },
});

const slides = [
    {
        key: 'welcome',
        title: 'Welcome to Social EGG',
        text: 'Information, Simplified!',
        image: require('../assets/hello.png'),
        imageStyle: styles.image,
        backgroundColor: '#59b2ab',
        description:'A quick walkthrough'

        
    },
    {
        key: 'why',
        title: 'Why Social EGG?',
        text: 'Good question!',
        image: require('../assets/question.png'),
        imageStyle: styles.image,
        backgroundColor: '#febe29',
        description:'An integrated approach to information, you can find news and videos alike, so it\'s a one stop solution for your all your news',
        quirk:'*Plus who doesn\'t like swiping XD'

    },
    {
      key: 'feed',
      title: 'Feed Page',
      text: 'Your favourite hangout in the app',
      image: require('../assets/swipe.png'),
      imageStyle: styles.image,
      backgroundColor: '#febe29',
      description:'Swipe your way through the ocean of information. Your preferences are learnt and your news is personalised accordingly',
      quirk:'*Tap once on the feed page cards for a trick ; )'

  },
    {
      key: 'video',
      title: 'Videos',
      text: 'Because, why not!',
      image: require('../assets/video.png'),
      imageStyle: styles.image,
      backgroundColor: '#febe29',
      description:'Stay updated on your favourite topics, with videos from top channels',
  
  },
  {
    key: 'search',
    title: 'Search',
    text: 'Thirsty for more?',
    image: require('../assets/search.png'),
    imageStyle: styles.image,
    backgroundColor: '#febe29',
    description:'Search for news on your favourite topics',

},
{
  key: 'trending',
  title: 'Trending',
  text: '#hashtag!',
  image: require('../assets/trend.png'),
  imageStyle: styles.image,
  backgroundColor: '#febe29',
  description:'Check out today\'s trending news',

},
{
  key: 'trending',
  title: 'Finally...',
  text: 'Your own space',
  image: require('../assets/profile.png'),
  imageStyle: styles.image,
  backgroundColor: '#febe29',
  description:'Swipe right if you like the news, left if you don\'t. Right swiped articles are stored just in case you wanna come back',

},
    ];
    const _renderNextButton = () => {
        return (
          <View style={styles.buttonCircle}>
            <Icon
              name="md-arrow-round-forward"
              color="rgba(255, 255, 255, .9)"
              size={24}
            />
          </View>
        );
      };
      const _renderDoneButton = () => {
        return (
          <View style={styles.buttonCircle}>
            <Icon
              name="md-checkmark"
              color="rgba(255, 255, 255, .9)"
              size={24}
            />
           </View>
        );
      };
   
    const IntroSlider = ({ navigation }) => {
        const _renderItem = (item) => {
            return (
              <View style={{backgroundColor:'black',height:height+height,width:width,marginTop:-20}}>
                <Text style={{fontFamily:'Headings', color:'white', marginTop:height/10,alignSelf:'center',fontSize:20}}>{item.title}</Text>
                <Text style={{fontFamily:'Headings', color:'white', marginTop:20,alignSelf:'center',fontSize:16}}>{item.text}</Text>
                <Image source={item.image} style={{width:210,height:210,marginTop:height/9,alignSelf:'center',marginRight:5}} />
                <Text style={{fontFamily:'Headings', color:'white', marginTop:40,alignSelf:'center',fontSize:15,textAlign:'center', paddingLeft:20, paddingRight:20}}>{item.description}</Text>
                <Text style={{fontFamily:'Headings', color:'white', marginTop:10,alignSelf:'center',fontSize:13,textAlign:'center',paddingLeft:20, paddingRight:20}}>{item.quirk}</Text>
              </View>
            );
          }
        const _onDone = async () => {
            // User finished the introduction. Show "real" app
            await AsyncStorage.setItem("HasBeenOpened", "true");
            navigation.navigate('Login');
        }
        
    return (
        <AppIntroSlider
        slides={slides}
        onDone={_onDone}
        renderItem={_renderItem}
        renderDoneButton={_renderDoneButton}
        renderNextButton={_renderNextButton}
      />
    )
}
export default IntroSlider;