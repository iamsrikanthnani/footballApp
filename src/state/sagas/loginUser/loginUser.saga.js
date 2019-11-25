import { call, put, takeLatest } from 'redux-saga/effects';
import { loginUserSagaType } from '../../types/sagas';
import { loginUserRequestActions } from '../../actions/requests/loginUser/getLoginUser.actions';
import { loginUserRequest } from '../../../services/loginUser/loginUser.service';
import { getUserCredentials } from '../../../services/authentication/userCredentials';

export default function* loginUserWatcherSaga() {
  yield takeLatest(loginUserSagaType, loginUserWorkerSaga);
}

export function* loginUserWorkerSaga({ payload }) {
  alert('Saga here')
  console.log('Saga here');
   yield put(loginUserRequestActions.start(payload));
    const userCredentials = yield call(getUserCredentials);
    console.log('Saga here');
   try {
      const result = yield call(loginUserRequest, userCredentials, payload);
      console.log('Saga here');
     yield put(loginUserRequestActions.succeed(result));
     console.log('Saga here');
   } catch (error) {
    console.log('Saga here');
     yield put(loginUserRequestActions.fail(error));
   }
}
