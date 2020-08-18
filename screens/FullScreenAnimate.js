import React from 'react';
import { Button, StyleSheet, View, Dimensions } from 'react-native';
import LottieView from "lottie-react-native";
const FS = () => {
  let ScreenHeight = Dimensions.get("window").height;
  // componentDidMount() {
  //   this.animation.play();
  //   // Or set a specific startFrame and endFrame with:
  //   // this.animation.play(30, 120);
  // }
  React.useEffect(() => {
    this.animation.play();
  }, [])
  const resetAnimation = () => {
    this.animation.reset();
    this.animation.play();
  };
  // render() {
    return (
      <View style={styles.animationContainer}>
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          style={{
            height: ScreenHeight,
            backgroundColor: 'black',
            flexGrow: 1
          }}
          resizeMode='cover'
          source={require('../assets/complete.json')}
          // OR find more Lottie files @ https://lottiefiles.com/featured
          // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        />
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
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
    marginBottom: 100
  },
});
export default FS;