import React, { Component } from 'react'
import _ from 'lodash';
import { View, TouchableOpacity, Button, Text } from 'react-native'
import LoginForm from './loginForm/LoginForm'
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { loginUserSagaAction } from '../../../state/actions/sagas/AuthenticationSagas/loginUserSaga/loginUserSagaAction';
import { forgotPasswordSagaAction } from '../../../state/actions/sagas/AuthenticationSagas/passwordRecovery/forgotPasswordSagaAction';

import { selectUserLogInisRequesting, loginErrorMessage } from '../../../state/selectors/Authentication/LoginSelectors/LoginSelectors';
import ModalScreen from '../../../commonElements/Modal/Modal';
import { showModalAction } from '../../../state/actions/ModalActions/modalActions';
import { formValueSelector } from 'redux-form/immutable';
import ForgotPasswordScreen from '../forgotPassword/ForgotPasswordScreen';
import Profile from '../../profile/Profile';

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
  forgotPasswordAction: forgotPasswordSagaAction,
  forgotPasswordShowModalAction: showModalAction,

};

export class LoginScreenForm extends Component {

  state = {
    loginErrorMessages: null,
    loginErrorCoRespond: null,
  };

  handleNavigation = ()  => this.props.navigation.navigate('Signup');

  loginErrorMessage = (username, password) =>
    (!username || !password
      ? this.setState({ loginErrorMessages: 'Please fill all required fields' })
      : this.setState({ loginErrorMessages: this.props.loginErrorMessage }));
  
    handleLogInSubmit = () => {
    const userNameValueFromState = this.props.loginFormValue;
    const passwordValueFromState = this.props.passwordFormValue;
    this.loginErrorMessage(userNameValueFromState, passwordValueFromState);
    this.props.loginUserAction({ username: userNameValueFromState, password: passwordValueFromState })
  }

  handleForgotPassword = () => {
    const credentials = { username: 'edbraouf@gmail.com', password: 'Allahis1' };
    this.props.forgotPasswordAction(credentials);
  }

  showModal = () => alert('s')
  // this.props.forgotPasswordShowModalAction(<Profile />);

render() {
  const { isLoggingInPending, loginErrorMessage, forgotPasswordShowModalAction } = this.props;
  this.props.loginFormValue;
this.props.passwordFormValue;

    return (
      <View>
      <ModalScreen />
        
        <LoginForm
          handleSubmit={ () => this.handleLogInSubmit(loginErrorMessage) }
          loginPending={ isLoggingInPending }
          // showModal={ () => this.props.showModalAction(<SignupScreen />) }
          loginError={ this.state.loginErrorMessages }
          errorCoRespond={this.state.loginErrorCoRespond}
        />

        <ForgotPasswordScreen />


        <TouchableOpacity>
          <Button title='Become a Player >' onPress={ this.handleNavigation }></Button>
        </TouchableOpacity>

      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(LoginScreenForm));
