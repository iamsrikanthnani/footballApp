import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Field, reduxForm } from 'redux-form';

const submit = values => {
  console.log('submitting form', values)
}

const renderInput = ({ input: { onChange, ...restInput }}) => {
  return <TextInput onChangeText={onChange} {...restInput} />
}

const Form = props => {
  const { handleSubmit } = props

  return (
    <View >
      <Text>Email:</Text>
      <Field name="email" component={renderInput} />
      <TouchableOpacity onPress={handleSubmit(submit)}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

export default reduxForm({
  form: 'test'
})(Form)