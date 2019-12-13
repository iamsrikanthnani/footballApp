import { combineReducers } from 'redux';
import { loginUserReducer } from '../Authentication/LoginUser/LoginUser.reducer';
import { signupUserReducer } from '../Authentication/SignUp/SignUp.reducer';
import { forgotPasswordReducer } from '../Authentication/forgotPassword/forgotPassword.reducer';

export default combineReducers({
  'LogIn': loginUserReducer,
  'Signup': signupUserReducer,
  'PasswordRecovery': forgotPasswordReducer
});
