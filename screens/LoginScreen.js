import React, { useState,useEffect } from 'react';
import { AsyncStorage ,View, StyleSheet, Platform, TouchableOpacity, Dimensions } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { Container, Header, Content, Card, CardItem, Icon, Right, H1 } from 'native-base';
import Spacer from '../components/Spacer';
import { Ionicons } from '@expo/vector-icons';
import * as Facebook from 'expo-facebook';
import axios from 'axios';
import Animation from './LoginLoader'
import LoginScreen from "./login/src/LoginScreen";





const SigninScreen =  ({ navigation }) => {
navigation.navigate('Root')
    const [fbCred, setFBCred] = useState({});
    const [LoggingIn, setLogging] = useState(false);
    useEffect(async () => {
      
      })
let ScreenHeight = Dimensions.get("window").height;
let fbAppr;
let fbData = false;
    if(LoggingIn)
    {
      return(
        // <View style={{backgroundColor: 'black'}}>
          <Animation />
        // </View>
      )
    }
    return ( 
      <Container style={{alignItems: 'center',backgroundColor:'black'}}>
        <LoginScreen
  disableSettings='true'
  logoText='Social EGG'
  loginText='INFORMATION, SIMPLIFIED'
  usernameTextInputValue='Login with Facebook'
  navigation={navigation}
  />
      </Container>


        
    );
};

SigninScreen.navigationOptions = () => {
    return {
        header: null
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 200
    }
});

export default SigninScreen;