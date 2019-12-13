import React from 'react';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { loginUserSagaType, loginUserSagaRequestingType, } from '../../../types/sagas';
import NavigationServices from '../../../../navigation/navigationServices';
import { isUserHasIDToken, isUserHasAccessToken } from '../../../selectors/Authentication/LoginSelectors/LoginSelectors';
import { showModalAction } from '../../../actions/ModalActions/modalActions';
import { loginUserService } from '../../../../services/authentication/index';
import { loginSuccessType } from '../../../types/Authentication/Login/LoginTypes';
import { genericRequestingAction, genericSuccessAction, genericFailAction } from '../../../actions/genericActions/Generic.actions';


export default function* loginUserWatcherSaga() {
  yield takeLatest(loginUserSagaType, loginUserSagaWorker);
  // yield takeLatest(signUpUserSagaType, signUpUserSagaWorker);
}

export function* loginUserSagaWorker({payload}) {
  
  yield put({type: loginUserSagaRequestingType});

   try {
    
    // loginUserService comes loaded with signInUserSession
    const loginSuccessData = yield call(loginUserService, payload.username, payload.password);
    // yield console.log('loginSuccessData', loginSuccessData);
    // yield put({type: loginSuccessType, payload: loginSuccessData });

    
    const userIDToken = yield select(isUserHasIDToken);
    const userAccessToken = yield select(isUserHasAccessToken);
    // yield console.log('Checking if verified: ', isVerified);

    if(userIDToken && userAccessToken) {
      // Incase user didn't finish the profile setup [name, experience, bio, etc..], then i will add more logic in here //
      // yield put(showModalAction(<Profile />))
      yield call(NavigationServices.navigate, 'Profile');
    } 
   } catch (error) {
    console.log('LoginUser Failed', error);

    if (error.code === 'UserNotConfirmedException') {
      // We can re-send confirmation code incase user didntn't finish the initial email confirmation //

      console.log('UserNotConfirmedException');
  } else if (error.code === 'PasswordResetRequiredException') {
      console.log('PasswordResetRequiredException');
      // The error happens when the password is reset in the Cognito console
      // In this case you need to call forgotPassword to reset the password
  } else if (error.code === 'NotAuthorizedException') {
      console.log('NotAuthorizedException');
      // The error happens when the incorrect password is provided
  } else if (error.code === 'UserNotFoundException') {
    console.log('UserNotFoundException');
      // The error happens when the supplied username/email does not exist in the Cognito user pool
  } else {
      console.log(error);
  }
    yield put({ type: 'LOGIN_FAIL', payload: error });
   }
}

