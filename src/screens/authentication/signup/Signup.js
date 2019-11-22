import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Button, TextInput } from 'react-native';
import SignupForm from './signupform/SignupForm'

import awsConfig from '../../../AWSconfiguration/awsConfig'
import { Auth } from '../../../../node_modules/aws-amplify';

export class Signup extends Component {
  /* static navigationOptions = {
    title: 'myHome',
  }; */

  state = {
    userInfo: {
      userName: "ahmedabd2018@gmail",
      confirmationCode: "147972",
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
    
    await Auth.confirmSignUp('ahmedabd2018@gmail.com', '147972');
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
  // const userNAme = 'edbraouf@gmail';
  // const confirmationcode = '285141';
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
        isSignupSucceed && shouldShowConfirmationStep ? this.SignUpConfirmation() : <SignupForm onPressJoin={ () => this.onClickSignUp('ahmedabd2018@gmail.com', 'Allahis1') } />
        // this.SignUpConfirmation()
    )
  }
}

export default Signup
