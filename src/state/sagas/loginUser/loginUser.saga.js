import { call, put, takeLatest } from 'redux-saga/effects';
import { loginUserSagaType } from '../../types/sagas';
import { loginUserRequestActions } from '../../actions/requests/loginUser/getLoginUser.actions';
import { loginUserRequest } from '../../../services/loginUser/loginUser.service';
import { getUserCredentials } from '../../../services/authentication/userCredentials';
// import { LOGIN_USER_TYPE } from '../../../normalState/types/types';
import { LoginInUser } from '../../../components/authentication/Login/Login';


export default function* loginUserWatcherSaga() {
  yield takeLatest(loginUserSagaType, loginUserWorkerSaga);
}

export function* loginUserWorkerSaga() {

   yield put(loginUserRequestActions.start());
    // const userCredentials = yield call(getUserCredentials);
    console.log('Started!!!');
   try {
      const result = yield call(LoginInUser, 'edbraouf@gmail.com', 'Allahis1');
      console.log('Succeeded!!!');
     yield put(loginUserRequestActions.succeed(result));
     console.log(result);
   } catch (error) {
    console.log('Failed');
     yield put(loginUserRequestActions.fail(error));
   }
  //  yield put({ type: 'TestTYpe', payload: { newUserName: 'USERname', newPassword: 'PASSword' } });
}

// function* loginSaga(email, password) {
//   try {
//     const data = yield call(rsf.auth.signInWithEmailAndPassword, email, password);
//     yield put(loginSuccess(data));
//   }
//   catch(error) {
//     yield put(loginFailure(error));
//   }
// }
