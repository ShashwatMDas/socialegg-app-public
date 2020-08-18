import React from "react";
import PropTypes from "prop-types";
import { Text, View, Image } from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import styles from "./Logo.style";

const Logo = props => {
  const { logoText, logoComponent } = props;
  return (
    <View style={styles.container}>
      {logoComponent || (
        <View style={styles.row}>
          <Text style={{fontSize: 30, color: "white", fontFamily:'Headings'}}>{logoText}</Text>
          <View style={styles.iconStyle}>
            <Image
              width={30}
              source={require('../../../../../assets/logo.png')}
              {...props}
            />
          </View>
        </View>
      )}
    </View>
  );
};

Logo.propTypes = {
  logoText: PropTypes.string
};

Logo.defaultProps = {
  logoText: "GITHUB"
};

export default Logo;
