import React, { Component } from 'react'
import { View, TouchableOpacity, Button } from 'react-native'
import LoginForm from './loginForm/LoginForm'
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { loginUserSagaAction } from '../../../state/actions/sagas';
import { selectUserLogInisWaiting, isUserVerified } from '../../../state/selectors/Authentication/LoginSelectors';
import ModalScreen from '../../../commonElements/Modal/Modal';
import { showModalAction } from '../../../state/actions/ModalActions/modalActions';
import SignupScreen from '../../../screens/authentication/signup/Signup'

const mapStateToProps = state => {
  return {
    username: state.newUserName,
    password: state.newPassword,
    isWaiting: selectUserLogInisWaiting(state),
    isVerified: isUserVerified(state)
  }
};

const mapDispatchToProps = {
  loginUserAction: loginUserSagaAction,
  showModalAction,
};

export class LoginScreen extends Component {
state = {
  children: false
}

render() {
  const { loginUserAction, navigation, isWaiting } = this.props;
    return (
      <View>
      <ModalScreen />
        <LoginForm
          // username='SomeName'
          isWaiting={ isWaiting }
          onLoginPress={ () => loginUserAction({ username: 'edbraouf@gmail.com', password: 'Allahis1' }) }
          footer={
            <TouchableOpacity>
              <Button title='Become a Player >' onPress={ () => navigation.navigate('Signup') }></Button>
            </TouchableOpacity>
          }
          showModal={ () => this.props.showModalAction(<SignupScreen />) }
        />

      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(LoginScreen));
