import { all } from 'redux-saga/effects';
import loginUserSaga from './loginUser/loginUser.saga';
import signUpUserSaga from './signUp/signUp.saga'


export default function* rootSaga() {
  yield all([
    loginUserSaga(),
    signUpUserSaga(),
  ]);
}
