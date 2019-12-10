import React, { Component } from 'react'
import _ from 'lodash';
import { View, TouchableOpacity, Button, Text } from 'react-native'
import LoginForm from './loginForm/LoginForm'
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { loginUserSagaAction } from '../../../state/actions/sagas';
import { selectUserLogInisWaiting, isUserVerified } from '../../../state/selectors/Authentication/LoginSelectors';
import ModalScreen from '../../../commonElements/Modal/Modal';
import { showModalAction } from '../../../state/actions/ModalActions/modalActions';
import SignupScreen from '../../../screens/authentication/signup/Signup'

import { Field, formValueSelector } from 'redux-form/immutable';

const mapStateToProps = state => {
  const formState = formValueSelector('loginFormName', state => state.Forms)
  
  console.log('formState...', formState)
  return {
    loginFormValue: formState(state, 'loginEmail'),
    passwordFormValue: formState(state, 'loginPassword')
  }
}

const mapDispatchToProps = {
  loginUserAction: loginUserSagaAction,
  showModalAction,
};

export class LoginScreenForm extends Component {

render() {
  const { loginUserAction, navigation, isWaiting, passwordFormValue, isVerified, loginFormValue } = this.props;
  console.log('loginFormValue, LoginScreen: ', this.props.loginFormValue);
    return (
      <View>
      <ModalScreen />
        
        <LoginForm
          // username='SomeName'
          // isWaiting={ isWaiting }
          handleSubmit={ () => loginUserAction({ username: 'edbraouf@gmail.com', password: 'Allahis1' }) }
          loginValue={ loginFormValue }
          passwordValue= { passwordFormValue }

          showModal={ () => this.props.showModalAction(<SignupScreen />) }
  
        />

        <TouchableOpacity>
          <Button title='Become a Player >' onPress={ () => navigation.navigate('Signup') }></Button>
        </TouchableOpacity>

      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(LoginScreenForm));
