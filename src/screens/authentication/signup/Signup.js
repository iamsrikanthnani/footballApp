import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form/immutable';
import SignupForm from './signupForm/signupForm'
import { signupUserSagaAction } from '../../../state/actions/sagas';

const mapStateToProps = state => {
  const signupFormValues = formValueSelector('signupForm', state => state.Forms);
  return {
    signupUserName: signupFormValues(state, 'signupUserName'),
    signupPassword: signupFormValues(state, 'signupPassword'),
    signupRepeatedPassword: signupFormValues(state, 'signupRepeatedPassword')
  }
};


const mapDispatchToProps = {
  signUpUser: signupUserSagaAction,
};

class Signup extends Component {
  
  // navigateToProfileScreen = () => this.props.navigation.navigate('Profile')

  handleSubmitSignUp = (userName, password, repeatedPassword) => {
    if (userName === '' || password === '' || repeatedPassword === '') {
      alert('Must enter value')
    } else if(password !== repeatedPassword){
      alert('Password not matched')
    } else {
      this.props.signUpUser({username: userName, password: password})
    }
  };
  
  render() {
    const { signupUserName, signupPassword, signupRepeatedPassword } = this.props;
    return (
        <SignupForm
          navigateToLogin={ () => this.props.navigation.pop() }
          submitSignUp={ () => this.handleSubmitSignUp(signupUserName, signupPassword, signupRepeatedPassword) }
        />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
