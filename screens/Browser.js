import React, { Component, useState } from 'react';
import { Share, View, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import Animation from './ArticleLoader'
const BackButton = ({ navigation }) => {
    <TouchableOpacity
        onPress={() => {
            navigation.goBack();
        }}>
        <Text>&lt; Back</Text>
    </TouchableOpacity>
}

const Browser = ({ navigation, route }) => {

    const [loader, setLoader] = useState(true);

    //  let navigationOptions = ({ navigation }) => ({
    //     headerRight: <BackButton navigation={navigation} />
    // })
    const hello=()=>{
        setTimeout(() => {
            setLoader(false);
        }, 7000)
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
                    source={{
                        uri: url
                    }}
                    style={{ flex: 1 }}
                    renderLoading={loader? hello : false}
                    startInLoadingState={loader}
                />
            </View>
        )
    // }

}

export default Browser;