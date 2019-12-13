import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux';
import ForgotPasswordForm from './ForgotPassword.form';
import { showModalAction } from '../../../state/actions/ModalActions/modalActions';
import { forgotPasswordSagaAction } from '../../../state/actions/sagas/AuthenticationSagas/passwordRecovery/forgotPasswordSagaAction';
import { formValueSelector } from 'redux-form/immutable';

const mapStateToProps = state => {
  const formState = formValueSelector('forgotPasswordForm', state => state.Forms)
  return {
  forgotPasswordUsername: formState(state, 'usernameForgotPassword')
  }
};

const mapDispatchToProps = {
  showModalForgotPassword: showModalAction,
  forgotPasswordAction: forgotPasswordSagaAction,
};

export class ForgotPasswordScreen extends Component {

  render() {
    const {
      showModalForgotPassword,
      forgotPasswordAction,
      forgotPasswordUsername
    } = this.props;
    console.log(forgotPasswordUsername);

    return (
      <View>
          <TouchableOpacity>
            <Button
              title='Forgot password'
              onPress={ () =>
                showModalForgotPassword(<ForgotPasswordForm
                  handleForgotPassword={ () => forgotPasswordAction({ relatedEmail: 'edbraouf@gmail.com' }) }
              />)
            }
          />
          </TouchableOpacity>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen);
