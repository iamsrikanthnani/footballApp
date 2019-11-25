import { combineReducers } from 'redux';
import loginUser from './loginUser/loginUser.reducer';
import getProfileInfo from './getProfileInfo/getProfileInfo.reducer';

export default combineReducers({
  loginUser,
  getProfileInfo,
});
