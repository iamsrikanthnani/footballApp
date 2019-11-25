import { call, put, takeLatest } from 'redux-saga/effects';
import { getProfileInfoSagaType } from '../../types/sagas';
import { getProfileInfoRequestActions } from '../../actions/requests/getProfileInfo/getGetProfileInfo.actions';
import { getProfileInfoRequest } from '../../../services/getProfileInfo/getProfileInfo.service';
import { getUserCredentials } from '../../../services/authentication/userCredentials';

export default function* getProfileInfoWatcherSaga() {
  yield takeLatest(getProfileInfoSagaType, getProfileInfoWorkerSaga);
}

export function* getProfileInfoWorkerSaga({ payload }) {
  yield put(getProfileInfoRequestActions.start(payload));
  const userCredentials = yield call(getUserCredentials);
  try {
    const result = yield call(getProfileInfoRequest, userCredentials, payload);
    yield put(getProfileInfoRequestActions.succeed(result));
  } catch (error) {
    yield put(getProfileInfoRequestActions.fail(error));
  }
}
