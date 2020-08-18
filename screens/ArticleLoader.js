import React from 'react';
import { Button, StyleSheet, View, Dimensions,Text } from 'react-native';
import LottieView from "lottie-react-native";
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import AnimatedEllipsis from 'react-native-animated-ellipsis';
const App = (props) => {
let ScreenHeight = Dimensions.get("window").height;

// styles
  // componentDidMount() {
  //   this.animation.play();
  //   // Or set a specific startFrame and endFrame with:
  //   // this.animation.play(30, 120);
  // }
  React.useEffect(() => {
    if(height>700){
    this.animation.play();
    }
  }, [])
  const resetAnimation = () => {
    this.animation.reset();
    this.animation.play();
  };
  const animationre = () => {
    if(height>700){
      return(
    <LottieView
    ref={animation => {
      this.animation = animation;
    }}
    style={{
      width: height/2.2,
      height: height/2.2,
      backgroundColor: 'black',
      alignSelf:'center'
    }}
    source={require('../assets/hello.json')}
    // OR find more Lottie files @ https://lottiefiles.com/featured
    // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
  />
      )}
  }
  // render() {
    return (
      <View style={styles.animationContainer}>
        <Text style={{color:'white',fontSize:20, fontFamily:'Headings'}}>{"\n"}{"\n"}{"\n"}Loading the article</Text>
        <AnimatedEllipsis numberOfDots={4} />
        {animationre()}
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