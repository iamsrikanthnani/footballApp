import { combineReducers } from 'redux';
import loginUser from './loginUser/loginUser.reducer';
import userCredentials from '../../reducers/Authentication/LoginUser/LoginUser.reducer'

export default combineReducers({
  loginUser,
  userCredentials
});
