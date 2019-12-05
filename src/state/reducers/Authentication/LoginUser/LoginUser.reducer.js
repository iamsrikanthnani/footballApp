// // import { has } from 'lodash';
// import { loginCredentialsType } from '../../../types/Authentication/LoginScreen/LoginCredentials';

// const initialState = { isLoggedIn: false, name: '' }

// export default (state = initialState, action) => {
//   const { type, payload } = action;

//   if(type === loginCredentialsType){
//     return {
//       ...state,
//       ...payload
//     }
//   }
//   return state;
// };



// import {  
//   LOGIN_REQUESTING,
//   LOGIN_SUCCESS,
//   LOGIN_ERROR,
// } from './constants'


// export const getInitialState = () => ({
//   value: null,
//   error: null,
//   result: null,
//   timestamp: undefined,
// });

// export default actionTypeSet => (state = getInitialState(), action) => {
//   const { type, payload } = action;
//   switch (type) {
//     case actionTypeSet.Start: return {
//       value: payload,
//       error: null,
//       result: null,
//     };
//     case actionTypeSet.Fail: return {
//       ...state,
//       error: payload,
//       // leave value unmodified
//     };
//     case actionTypeSet.Succeed: return {
//       ...state,
//       error: null,
//       result: payload,
//       timestamp: Date.now(),
//       // leave value unmodified
//     };
//     case actionTypeSet.Reset:
//       return getInitialState();
//     default: return state;
//   }
// };











// Working login reducer //
const loginInitialState = {  
  isRequesting: null,
  isSuccessful: null,
  error: null,

  value: null,
  result: null,
  timestamp: new Date().toJSON().slice(0,10).replace(/-/g,'/'),

//   info: {},
//   error: {},
//   isSignedIn: states.AUTH_UNKNOWN,
//   isConfirmed: states.AUTH_UNKNOWN,
//   hasSignedUp: states.AUTH_UNKNOWN,
//   hasSentCode: states.AUTH_UNKNOWN,
//   hasChangedPassword: states.AUTH_UNKNOWN,
//   passwordResetRequired: states.AUTH_UNKNOWN
}

export const loginUserReducer = (state = loginInitialState, action) => {  
  const { type, payload } = action;
  switch (type) {
    // Set the isRequesting flag and append a message to be shown
    case 'LOGIN_REQUESTING':
      return {
        ...state,
        isRequesting: true,
      }

    // Successful?  Reset the login state.
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        error: null,
        isRequesting: false,
        isLoginSuccessful: true,
        result: payload
      }

    case 'LOGIN_ERROR':
      return {
        ...state,
        error: payload,
        isRequesting: false,
        isLoginSuccessful: false,
      }
    default:
      return state
  }
}

// export default TestReducer




const signupInitialState = {  
  isRequesting: null,
  isSuccessful: null,
  error: null,

  value: null,
  result: null,
  timestamp: new Date(),

  //   info: {},
//   error: {},
//   isSignedIn: states.AUTH_UNKNOWN,
//   isConfirmed: states.AUTH_UNKNOWN,
//   hasSignedUp: states.AUTH_UNKNOWN,
//   hasSentCode: states.AUTH_UNKNOWN,
//   hasChangedPassword: states.AUTH_UNKNOWN,
//   passwordResetRequired: states.AUTH_UNKNOWN
}

export const signupUserReducer = (state = signupInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    // Set the isRequesting flag and append a message to be shown
    case 'REQUESTING':
      return {
        ...state,
        isRequesting: true,
      }

    // Successful?  Reset the login state.
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        error: null,
        isRequesting: false,
        isSuccessful: true,
        result: payload
      }

    case 'SIGNUP_ERROR':
      return {
        ...state,
        error: payload,
        isRequesting: false,
        isSuccessful: false,
      }
    default:
      return state
  }
}

// export default TestReducer








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

// export default (state = defaultState, action) => {
//   const { type, payload } = action;
//   switch (type) {
//     case value:
      
//       break;
  
//     default:
//       break;
//   }

// };

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