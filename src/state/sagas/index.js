import { all } from 'redux-saga/effects';
import loginUserSaga from './loginUser/loginUser.saga';
import getProfileInfoSaga from './getProfileInfo/getProfileInfo.saga';

export default function* rootSaga() {
  yield all([
    loginUserSaga(),
    getProfileInfoSaga(),
  ]);
}
