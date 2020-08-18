import React from 'react';
import { Button, StyleSheet, View, Dimensions,AppState } from 'react-native';
import LottieView from "lottie-react-native";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
const App = (props) => {
  let ScreenHeight = Dimensions.get("window").height;
  const [state,setstate] = React.useState({
    appState: null,
  })
  let animation = null; //React.createRef();
  let timeOutId = null;
  React.useEffect(() => {
    if (!animation || !animation.play)
            return;

        if (timeOutId)
            clearTimeout(timeOutId);

        timeOutId = setTimeout(() => {
            if (animation)
                animation.play();
        }, 1700);

        const playAnimation = props.nav.addListener('change', () => {
            if (animation)
                animation.play();
        });

        return () => playAnimation.remove();
  }, [])


  // render() {
    return (
      <View style={styles.animationContainer}>
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          style={{
            width: 200,
            height: 200,
            backgroundColor: 'black',
          }}
          autoPlay={true}
          loop={true}
          source={require('../assets/dog.json')}
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
export default App;