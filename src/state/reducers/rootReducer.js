import { combineReducers } from 'redux'
import LogIn from '../../../src/state/reducers/requests'
// import UserLoginCredentials from './Authentication/LoginUser/LoginUser.reducer';
// if i want the isWaiting on the outside //
// import LogIn from '../reducers/requests/loginUser/loginUser.reducer'
import loginUser from '../reducers/Authentication/LoginUser/LoginUser.reducer'


export const rootReducer = combineReducers({
  Authentication: LogIn,
  
});
