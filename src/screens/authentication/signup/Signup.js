import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Button, TextInput } from 'react-native';
import { connect } from 'react-redux'
import SignupForm from './signupform/SignupForm'
import { signupUserSagaAction } from '../../../state/actions/sagas';

const mapStateToProps = state => ({

});

const mapDispatchToProps = {
  signUpUser: signupUserSagaAction,
};

class Signup extends Component {
  // navigateToProfileScreen = () => this.props.navigation.navigate('Profile')
  
  render() {
    // const { signUpUser } = this.props;
    return (
        <SignupForm signupUser={ () => this.props.signUpUser({username: 'ahmedbas1990@gmail.com', password: 'Allahis1'}) } />   
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
