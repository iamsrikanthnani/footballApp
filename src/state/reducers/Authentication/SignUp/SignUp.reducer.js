const signupInitialState = {  
  isRequesting: null,
  isSignUpSuccessful: null,
  error: null,
  isUserConfirmed: null,
  value: null,
  result: null,
  timestamp: new Date(),
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
        isSignUpSuccessful: true,
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
