import React from 'react'
import { Text, View, TextInput, TouchableOpacity, Button } from 'react-native'
import styles from './SignupForm.style';
import { Field, reduxForm } from 'redux-form';


const renderSignupEmail = ({input: { onChange }}) => {
return <TextInput
        onChangeText={onChange}
        placeholder='user name'
        autoCapitalize='none'
        //  {...restInput}
    />  
}

const renderSignupPassword = ({input: { onChange }}) => {
  return <TextInput
          onChangeText={onChange}
          placeholder='Password'
          autoCapitalize='none'
          secureTextEntry
          //  {...restInput}
      />  
  }

  const renderSignupRepeatedPassword = ({input: { onChange }}) => {
    return <TextInput
            onChangeText={onChange}
            placeholder='Repeat Password'
            autoCapitalize='none'
            secureTextEntry
            //  {...restInput}
        />  
    }

const SignupForm = (props) => {
  const { submitSignUp, navigateToLogin } = props;
  return (
    <View
      style={styles.container}>
        <View style={ styles.form } >
        <Text> Sign up screen </Text>

        <View>
          <Field
            name='signupUserName'
            component={renderSignupEmail}
          />

          <Field
            name='signupPassword'
            component={renderSignupPassword}
          />

          <Field
            name='signupRepeatedPassword'
            component={renderSignupRepeatedPassword}
          />

        </View>

        <TouchableOpacity>
          <Button
            title='Create my account'
            onPress={ submitSignUp }
          />
        </TouchableOpacity>        

        <TouchableOpacity>
          <Button
            title='< Back to Login'
            onPress={ navigateToLogin }
          />
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default reduxForm({
  form: 'signupForm'
})(SignupForm);
