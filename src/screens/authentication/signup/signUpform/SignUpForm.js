// import React, { Component } from './node_modules/react'
// import awsConfig from '../../../AWSconfiguration/awsConfig';
// import { Auth } from './node_modules/aws-amplify'

 /* const onClickSignUp = async ({ username, password, email }) => {
  try {
    await Auth.signUp({
      username, password, attributes: { email }
    })
    console.log('sign up success!')
    // updateFormType('confirmSignUp')
  } catch (err) {
    console.log('error signing up..', err)
  }
} */

// async function onClickConfirmSignUp({ username, confirmationCode }) {
//   try {
//     await Auth.confirmSignUp(username, confirmationCode)
//     console.log('confirm sign up success!')
//     // updateFormType('signIn')
//   } catch (err) {
//     console.log('error signing up..', err)
//   }
// }

// const onClickConfirmSignUp = ({ username, confirmationCode }) => {
//   Auth.confirmSignUp('ahmedbas1990@gmail.com', '582442')
// };


import React from 'react'
import { Text, View, TextInput, TouchableOpacity, Button } from 'react-native'
import styles from './SignupForm.style';

import awsConfig from '../../../../AWSconfiguration/awsConfig';
import { Auth } from '../../../../../node_modules/aws-amplify';

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
            onPress={ props.onPressJoin }
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

export default SignupForm
