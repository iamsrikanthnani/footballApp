import React from 'react';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { signupUserService } from '../../../services/authentication';
import { showModalAction } from '../../actions/ModalActions/modalActions';
import Profile from '../../../screens/profile/Profile';
import { signUpUserSagaType } from '../../types/sagas';

export default function* signUpWatcherSaga() {
  yield takeLatest(signUpUserSagaType, signUpUserSagaWorker);
}

// Sign up saga worker //
export function* signUpUserSagaWorker({payload}){
  yield put({ type: 'REQUESTING' });
  try {
    const signupSuccessData = yield call(signupUserService, 'edbraouf@gmail.com', 'Allahis1');
    yield put({ type: 'SIGNUP_SUCCESS', payload: signupSuccessData });
    yield put(showModalAction(<Profile />));
  } catch (error) {
    console.log('Sign up error is ', error);
    yield put({ type: 'SIGNUP_ERROR', payload: error })
  }
}
