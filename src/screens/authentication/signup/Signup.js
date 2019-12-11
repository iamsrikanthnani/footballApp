import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Button, TextInput } from 'react-native';
import { connect } from 'react-redux'
import SignupForm from './signupForm/signupForm'
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
        <SignupForm
          navigateToLogin={ () => this.props.navigation.pop() } 
          submitSignUp={ () => this.props.signUpUser({username: 'edbraouf@gmail.com', password: 'Allahis1'}) }
        />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

// import React, { Component } from 'react';
// import { Text, View } from 'react-native';
// // import SignupForm from './signupForm/signupForm'


// export class Signup extends Component {
//   render() {
//     return (
//       <View>
//         <Text> textInComponent </Text>
//         {/* <SignupForm /> */}
//       </View>
//     )
//   }
// }

// export default Signup
