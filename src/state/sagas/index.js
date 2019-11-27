import { all } from 'redux-saga/effects';
import loginUserSaga from './loginUser/loginUser.saga';

export default function* rootSaga() {
  yield all([
    loginUserSaga(),
  ]);
}
