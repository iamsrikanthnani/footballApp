import { userSessionType, loginSuccessType } from "../../../types/Authentication/Login/LoginTypes";
import { loginUserSagaRequestingType } from "../../../types/sagas";

const loginInitialState = {  
  isRequesting: null,
  error: null,
  isUserSignedIn: null,
  login_Result: null,
  timestamp: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
}

export const loginUserReducer = (state = loginInitialState, action) => {  
  const { type, payload } = action;
  switch (type) {
    // Set the isRequesting flag and append a message to be shown
    case loginUserSagaRequestingType:
      return {
        ...state,
        isRequesting: true,
        error: null,
        isUserSignedIn: null,
        login_Result: null,
      }

    // Successful?  Reset the login state.
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        error: null,
        isRequesting: false,
        isUserSignedIn: true,
        login_Result: payload
      }

      case userSessionType:
        return {
        ...state,
        error: null,
        isRequesting: false,
        isCurrentAuthenticationSuccessful: true,
        CurrentUser_Session_Result: payload
      }

    case 'LOGIN_FAIL':
      return {
        ...state,
        error: payload,
        isRequesting: false,
        isLoginSuccessful: false,
      }
    default:
      return state
  }
};
