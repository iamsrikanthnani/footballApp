import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import SignupForm from './signupform/SignupForm'

import awsConfig from '../../../AWSconfiguration/awsConfig'
import { Auth } from '../../../../node_modules/aws-amplify';

export class Signup extends Component {
  /* static navigationOptions = {
    title: 'myHome',
  }; */

  state = {
    userName: 'ahmedabd2018@gmail.com',
    password: 'Allahis1',
    repeatedPassword: 'Allahis1'
  }

  onClickSignUp = async (username, password,) => {

  try {
    await Auth.signUp({
      username, password,
    })
    console.log('sign up success!')
    // updateFormType('confirmSignUp')
  } catch (err) {
    console.log('error signing up..', err)
  }
}


  onPressJoinButton = () => {
    
    this.props.navigation.navigate('Profile')
  };
  render() {
    const { userName, password } = this.state 
    return (
        <SignupForm onPressJoin={ () => this.onClickSignUp(userName, password) } />
    )
  }
}

export default Signup
