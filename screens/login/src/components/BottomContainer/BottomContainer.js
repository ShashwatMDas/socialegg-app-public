import React from "react";
import PropTypes from "prop-types";
import { Switch, Text, View, TouchableOpacity } from "react-native";
import Card from "../Card/Card";
import Icon from "react-native-dynamic-vector-icons";
import styles, { container } from "./BottomContainer.style";

const BottomContainer = props => {
  const {
    switchText,
    switchValue,
    disableSwitch,
    IconComponent,
    usernameTitle,
    passwordTitle,
    backgroundColor,
    switchTextStyle,
    onPressSettings,
    disableSettings,
    contentComponent,
    usernamePlaceholder,
    passwordPlaceholder,
    onSwitchValueChange,
    usernameOnChangeText,
    passwordOnChangeText,
    usernameIconComponent,
    passwordIconComponent,
    usernameTextInputValue,
    passwordTextInputValue,
    navigation
  } = props;
  return (
    <View style={container(backgroundColor)}>
      {contentComponent}
      <View style={styles.containerGlue}>
        <Card
          title='Facebook'
          value={'usernameTextInputValue'}
          placeholder={'Login With Facebook'}
          navigation={navigation}
        />
        <Card
          name="key"
          secureTextEntry
          type="FontAwesome"
          title='Google'
          value={passwordTextInputValue}
          placeholder={'Login With Google'}
          navigation={navigation}
        />
      </View>
    </View>
  );
};

BottomContainer.propTypes = {
  switchText: PropTypes.string,
  disableSwitch: PropTypes.bool,
  passwordTitle: PropTypes.string,
  usernameTitle: PropTypes.string,
  disableSettings: PropTypes.bool,
  backgroundColor: PropTypes.string,
  usernamePlaceholder: PropTypes.string,
  passwordPlaceholder: PropTypes.string
};

BottomContainer.defaultProps = {
  IconComponent: Icon,
  disableSwitch: false,
  disableSettings: false,
  usernameTitle: "Username",
  passwordTitle: "Password",
  switchText: "Remember me",
  usernamePlaceholder: "Username",
  passwordPlaceholder: "Password",
  backgroundColor: "rgba(255,255,255,0.45)"
};

export default BottomContainer;
