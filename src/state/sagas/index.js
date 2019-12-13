import { all } from 'redux-saga/effects';
import loginUserSaga from './authentication/loginUser/loginUser.saga';
import signUpUserSaga from './authentication/signUp/signUp.saga'
import forgotPasswordSaga from './authentication/forgotPassword/forgotPassword.saga'

export default function* rootSaga() {
  yield all([
    loginUserSaga(),
    forgotPasswordSaga(),
    signUpUserSaga(),
  ]);
}
