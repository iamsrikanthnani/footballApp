import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, Button } from 'react-native'
import styles from './SignUp.style';
import awsCofifg from '../AWSconfiguration/awsConfig';
import { Auth } from 'aws-amplify'

 const onClickSignUp = async ({ username, password, email }) => {
  try {
    await Auth.signUp({
      username, password, attributes: { email }
    })
    console.log('sign up success!')
    // updateFormType('confirmSignUp')
  } catch (err) {
    console.log('error signing up..', err)
  }
}

async function onClickConfirmSignUp({ username, confirmationCode }) {
  try {
    await Auth.confirmSignUp(username, confirmationCode)
    console.log('confirm sign up success!')
    // updateFormType('signIn')
  } catch (err) {
    console.log('error signing up..', err)
  }
}

// const onClickConfirmSignUp = ({ username, confirmationCode }) => {
//   Auth.confirmSignUp('ahmedbas1990@gmail.com', '582442')
// };

export class Signup extends Component {
  render() {
    return (
      <View style={ styles.signUpText } >
        <Text> Sign up screen </Text>
        <TextInput
        placeholder='User Name'
        autoCapitalize='none'
        autoCompleteType='off'
        />
        <TextInput
        placeholder='Password'
        autoCapitalize='none'
        autoCompleteType='off'
        secureTextEntry
        />
        <TextInput
        placeholder='Repeat password'
        autoCapitalize='none'
        autoCompleteType='off'
        secureTextEntry
        />
        <TouchableOpacity>
          <Button
            title='Sign up as new user'
            onPress={ () => onClickSignUp({ username: 'ahmedbas1990@gmail.com', password:'Allahis1', email:'ahmedbas1990@gmail.com' }) }
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Button
            title='Confirm user'
            onPress={ () => onClickConfirmSignUp({username: 'edbraouf@gmail.com', confirmationCode: '389501'}) }
          />
        </TouchableOpacity>
      </View>
    )
  }
}

export default Signup


// import React, { Component } from 'react';
// import { Text } from 'react-native';
// // import firebase from 'firebase';
// import { Button, Card, CardSection, Input, Spinner } from '../../common';
// // import firebaseConfig from '../../firebase/firebaseConfig';


// class SignUp extends Component {
//   state = { 
//     email: '',
//     password: '',
//     repeatedPassword: '',
//     error: '',
//     loading: false
//   };

//   onButtonPress() {
//     const { email, password } = this.state;

//     // this.setState({ error: '', loading: true });

//     // firebaseConfig.auth().signInWithEmailAndPassword(email, password)
//     //   .then(this.onLoginSuccess.bind(this))
//     //   .catch(() => {
//     //     firebaseConfig.auth().createUserWithEmailAndPassword(email, password)
//     //       .then(this.onLoginSuccess.bind(this))
//     //       .catch(this.onLoginFail.bind(this));
//     //   });
//   }

//   onLoginFail() {
//     // this.setState({ error: 'Authentication Failed', loading: false });
//   }

//   onLoginSuccess() {
//     /* this.setState({
//       email: '',
//       password: '',
//       loading: false,
//       error: ''
//     }); */
//   }

//   renderButton() {
//     if (this.state.loading) {
//       return <Spinner size="small" />;
//     }

//     return (
//       <Button onPress={this.onButtonPress.bind(this)}>
//         Log in
//       </Button>
//     );
//   }

//   render() {
//     return (
//       <Card>
//         <CardSection>
//           <Input
//             placeholder="user@gmail.com"
//             label="Email"
//             value={this.state.email}
//             onChangeText={() => console.log('object')}
//           />
//         </CardSection>

//         <CardSection>
//           <Input
//             secureTextEntry
//             placeholder="Password"
//             label="Password"
//             value={this.state.password}
//             onChangeText={ () => console.log('object')}
//           />
//         </CardSection>

//         <CardSection>
//           <Input
//             secureTextEntry
//             placeholder="Repeat password"
//             label="Password"
//             value={this.state.password}
//             onChangeText={() => console.log('object')}
//           />
//         </CardSection>

//         <Text style={styles.errorTextStyle}>
//           {this.state.error}
//         </Text>

//         <CardSection>
//           {this.renderButton()}
//         </CardSection>
//       </Card>
//     );
//   }
// }

// const styles = {
//   errorTextStyle: {
//     fontSize: 20,
//     alignSelf: 'center',
//     color: 'red'
//   }
// };

// export default SignUp;
