import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, Button } from 'react-native'
import styles from './LoginForm.style'

export class LoginForm extends Component {

  state = {
    userName: 'edbraouf@gmail.com',
    password: 'Allahis1'
  }

  render() {
    const { onPressAction, footer, } = this.props;
    return (
      <View style={ styles.container }>
      <View style={ styles.form }>
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
            onPress={ onPressAction }
          />
        </TouchableOpacity>
        { footer }
        </View>
      </View>
    ) 
  }
}

export default LoginForm;
