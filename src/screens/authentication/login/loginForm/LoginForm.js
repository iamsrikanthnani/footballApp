import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Button } from 'react-native'
import styles from './LoginForm.style'
import Profile from '../../../profile/Profile';

const state = {
  userName: '',
  password: 'Allahis1',
  placeName: '',
};

  /* placeNameChangeHandler = (value) => {
    this.setState({
      userName: value
    });
  } */

const LoginForm = props => {
  console.log(props);
  return (
    <View style={ styles.container }>
      <View style={ styles.form }>
        <Text> Log in Screen </Text>
        <TextInput
          autoCapitalize='none'
          placeholder = "User name"
          value = { state.placeName }
          // onChangeText = { placeNameChangeHandler }
        />
        <TextInput
          placeholder='Password'
          secureTextEntry
        />
        <TouchableOpacity>
          <Button
            title='Log In'
            onPress={ () => 
              props.onLoginPress()
            }
          />
        </TouchableOpacity>
        <Text> {props.username} </Text>
        <Text> {props.isWaiting && 'WAITING...'} </Text>

        <Button title='Test text' onPress={ props.showModal } />

        { props.footer }
        </View>
      </View>

  )
}

export default LoginForm

