import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import LoginScreen from './login/Login';
import SignUpScreen from './signup/Signup';
import styles from './RenderAuthenticationScreens.style'

export class RenderAuthentication extends Component {
  state = {
    loginScreen: true,
  };
  
  toggleScreen = () => this.setState({ loginScreen: !this.state.loginScreen });
  determineScreenContent = () => (this.state.loginScreen ? <LoginScreen /> : <SignUpScreen />);

  render() {
    return (
      <View style={ styles.container }>
      { this.determineScreenContent() }
      
      <TouchableOpacity style={ styles.toggleScreensButton } >
        <Button
        title={ this.state.loginScreen ? 'Go to Sign Up Screen ' : 'Go to Log In' }
        onPress={ this.toggleScreen }
        />
      </TouchableOpacity>

      </View>
    );
  }
}

export default RenderAuthentication;
