import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, Button } from 'react-native'
import styles from './Login.style'
import awsConfig from '../AWSconfiguration/awsConfig';
import { Auth } from 'aws-amplify'



export class Login extends Component {

  onClickSigIn = async ( { username, password } ) => {
    try {
      await Auth.signIn(username, password)
      console.log('sign in success!')
      // this.props.navigation.navigate('Profile')
    } catch (err) {
      console.log('error signing in..', err)
    }
  }

  render() {
    return (
      <View style={ styles.loginText }>
        <Text> Log in Screen </Text>
        <TextInput
        placeholder='User Name'
        autoCapitalize='none'
        />
        <TextInput
        placeholder='Password'
        secureTextEntry
        />
        <TouchableOpacity>
          <Button
            title='Log In'
            onPress={ () => this.props.navigation.navigate('Profile')
              // () => this.onClickSigIn({ username:'ahmedabd2018@gmail.com', password: 'Allahis1' })
            }
          />
        </TouchableOpacity>
      </View>
    )
  }
}

export default Login




// import React, { Component } from 'react';
// import { View } from 'react-native';
// import LoginForm from './LoginForm';
// import { Header, Button, Spinner } from '../../../components/common';


// export class Login extends Component {

//   state = { loggedIn: null };


//   renderContent() {
//     switch (this.state.loggedIn) {
//       case true:
//         return (
//           <Button onPress={() => console.log('Clicked')}>
//             Log Out
//           </Button>
//         );
//       case false:
//         return <LoginForm />;
//       default:
//         return <Spinner size="large" />;
//     }
//   }

//   render() {
//     return (
//     <View>
//       <Header headerText="Log In" />
//       {/* {this.renderContent()} */}
//     </View>
//     );
//   }
// }

// export default Login;
