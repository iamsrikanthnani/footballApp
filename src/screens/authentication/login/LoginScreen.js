import React, { Component } from 'react'
import _ from 'lodash';
import { View, TouchableOpacity, Button, Text } from 'react-native'
import LoginForm from './loginForm/LoginForm'
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { loginUserAction } from '../../../state/actions/sagas';
import { selectUserLogInisRequesting, loginErrorMessage } from '../../../state/selectors/Authentication/LoginSelectors/LoginSelectors';
import ModalScreen from '../../../commonElements/Modal/Modal';
import { showModalAction } from '../../../state/actions/ModalActions/modalActions';
import SignupScreen from '../../../screens/authentication/signup/Signup'
import { formValueSelector } from 'redux-form/immutable';
import { loginUserSagaAction } from '../../../state/actions/sagas/AuthenticationSagas/loginUserSaga/loginUser.saga';


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

  state = {
    loginErrorMessages: null,
    loginErrorCoRespond: null,
  };

  handleNavigation = ()  => this.props.navigation.navigate('Signup');

  loginErrorMessage = (loginErrorMessage) =>
    (loginErrorMessage === `Cannot read property 'username' of undefined`
      ? this.setState({ loginErrorMessages: 'Please fill all required fields' })
      : this.setState({ loginErrorMessages: loginErrorMessage }));
  


    handleLogInSubmit = (loginErrorMessage) => {
    
    this.loginErrorMessage(loginErrorMessage)

    const userNameValueFromState = this.props.loginFormValue;
    const passwordValueFromState = this.props.passwordFormValue;
    
    this.props.loginUserAction({ username: userNameValueFromState, password: passwordValueFromState })
    
  }

render() {
  const { isLoggingInPending, loginErrorMessage } = this.props;

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

        <TouchableOpacity>
          <Button title='Become a Player >' onPress={ this.handleNavigation }></Button>
        </TouchableOpacity>

      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(LoginScreenForm));
