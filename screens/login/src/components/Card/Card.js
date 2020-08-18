import React, { useState } from "react";
import PropTypes from "prop-types";
import { Text, View, Dimensions, AsyncStorage, Image } from "react-native";
import { Container } from 'native-base';
import Icon from "react-native-dynamic-vector-icons";
import TextInput from "react-native-improved-text-input";
import styles, { _textStyle, _textInputStyle } from "./Card.style";
import { Button } from 'react-native-elements';
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Facebook from 'expo-facebook';
import axios from 'axios';
import Animation from '../../../../Animations'
import FS from '../../../../LoginLoader'
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as GoogleSignIn from 'expo-google-sign-in';

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const Card = props => {
  const {
    title,
    value,
    textStyle,
    textColor,
    titleStyle,
    titleColor,
    placeholder,
    onChangeText,
    selectionColor,
    iconComponent,
    navigation
  } = props;
  const [username, setUser] = useState('');
  const [fbCred, setFBCred] = useState({});
  const [LoggingIn, setLogging] = useState(false);
  // const [notifToken, setNotifToken] = useState('');
  let notifToken = ''

  const initAsync = async () => {
    await GoogleSignIn.initAsync({
      // You may ommit the clientId when the firebase `googleServicesFile` is configured
      clientId: '917843655001-2o4hfmotgs6g913b7f15cjfuql3c70ga.apps.googleusercontent.com',
      scopes: ['profile', 'email']
    });
  };

  React.useEffect(() => {
    initAsync();
  }, [])


  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      // console.log("checking");
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        // console.log("1st check");
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        // console.log("not granted")
        // alert('Failed to get push token for push notification!');
        return;
      }
      // console.log("granted");
      token = await Notifications.getExpoPushTokenAsync();
      // console.log(token);
      // setNotifToken(token);
      notifToken = token;
      // console.log(func, notifToken,"next", token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'Social Egg',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };
  async function signInWithGoogleAsync() {


    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        const user = await GoogleSignIn.signInSilentlyAsync();
        // const pic = await GoogleSignIn.getPhotoAsync();
        setLogging(true);
        const user_data =  await GoogleSignIn.getCurrentUserAsync();
        await registerForPushNotificationsAsync();

        // console.log(notifToken)
        const googleAppr = await axios.post("https://asia-northeast1-socialegg-news.cloudfunctions.net/login", {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "authorizationToken": String(user_data["auth"]["idToken"]),
            "authtype": 'google',
            "userdata": { "id": user_data["uid"], "name": user_data["displayName"], "pic": user_data["photoURL"], "notifToken": notifToken, "region": "en_IN" }
          }
        })
        // console.log(googleAppr["data"]);
        // alert(JSON.stringify(googleAppr));
        AsyncStorage.setItem('username', user_data["uid"]);
        AsyncStorage.setItem('region', 'en_IN');
        AsyncStorage.setItem('name', user_data["displayName"]);
        AsyncStorage.setItem('pic', user_data["photoURL"]);
        AsyncStorage.setItem('scroll', false);
        AsyncStorage.setItem('notifToken', notifToken);
        setLogging(false);
        navigation.navigate('Root');
        // const name = await GoogleSignIn.SCOPES.PROFILE 
        // await GoogleSignIn.signOutAsync();
        // alert(JSON.stringify(user_data));
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }

    // try {
    //   const result = await Google.logInAsync({
    //     androidClientId: "43900803024-pfa28f6sj3im4reclmio7m95dfbi0se9.apps.googleusercontent.com",
    //     iosClientId: "43900803024-u3gad392u2081agg9krd7j3fnogqv9mp.apps.googleusercontent.com",
    //     androidStandaloneAppClientId: "43900803024-m7ueppr9ikkht87b6b392qf0i8m75isk.apps.googleusercontent.com",
    //     webClientId: "43900803024-uustsjn5va1ah03bdhi3fk381vpst7bf.apps.googleusercontent.com",
    //     // clientId: "43900803024-m7ueppr9ikkht87b6b392qf0i8m75isk.apps.googleusercontent.com",
    //     scopes: ['profile', 'email'],
    //     // behavior: 'web',
    //     // redirectUrl: `${AppAuth.OAuthRedirect}:/oauthredirect/google`
    //   });


    //   console.log("yeehaw", AppAuth.OAuthRedirect)
    //   if (result.type === 'success') {
    //     // console.log
    //     console.log(result);
    //     setLogging(true);
    //     await registerForPushNotificationsAsync();
    //     // console.log(notifToken)
    //     const googleAppr = await axios.post("https://asia-northeast1-socialegg-news.cloudfunctions.net/login", {
    //       headers: {
    //         'Content-Type': 'application/json;charset=UTF-8',
    //         "Access-Control-Allow-Origin": "*",
    //         "authorizationToken": String(result["idToken"]),
    //         "authtype": 'google',
    //         "userdata": { "id": result["user"]["id"], "name": result["user"]["name"], "pic": result["user"]["photoUrl"], "notifToken": notifToken, "region": "en_IN" }
    //       }
    //     })
    //     setUser(result["user"]["id"]);
    //     console.log(googleAppr["data"]);
    //     AsyncStorage.setItem('username', result["user"]["id"]);
    //     AsyncStorage.setItem('region', 'en_IN');
    //     AsyncStorage.setItem('name', result["user"]["name"]);
    //     AsyncStorage.setItem('pic', result["user"]["photoUrl"]);
    //     AsyncStorage.setItem('scroll', false);
    //     AsyncStorage.setItem('notifToken', notifToken);
    //     setLogging(false);
    //     let x = AsyncStorage.getItem("HasBeenOpened");
    //     if (x) {
    //       navigation.navigate('IntroSlide');
    //     }
    //     navigation.navigate('Root');
    //     // _storeData = async () => {
    //     //   try {
    //     //     await AsyncStorage.setItem(
    //     //       'username',
    //     //       result["user"]["id"]
    //     //     );
    //     //   } catch (error) {
    //     //     // Error saving data
    //     //     console.log(error);
    //     //   }
    //     // };
    //     return result.accessToken;
    //   } else {
    //     console.log("cancelled");
    //     return { cancelled: true };
    //   }
    // } catch (e) {
    //   setLogging(false);
    //   console.log(e);
    //   return { error: true };
    // }
  }
  let ScreenHeight = Dimensions.get("window").height;
  let fbAppr;
  let fbData = false;
  async function signInFacebook() {
    try {
      await Facebook.initializeAsync('525299814772259');
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['email'],
      });
      // console.log(token);


      // if(fbAppr["data"] == "Valid") fbData = true;
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        // console.log(token);
        // console.log(fbData);
        setLogging(true);
        await registerForPushNotificationsAsync()
        console.log("notiftoken", notifToken);
        const response = await fetch(`https://graph.facebook.com/me?fields=id,first_name,last_name,name,email,picture&access_token=${token}`);
        const res = await response.json();
        console.log(res);
        const fbAppr = await axios.post("https://asia-northeast1-socialegg-news.cloudfunctions.net/login", {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "authorizationToken": String(token),
            "authtype": 'facebook',
            "userdata": { "id": res["id"], "name": res["name"], "pic": res["picture"]["data"]["url"], "notifToken": notifToken, "region": "en_IN" }
          }
        })
        setLogging(false);
        // _storeData = async () => {
        //     try {
        //       await AsyncStorage.setItem(
        //         'username',
        //         res["id"]
        //       );
        //     } catch (error) {
        //       // Error saving data
        //       console.log(error);
        //     }
        //   };
        AsyncStorage.setItem('username', res["id"]);
        AsyncStorage.setItem('region', 'en_IN');
        AsyncStorage.setItem('name', res["name"]);
        AsyncStorage.setItem('pic', res["picture"]["data"]["url"]);
        AsyncStorage.setItem('scroll', false);
        AsyncStorage.setItem('notifToken', notifToken);
        setUser(res["id"]);
          navigation.navigate('Root');
        console.log(fbAppr['data']);
        setFBCred({ ...res });
        //   console.log('Logged in!', `Hi ${(await response.json()).name}!`);

      } else {
        // type === 'cancel'
        setLogging(false);
        console.log("asdsad");
      }
    }
    catch ({ message }) {
      setLogging(false);
      alert(`Facebook Login Error: ${message}`);
    }
  }
  if (LoggingIn) {
    return (
      <View style={{ backgroundColor: 'black', top: 0, bottom: 0, left: 0, right: 0,zIndex:1 }}>
        <FS />
     </View>
    )
  }

  return (
    <TouchableOpacity style={{display:LoggingIn?"none":"flex"}} onPress={() => title === 'Google' ? signInWithGoogleAsync() : signInFacebook()}>
      <View style={{
        backgroundColor: title === 'Facebook' ? '#3b5998' : "white", margin: 8,
        height: 75,
        width: "95%",
        marginTop: 0,
        borderRadius: 24,
        justifyContent: 'center',
        flexDirection: 'row'
      }}>
        <Image style={{ alignSelf: 'center', height: 40, width: 40 }} source={{ uri: title === 'Facebook' ? 'https://cdn0.iconfinder.com/data/icons/yooicons_set01_socialbookmarks/512/social_facebook_box_white.png' : 'https://img.icons8.com/color/48/000000/google-logo.png' }} />
        <Text style={{ alignSelf: 'center', color: title === 'Facebook' ? 'white' : "black", marginLeft: 30, fontSize: 15, fontFamily: 'Headings' }}>Sign In with {title}</Text>
      </View>
    </TouchableOpacity>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  textColor: PropTypes.string,
  titleColor: PropTypes.string,
  placeholder: PropTypes.string,
  selectionColor: PropTypes.string
};

Card.defaultProps = {
  title: "User Name",
  textColor: "black",
  titleColor: "#c7c5c6",
  placeholder: "John Doe",
  selectionColor: "#757575"
};

export default Card;
