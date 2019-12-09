import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import ConfirmUserForm from './ConfirmUserForm/ConfirmUserForm'
import { userConfirmationAction } from '../../../state/actions/sagas/AuthenticationSagas/authenticationSagaActions'


const mapDispatchToProps = {
  confirmUserAction: userConfirmationAction
};

export class ConfirmUser extends Component {
  render() {
    const { confirmUserAction } = this.props;

    return (
      <View>
        <ConfirmUserForm
          handleSubmit={ () => confirmUserAction({ username: 'edbraouf@gmail.com', code: '873034' }) }
        />
      </View>
    )
  }
}

export default connect(null, mapDispatchToProps)(ConfirmUser);
