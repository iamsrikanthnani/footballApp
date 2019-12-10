import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import styles from './LoginForm.style';
import { Field, reduxForm } from 'redux-form';

const submit = values => {
  console.log('submitting loginForm', values)
}

const renderInput = ({input: { onChange }}) => {
  return <TextInput
            onChangeText={onChange}
            placeholder='Type Here!'
            //  {...restInput}
          />
}

const LoginForm = props => {
  const { handleSubmit, formValue } = props;
  return (
    <View>
  
      <View>
        <Field
          name='loginEmail'
          component={ renderInput }
          // validate={ required }
          // keyboardType='numeric'
          placeHolder='User name'
        />

        <Field
          name='loginPassword'
          component={ renderInput }
          // validate={ required }
          // keyboardType='numeric'
          placeHolder='Password'
        />
      </View>
      
      <View>
          <TouchableOpacity>
            <Button title='Submit' onPress={ props.handleSubmit }/>
          </TouchableOpacity>
      </View>

      <Text>{ props.loginValue }</Text>
      <Text>{props.passwordValue}</Text>
    </View>
  )
}

export default reduxForm({
  form: 'loginFormName'
})(LoginForm)


