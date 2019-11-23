import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Text, View, TextInput, TouchableOpacity, Button } from 'react-native'
import styles from './LoginForm.style'
import { loginAction } from '../../../../STATE/actions/login';

const mapStateToProps = state => {
  return {
    // username: state.userName,
    username: state.login.userName,
    password: state.login.password
  }
};

const mapDispatchToProps = {
onLogin: loginAction
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
    const { onLogin, footer, } = this.props;
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
            onPress={ onLogin({ userName: 'UserNAMEis', password: 'Allahis1'} ) }
          />
        </TouchableOpacity>
        <Text> {this.props.username} </Text>
        <Text> {this.props.password} </Text>
        
        { footer }
        </View>
      </View>
    ) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
