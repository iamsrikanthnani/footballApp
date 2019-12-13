import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native'
import { Field, reset, reduxForm } from 'redux-form';

const userNameRenderInput = ({input: { onChange }}) => {
  return <TextInput
            onChangeText={onChange}
            placeholder='example@email.com'
            autoCapitalize='none'
            keyboardType='email-address'
            // keyboardType='numeric'
            //  {...restInput}
          />
        };

  const passwordRenderInput = ({input: { onChange }}) => {
    return <TextInput
              onChangeText={onChange}
              placeholder='Password'
              autoCapitalize='none'
              secureTextEntry
              //  {...restInput}
            />
  };


const ForgotPasswordForm = props => {
  const { footer } = props;
  return (
    <View>

        <Field
          name='usernameForgotPassword'
          component={ userNameRenderInput }
          // validate={ required }
        />

        <View>
          <TouchableOpacity>
            <Button title='Recover password' onPress={ props.handleForgotPassword } />
          </TouchableOpacity>
        </View>

    </View>
  )
}

export default reduxForm({
  form: 'forgotPasswordForm'
})(ForgotPasswordForm);
