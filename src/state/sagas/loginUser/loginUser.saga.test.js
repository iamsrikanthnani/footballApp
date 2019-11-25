import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import MockDate from 'mockdate';
import { throwError } from 'redux-saga-test-plan/providers';
import loginUserWatcherSaga from './loginUser.saga';
import { loginUserSagaAction } from '../../actions/sagas';
import { loginUserRequestActions } from '../../actions/requests/loginUser/getLoginUser.actions';
import successResponse from '../../../fixtures/apiResponses/loginUser/success.json';
import { loginUserRequest } from '../../../services/loginUser/loginUser.service';
import loginUserReducer from '../../reducers/requests/loginUser/loginUser.reducer';
import { getUserCredentials } from '../../../services/authentication/userCredentials';

describe('loginUser Saga', () => {
  const payload = {};
  const userCredentials = { username: 'demo', password: 'password' };
  const genericError = 'RANDOM_ERROR';
  MockDate.set('2017-09-10T17:12:12.000Z');
  const timeStamp = Date.now();
  it('can store loginUser to state', async () => {
    await expectSaga(loginUserWatcherSaga)
      .withReducer(loginUserReducer)
      .provide([
        [matchers.call.fn(loginUserRequest), successResponse.data],
        [matchers.call.fn(getUserCredentials), userCredentials],
      ])
      .put(loginUserRequestActions.start(payload))
      .put(loginUserRequestActions.succeed(successResponse.data))
      .dispatch(loginUserSagaAction(payload))
      .hasFinalState(({
        isWaiting: false,
        value: payload,
        error: null,
        result: successResponse.data,
        timestamp: timeStamp,
      }))
      .run({ silenceTimeout: true });
  });

  it('handles failure', async () => {
    await expectSaga(loginUserWatcherSaga)
      .withReducer(loginUserReducer)
      .provide([
        [matchers.call.fn(loginUserRequest), throwError(genericError)],
        [matchers.call.fn(getUserCredentials), userCredentials],
      ])
      .put(loginUserRequestActions.start(payload))
      .put(loginUserRequestActions.fail(genericError))
      .dispatch(loginUserSagaAction(payload))
      .hasFinalState({
        isWaiting: false,
        value: payload,
        error: genericError,
        result: null,
      })
      .run({ silenceTimeout: true });
  });
});
