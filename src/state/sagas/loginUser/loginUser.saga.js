import React from 'react';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { loginUserSagaType, } from '../../types/sagas';
// import { loginUserRequestActions } from '../../actions/requests/loginUser/getLoginUser.actions';
import NavigationServices from '../../../navigation/navigationServices';
import { isUserVerified } from '../../selectors/Authentication/LoginSelectors';
import { showModalAction } from '../../actions/ModalActions/modalActions';
import { loginUserService } from '../../../services/authentication/index';
import { loginSuccessType } from '../../types/Authentication/Login/LoginTypes';


export default function* loginUserWatcherSaga() {
  yield takeLatest(loginUserSagaType, loginUserSagaWorker);
  // yield takeLatest(signUpUserSagaType, signUpUserSagaWorker);
}

export function* loginUserSagaWorker({payload}) {

  yield put({ type: 'REQUESTING'});
   try {
    
    // loginUserService comes loaded with signInUserSession
    const loginSuccessData = yield call(loginUserService, payload.username, payload.password);
    yield console.log('loginSuccessData', loginSuccessData);
    yield put({type: loginSuccessType, payload: loginSuccessData });
    
    const isVerified = yield select(isUserVerified);
    yield console.log('Checking if verified: ', isVerified);

    if(isVerified) {
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
    yield put({ type: 'LOGIN_ERROR', payload: error })
   }
}


// export function* userConfirmationSagaWorker({payload}){
//   yield put({ type: 'REQUESTING' });
//     try {
//     const { username, code } = payload;
//       // if (code) {
//       const confirmationData = yield call(userConfirmationService, username, code);
//       console.log('Confirmed', confirmationData);
//       yield put({ type: 'USER_CONFIRMATION_SUCCESS', payload: confirmationData });
//     // }
//   } catch (error) {
//     console.log(error)
//     yield put({ type: 'USER_CONFIRMATION_ERROR', error })
//   }
// }



// import * as auth from 'aws-cognito-promises'

// import { call, put, takeLatest } from 'redux-saga/effects'
// import * as actions from './actions'
// import * as states from './states'

// // auth is stateless. Each call to a auth action resets all state
// let defaultState = {
//   info: {},
//   error: {},
//   isSignedIn: states.AUTH_UNKNOWN,
//   isConfirmed: states.AUTH_UNKNOWN,
//   hasSignedUp: states.AUTH_UNKNOWN,
//   hasSentCode: states.AUTH_UNKNOWN,
//   hasChangedPassword: states.AUTH_UNKNOWN,
//   passwordResetRequired: states.AUTH_UNKNOWN
// }

// function* init(action) {
//   yield put({
//     type: 'LOGIN_REQUESTING',
//     payload: {
//       ...defaultState
//     }
//   })
// }

// function* getUser() {
//   try {
//     let user = auth.config.getUser()
//     let session = yield call(auth.getSession)

//     yield put({
//       type: actions.AUTH_SET_STATE,
//       payload: {
//         ...defaultState,
//         isSignedIn: states.AUTH_SUCCESS,
//         isConfirmed: states.AUTH_SUCCESS,
//         info: { username: user.username, ...session }
//       }
//     });

//   } catch (e) {
//     yield put({
//       type: actions.AUTH_SET_STATE,
//       payload: {
//         ...defaultState,
//         isSignedIn: states.AUTH_FAIL,
//         error: e
//       }
//     })
//   }
// }




// function* signUp(action) {
//   try {
//     yield call(auth.register, action.payload.username, action.payload.password)

//     yield put({
//       type: actions.AUTH_SET_STATE,
//       payload: {
//         ...defaultState,
//         hasSignedUp: states.AUTH_SUCCESS
//       }
//     })



//   } catch (e) {
//     yield put({
//       type: actions.AUTH_SET_STATE,
//       payload: {
//         ...defaultState,
//         error: e
//       }
//     })
//   }
// }





// function* signOut() {
//   try {
//     yield call(auth.signOut)
//     yield put({
//       type: actions.AUTH_SET_STATE,
//       payload: { isSignedIn: states.AUTH_FAIL }
//     })
//   } catch (e) {
//     yield put({
//       type: actions.AUTH_SET_STATE,
//       payload: { error: e, isSignedIn: states.AUTH_FAIL }
//     })
//   }
// }

//   try {
//     const { username, password, code } = action.payload
// 
//const onfirmationData = c     if (code) {
  /* yield put({ type: 'USER_CONFIRMATION' })

      yield call(auth.confirmation, username, code) */
//     }

    
    
    
//     yield call(auth.signIn, username, password)
//     let user = auth.config.getUser()
//     let session = yield call(auth.getSession)


    
//     yield put({
//       type: actions.AUTH_SET_STATE,
//       payload: {
//         isSignedIn: states.AUTH_SUCCESS,
//         isConfirmed: states.AUTH_SUCCESS,
//         info: { username: user.username, ...session }
//       }
//     })
//   } catch (e) {
//     if (e.code === 'UserNotConfirmedException') {
//       yield put({
//         type: actions.AUTH_SET_STATE,
//         payload: { isConfirmed: states.AUTH_FAIL, error: e }
//       })
//     } else if (e.code === 'PasswordResetRequiredException') {
//       yield put({
//         type: actions.AUTH_SET_STATE,
//         payload: { passwordResetRequired: states.AUTH_SUCCESS, error: e }
//       })
//     } else {
//       yield put({
//         type: actions.AUTH_SET_STATE,
//         payload: { isConfirmed: states.AUTH_SUCCESS, error: e }
//       })
//     }
//   }
// }

// function* forgotPassword(action) {
//   try {
//     const { username } = action.payload
//     yield call(auth.forgotPassword, username)
//     yield put({
//       type: actions.AUTH_SET_STATE,
//       payload: {
//         ...defaultState,
//         hasSentCode: states.AUTH_SUCCESS
//       }
//     })
//   } catch (e) {
//     yield put({
//       type: actions.AUTH_SET_STATE,
//       payload: {
//         ...defaultState,
//         error: e,
//         isSignedIn: states.AUTH_FAIL
//       }
//     })
//   }
// }

// function* changePassword(action) {
//   try {
//     const { username, code, password } = action.payload
//     yield call(auth.changePassword, username, code, password)
//     yield put({
//       type: actions.AUTH_SET_STATE,
//       payload: {
//         ...defaultState,
//         hasChangedPassword: states.AUTH_SUCCESS
//       }
//     })
//   } catch (e) {
//     yield put({
//       type: actions.AUTH_SET_STATE,
//       payload: {
//         ...defaultState,
//         error: e,
//         isSignedIn: states.AUTH_FAIL
//       }
//     })
//   }
// }

// function* completeNewPassword(action) {
//   try {
//     const { username, password } = action.payload
//     yield call(auth.completeNewPassword, username, password)
//     yield put({
//       type: actions.AUTH_SET_STATE,
//       payload: {
//         ...defaultState,
//         hasChangedPassword: states.AUTH_SUCCESS
//       }
//     })
//   } catch (e) {
//     yield put({
//       type: actions.AUTH_SET_STATE,
//       payload: {
//         ...defaultState,
//         error: e,
//         isSignedIn: states.AUTH_FAIL
//       }
//     })
//   }
// }

// export default function* sagas() {
//   yield takeLatest('LOGIN_REQUESTING', init)
  // yield takeLatest(actions.AUTH_GET_USER, getUser)
  // yield takeLatest(actions.AUTH_SIGN_UP, signUp)
  // yield takeLatest(actions.AUTH_SIGN_IN, signIn)
  // yield takeLatest(actions.AUTH_SIGN_OUT, signOut)
  // yield takeLatest(actions.AUTH_FORGOT_PASSWORD, forgotPassword)
  // yield takeLatest(actions.AUTH_CHANGE_PASSWORD, changePassword)
  // yield takeLatest(actions.AUTH_COMPLETE_NEW_PASSWORD, completeNewPassword)
// }
