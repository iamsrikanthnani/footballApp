import React from 'react'
import { Text, View, TextInput, TouchableOpacity, Button } from 'react-native'
import styles from './SignupForm.style';

const SignupForm = (props) => {
  return (
    <View
      style={styles.container}>
        <View style={ styles.form } >
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
            title='Join'
            onPress={ props.signupUser }
          />
        </TouchableOpacity>


        {/* <TouchableOpacity>
          <Button
            title='< Back to Login'
            onPress={ props.navigateTo }
          />
        </TouchableOpacity> */}

        {/* <TouchableOpacity>
          <Button
            title='Confirm user'
            onPress={ () => onClickConfirmSignUp({username: 'edbraouf@gmail.com', confirmationCode: '389501'}) }
          />
        </TouchableOpacity> */}

      </View>
    </View>
  )
}

export default SignupForm;


// import React, { Component } from 'react'
// import { Text, View } from 'react-native'

// export class signupForm extends Component {
//   render() {
//     return (
//       <View>
//         <Text> textInComponent </Text>
//       </View>
//     )
//   }
// }

// export default signupForm;
