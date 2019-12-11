import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Field, reduxForm } from 'redux-form';

const renderInput = ({ input: { onChange, ...restInput }}) => {
  return<TextInput
            onChangeText={onChange}
            // {...restInput}
          />
}

const Form = props => {
  const { handleSubmit } = props

  return (
    <View>
      <Text>Email:</Text>
      <Field name="userConfirmation" component={renderInput} />
      <TouchableOpacity onPress={ handleSubmit}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

export default reduxForm({
  form: 'userConfirmation'
})(Form);
