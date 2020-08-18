import React, { Component, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import Animation from './Animations'
const BackButton = ({ navigation }) => {
    <TouchableOpacity
        onPress={() => {
            navigation.goBack();
        }}>
        <Text>&lt; Back</Text>
    </TouchableOpacity>
}

const Browser = ({ navigation, route }) => {

    //  let navigationOptions = ({ navigation }) => ({
    //     headerRight: <BackButton navigation={navigation} />
    // })
    const hello=()=>{
        return(<Animation />)
    }
const [display,setdisplay] = useState('flex');
    // render() {
        console.log(route.params)
        const  url  = route.params.url
        return (
            <View style={{ flex: 1,backgroundColor:'black' }}>
                {/* <View style={{display:display}}>
                <Animation />
                </View> */}
                 <WebView
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        source={{uri: "https://www.youtube.com/embed/" + url+ "\\" , origin: 'https://www.youtube.com'}}
                />
            </View>
        )
    // }

}

export default Browser;