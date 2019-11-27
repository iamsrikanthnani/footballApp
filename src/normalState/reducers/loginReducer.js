import { LOGIN_USER_TYPE } from "../types/types";

const initialState = {
  userName: 'tempUserName',
  password: 'TempPassword'
};

export const loginReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch(type) {
    case LOGIN_USER_TYPE: 
    // case 'TestTYpe': 
    return {
      // ...state.userName = action.payload.userNameValue,
      ...state,
      ...payload,
    };
    default:
      return state;
  }
};
