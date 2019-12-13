import { forgotPasswordSagaType } from "../../../types/sagas/forgotPasswordTypes/forgotPassword.Types";

const initialForgotPasswordState = {
  isRequesting: null,
  error: null,
  result: null
}

export const forgotPasswordReducer = (state = initialForgotPasswordState, action) => {
  const { type, payload } = action;
switch (type) {
  case 'REQUESTING':
    return {
      ...state,
      isRequesting: true,
  }
  case 'FORGOT_PASSWORD_SUCCESS':
    return {
      ...state,
      error: false,
      isRequesting: false,
      result: payload
    }
    case 'FORGOT_PASSWORD_FAIL':
      return {
        ...state,
        error: payload,
        result: null,
        isRequesting: false,
      }
  default: return state;
}
};

