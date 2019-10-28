import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, Button } from 'react-native'
import styles from './Login.style'
import awsConfig from '../AWSconfiguration/awsConfig';
import { Auth } from 'aws-amplify'


// const onClickSignIn = () => {
//   Auth.signIn(someUsername, somePassword)
//   alert('Signed in')
// }

const onClickSigIn = async ( { username, password } ) => {
  try {
    await Auth.signIn(username, password)
    console.log('sign in success!')
  } catch (err) {
    console.log('error signing in..', err)
  }
}

export class Login extends Component {
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
            onPress={ () => 
              // Auth.signIn({userName:'ahmedabd2018@gmail.com', password: 'Allahis1' })
              onClickSigIn({ username:'ahmedabd2018@gmail.com', password: 'Allahis1' })
            }
          />
        </TouchableOpacity>

 {/*        <TouchableOpacity>
          <Button
            title='Confirm my account'
            onPress={ () => Auth.confirmSignUp('ahmedbad2018@gmail.com', '730339') }
          />
        </TouchableOpacity>

 */}

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
