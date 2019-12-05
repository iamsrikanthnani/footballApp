import { combineReducers } from 'redux';
import { loginUserReducer, signupUserReducer } from '../Authentication/LoginUser/LoginUser.reducer';

export default combineReducers({
  'logIn': loginUserReducer,
  'SignUp': signupUserReducer
});
