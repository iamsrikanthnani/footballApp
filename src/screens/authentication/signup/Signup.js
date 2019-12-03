import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Button, TextInput } from 'react-native';
import SignupForm from './signupform/SignupForm'

import awsConfig from '../../../AWSconfiguration/awsConfig'
import { Auth } from '../../../../node_modules/aws-amplify';

class Signup extends Component {
  /* static navigationOptions = {
    title: 'myHome',
  }; */


  state = {
    userInfo: {
      userName: "ahmedabd2018@gmail",
      confirmationCode: "295947",
      password: 'Allahis1',
      repeatedPassword: 'Allahis1'
    },
    isSignupSucceed: false,
    shouldShowConfirmationStep: false,
    isSignupConfirmed:  false,
  }

  onClickSignUp = async (username, password,) => {
    try {
      await Auth.signUp({
      username, password,
    })
    console.log('sign up success!');
    alert('Signed up');
    this.setState({ isSignupSucceed: true, shouldShowConfirmationStep: true });
    // updateFormType('confirmSignUp');
  } catch (err) {
    console.log('error signing up..', err)
  }
}

 onConfirmSignupPress = async () => {
   const { userName, confirmationCode } = this.state.userInfo
  try {
    
    await Auth.confirmSignUp('edbraouf@gmail.com', '094962');
    console.log('confirm sign up success!');
    alert('Confirmation succeed');
    this.setState({ isSignupConfirmed: true });
    this.naviagteToProfileScreen()
    // updateFormType('signIn');
  } catch (err) {
    console.log('error signing up..', err)
    this.setState({ isSignupConfirmed: false });
  }
};


  SignUpConfirmation = () => {
  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        // onChangeText={text => onChangeText(text)}
        value='Some Val'
      />
      <TouchableOpacity>
        <Button title='Confirm' onPress={ this.onConfirmSignupPress } />
      </TouchableOpacity>
    </View>
  )
    
  }

  naviagteToProfileScreen = () => this.props.navigation.navigate('Profile')

  // To be add at on sign up stage
  // this.onClickSignUp(userName, password)

  render() {
    const { userName, password } = this.state.userInfo;
    const { isSignupSucceed, shouldShowConfirmationStep } = this.state;
    return (
        // isSignupSucceed && shouldShowConfirmationStep ? this.SignUpConfirmation() : <SignupForm onPressJoin={ () => this.onClickSignUp('edbraouf@gmail.com', 'Allahis1') } />
        this.SignUpConfirmation()
    )
  }
}

export default Signup
