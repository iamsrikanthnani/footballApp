
import React, { Component } from 'react';
import { View, TouchableOpacity, Button } from 'react-native';
import styles from './RenderAuthenticationScreens.style'
import LoginScreen from './login/Login'

class RenderAuthentication extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <LoginScreen />
      </View>
    );
  }
}

export default RenderAuthentication;
