import React, { Component } from 'react'
import _ from 'lodash';
import { View, TouchableOpacity, Button, Text } from 'react-native'
import LoginForm from './loginForm/LoginForm'
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { loginUserSagaAction } from '../../../state/actions/sagas';
import { selectUserLogInisRequesting, loginErrorMessage } from '../../../state/selectors/Authentication/LoginSelectors';
import ModalScreen from '../../../commonElements/Modal/Modal';
import { showModalAction } from '../../../state/actions/ModalActions/modalActions';
import SignupScreen from '../../../screens/authentication/signup/Signup'
import { formValueSelector } from 'redux-form/immutable';

const mapStateToProps = state => {
  const formState = formValueSelector('loginFormName', state => state.Forms)
  return {
    isLoggingInPending: selectUserLogInisRequesting(state),
    loginFormValue: formState(state, 'loginEmail'),
    passwordFormValue: formState(state, 'loginPassword'),
    loginErrorMessage: loginErrorMessage(state),
  }
}

const mapDispatchToProps = {
  loginUserAction: loginUserSagaAction,
  showModalAction,
};

export class LoginScreenForm extends Component {

  handleNavigation = ()  => this.props.navigation.navigate('Signup');

  handleLogInSubmit = () => {
    const userNameValueFromState = this.props.loginFormValue;
    const passwordValueFromState = this.props.passwordFormValue;
    
    this.props.loginUserAction({ username: userNameValueFromState, password: passwordValueFromState })
  }

render() {
  const { isLoggingInPending } = this.props;

    return (
      <View>
      <ModalScreen />
        
        <LoginForm
          handleSubmit={ this.handleLogInSubmit }
          loginPending={ isLoggingInPending }
          // showModal={ () => this.props.showModalAction(<SignupScreen />) }
          loginError={ this.props.loginErrorMessage }
        />

        <TouchableOpacity>
          <Button title='Become a Player >' onPress={ this.handleNavigation }></Button>
        </TouchableOpacity>

      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(LoginScreenForm));
