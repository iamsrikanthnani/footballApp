import { call, put, takeLatest, select } from 'redux-saga/effects';
import { forgotPasswordSagaType } from '../../../types/sagas/forgotPasswordTypes/forgotPassword.Types';
import { forgotPasswordService } from '../../../../services/authentication/forgotPasswordService/forgotPassword.service';
import { hideModalAction } from '../../../actions/ModalActions/modalActions';

export default function* forgotPasswordWatcherSaga(){
  yield takeLatest(forgotPasswordSagaType, forgotPasswordSagaWorker);
}
export function* forgotPasswordSagaWorker ({payload}){
  
  yield put({type: 'REQUESTING'});
  try {
    const forgotPasswordResult = yield call(forgotPasswordService, payload.relatedEmail);
    yield put({ type: 'FORGOT_PASSWORD_SUCCESS', payload: forgotPasswordResult });
    yield put(hideModalAction());
  } catch (error) {
    console.log('Error is:', error);
    yield put({ type: 'FORGOT_PASSWORD_FAIL', payload: error })
  }
};
