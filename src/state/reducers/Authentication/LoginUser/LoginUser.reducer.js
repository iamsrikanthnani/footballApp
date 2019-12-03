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

const initialState = {  
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
}

const reducer = function loginReducer (state = initialState, action) {  
  switch (action.type) {
    // Set the requesting flag and append a message to be shown
    case 'LOGIN_REQUESTING':
      return {
        requesting: true,
        successful: false,
        messages: [{ body: 'Logging in...', time: new Date() }],
        errors: [],
        results: action.payload
      }

    // Successful?  Reset the login state.
    case 'LOGIN_SUCCESS':
      return {
        errors: [],
        messages: [],
        requesting: false,
        successful: true,
        results: action.info
      }

    // Append the error returned from our api
    // set the success and requesting flags to false
    case 'LOGIN_ERROR':
      return {
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
        messages: [],
        requesting: false,
        successful: false,
      }

    default:
      return state
  }
}

export default reducer  