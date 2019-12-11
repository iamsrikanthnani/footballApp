import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import styles from './LoginForm.style';
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
        }


const passwordRenderInput = ({input: { onChange }}) => {
  return <TextInput
            onChangeText={onChange}
            placeholder='Password'
            autoCapitalize='none'
            secureTextEntry
            //  {...restInput}
          />
}

const LoginForm = props => {
  const { handleSubmit, loginPending } = props;
  return (
    <View>
  
      <View>
        <Field
          name='loginEmail'
          component={ userNameRenderInput }
          // validate={ required }
        />

        <Field
          name='loginPassword'
          component={ passwordRenderInput }
          // validate={ required }
        />
      </View>
      
      <View>
          <TouchableOpacity>
            <Button title='Log In' onPress={ handleSubmit }/>
          </TouchableOpacity>
      </View>

      <Text> { props.loginError } </Text>

      {/* <View> */}
      <Text>{ (loginPending && 'Logging you In...') }</Text>
      {/* </View> */}

      {/* <Text onPress={props.showModal} >ShowModal</Text> */}


    </View>
  )
}


const afterSubmit = (result, dispatch) => dispatch(reset('loginFormName'));

export default reduxForm({
  form: 'loginFormName',
  onSubmitSuccess: afterSubmit,
 /*  destroyOnUnmount: true,
  enableReintialize: true,
  initialValues: {
    loginFormName: 'initialVAL',
  }, */
})(LoginForm)


