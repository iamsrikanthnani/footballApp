import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Text, View, TextInput, TouchableOpacity, Button } from 'react-native'
import styles from './LoginForm.style'
import { loginUserRequestActions } from '../../../../state/actions/requests/loginUser/getLoginUser.actions';
import { loginUserSagaAction } from '../../../../state/actions/sagas';


const mapStateToProps = state => {
  return {
    username: state.newUserName,
    password: state.newPassword,
    isWaiting: state.Authentication.loginUser.isWaiting,
  }
};

const mapDispatchToProps = {
  loginUserAction: loginUserSagaAction
};

export class LoginForm extends Component {

  state = {
    userName: '',
    password: 'Allahis1'
  };

  placeNameChangeHandler = (value) => {
    this.setState({
      userName: value
    });
  }


  onLoginPress = () => {
    this.props.loginUserAction({ userName: 'edbraouf@gmail.com', password: 'Allahis1'})
    // this.props.isUserVerified
    /* true && this.props.navigation.navigate('Profile') */
  }

  render() {
    // const { this.propsonLoginloginUserAction, footer, } = this.props;
    return (
      <View style={ styles.container }>
      <View style={ styles.form }>
        <Text> Log in Screen </Text>
        <TextInput
          // placeholder='User Name'
          // autoCapitalize='none'

          placeholder = "User name"
          // style = { styles.placeInput }
          value = { this.state.placeName }
          onChangeText = { this.placeNameChangeHandler }
        />
        <TextInput
          placeholder='Password'
          secureTextEntry
        />
        <TouchableOpacity>
          <Button
            title='Log In'
            onPress={ () => 
              this.onLoginPress()
            }
          />
        </TouchableOpacity>
        <Text> {this.props.username} </Text>
        <Text> {this.props.password} </Text>
        <Text> {this.props.isWaiting && 'WAITING...'} </Text>

        { this.props.footer }
        </View>
      </View>
    ) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
