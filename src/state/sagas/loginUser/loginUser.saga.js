import { call, put, takeLatest } from 'redux-saga/effects';
import { loginUserSagaType } from '../../types/sagas';
import { loginUserRequestActions } from '../../actions/requests/loginUser/getLoginUser.actions';
import { loginUserRequest } from '../../../services/loginUser/loginUser.service';
// import { getUserCredentials } from '../../../services/authentication/userCredentials';
// import { LOGIN_USER_TYPE } from '../../../normalState/types/types';
import { LoginInUser } from '../../../components/authentication/Login/Login';
import navigationServices from '../../../navigation/navigationServices';
import navigationActions from '../../../navigation/navigationActions';
import { loginCredentialsAction } from '../../actions/Authentication/Login/LoginCredentials';
import { Auth } from '../../../../node_modules/aws-amplify';


export default function* loginUserWatcherSaga() {
  yield takeLatest(loginUserSagaType, loginUserWorkerSaga);
}


export function* loginUserWorkerSaga() {

   yield put(loginUserRequestActions.start());
  //  yield put({ type: 'LOGIN_REQUESTING'})
    // const userCredentials = yield call(getUserCredentials);
    // console.log('Started!!!');
   try {
    const loginData = yield call(LoginInUser, 'edbraouf@gmail.com', 'Allahis1');
    // yield call(Auth.signIn, 'edbraouf@gmail.com', 'Allahis1');
    // const loginData = yield call(returnObj);
    yield console.log('Succeeded');
  
    // yield put(navigationActions.navigate({ routeName: 'Profile' }))
    // yield put(navigationActions.navigate({ routeName: 'Signup'  }));
    // yield put(navigationActions.navigate({ routeName: 'Profile' }));
    //  yield put(loginCredentialsAction({ name: 'Ahmed TEST' }));
    yield put(loginUserRequestActions.succeed(loginData));
    // yield put(navigationActions.navigate({ routeName: 'Profile' }));
    // yield call(navigationServices.navigate({ routeName: 'Profile' }));
    
    //  yield put({type: 'LOGIN_SUCCESS', info:{ nanme:'ahmed', age: 29, }})
     
   } catch (error) {
    console.log('Failed');
     yield put(loginUserRequestActions.fail(error));
   }
}




// function* loginSaga(email, password) {
//   try {
//     const data = yield call(Auth.signIn, email, password);
//     yield put(loginSuccess(data));
//   }
//   catch(error) {
//     yield put(loginFailure(error));
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
//     type: actions.AUTH_SET_STATE,
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

//     if (code) {
//       yield call(auth.confirmation, username, code)
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
//   yield takeLatest(actions.AUTH_INIT, init)
//   yield takeLatest(actions.AUTH_GET_USER, getUser)
//   yield takeLatest(actions.AUTH_SIGN_UP, signUp)
//   yield takeLatest(actions.AUTH_SIGN_IN, signIn)
//   yield takeLatest(actions.AUTH_SIGN_OUT, signOut)
//   yield takeLatest(actions.AUTH_FORGOT_PASSWORD, forgotPassword)
//   yield takeLatest(actions.AUTH_CHANGE_PASSWORD, changePassword)
//   yield takeLatest(actions.AUTH_COMPLETE_NEW_PASSWORD, completeNewPassword)
// }