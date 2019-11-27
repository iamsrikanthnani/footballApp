import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Text, View, TextInput, TouchableOpacity, Button } from 'react-native'
import styles from './LoginForm.style'
import { loginUserRequestActions } from '../../../../state/actions/requests/loginUser/getLoginUser.actions';
import { loginUserSagaAction } from '../../../../state/actions/sagas';


const mapStateToProps = state => {
  return {
    // username: state.userName,
    username: state.login.newUserName,
    password: state.login.newPassword
  }
};

const mapDispatchToProps = {
  onLoginloginUserAction: loginUserSagaAction
  // onLoginloginUserAction: loginUserSagaAction
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
            this.props.onLoginloginUserAction({ userName: 'edbraouf@gmail.com', password: 'Allahis1'})
            }
          />
        </TouchableOpacity>
        <Text> {this.props.username} </Text>
        <Text> {this.props.password} </Text>
        
        { this.props.footer }
        </View>
      </View>
    ) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
