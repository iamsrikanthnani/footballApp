import React from 'react';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { signupUserService } from '../../../services/authentication';
import { showModalAction } from '../../actions/ModalActions/modalActions';
import Profile from '../../../screens/profile/Profile';
import { signUpUserSagaType } from '../../types/sagas';
import navigationServices from '../../../navigation/navigationServices';
import { loginUserSagaAction } from '../../actions/sagas';

export default function* signUpWatcherSaga() {
  yield takeLatest(signUpUserSagaType, signUpUserSagaWorker);
}

// Sign up saga worker //
export function* signUpUserSagaWorker({payload}){
  yield put({ type: 'REQUESTING' });
  try {
    const signupSuccessData = yield call(signupUserService, payload.username, payload.password );
    yield put(loginUserSagaAction({ username: payload.username, password: payload.password }));

    yield put({ type: 'SIGNUP_SUCCESS', payload: signupSuccessData });

    const userIDToken = yield select(isUserHasIDToken);
    const userAccessToken = yield select(isUserHasAccessToken);
    
    if(userIDToken && userAccessToken){
      yield navigationServices.navigate('Profile');
    }
    
  } catch (error) {
    yield put({ type: 'SIGNUP_ERROR', payload: error })
  }
}
