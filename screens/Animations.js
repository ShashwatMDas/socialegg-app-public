import React from 'react';
import { Button, StyleSheet, View, Dimensions,Text, AsyncStorage } from 'react-native';
import LottieView from "lottie-react-native";
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import AnimatedEllipsis from 'react-native-animated-ellipsis';
const App = (props) => {
let ScreenHeight = Dimensions.get("window").height;
// console.log(props);
try{
  var {revert} = props.route.params
  console.log(revert);
  if(revert)
  {
    setTimeout(() => {
      props.navigation.navigate('Root');

    }, 1500);
  }

}
catch {
  console.log("nothing");
}
const [bear, setBear] = React.useState(false)
  
// styles
  // componentDidMount() {
  //   this.animation.play();
  //   // Or set a specific startFrame and endFrame with:
  //   // this.animation.play(30, 120);
  // }
  React.useEffect(() => {
    this.animation.play();
    AsyncStorage.getItem("HasBeenOpened").then(res => {
      let x = res;
      if(x) setBear(true)
    })
  }, [])
  const resetAnimation = () => {
    this.animation.reset();
    this.animation.play();
  };

  
  // render() {
    return (
      <View style={styles.animationContainer}>
        <Text style={{color:'white',fontSize:20}}>{"\n"}{"\n"}{"\n"}{"\n"}{revert ? "": "Initializing app" }</Text>
        <AnimatedEllipsis numberOfDots={4} />
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          style={{
            width: 300,
            height: 300,
            backgroundColor: 'black',
            alignSelf:'center'
          }}
          source={require('../assets/hello.json')}
          // OR find more Lottie files @ https://lottiefiles.com/featured
          // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        />
        <Text style={{color:'white',fontSize:13, margin: 4}}>{"\n"}{"\n"}{"\n"}{bear ? "" : "This is a one time installation, please bear with us"}</Text>
        {/*<View style={styles.buttonContainer}>
          <Button title="Restart Animation" onPress={resetAnimation} />
        </View>*/}
      </View>
    );
  // }
}
const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: 'black',
    alignItems: 'center',
    height:height+200
  },
  buttonContainer: {
    paddingTop: 20,
    marginBottom: 100
  },
});
export default App;