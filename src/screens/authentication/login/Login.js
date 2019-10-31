import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, Button } from 'react-native'
import styles from './Login.style'
import awsConfig from '../AWSconfiguration/awsConfig';
import { Auth } from 'aws-amplify'



export class Login extends Component {

  onClickSigIn = async ( { username, password } ) => {
    try {
      await Auth.signIn(username, password)
      console.log('sign in success!')
      // this.props.navigation.navigate('Profile')
    } catch (err) {
      console.log('error signing in..', err)
    }
  }

  render() {
    return (
      <View style={ styles.loginText }>
        <Text> Log in Screen </Text>
        <TextInput
        placeholder='User Name'
        autoCapitalize='none'
        />
        <TextInput
        placeholder='Password'
        secureTextEntry
        />
        <TouchableOpacity>
          <Button
            title='Log In'
            onPress={ () => this.props.navigation.navigate('Profile')
            }
          />
        </TouchableOpacity>
      </View>
    )
  }
}

export default Login;
