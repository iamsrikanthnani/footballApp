import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import MockDate from 'mockdate';
import { throwError } from 'redux-saga-test-plan/providers';
import getProfileInfoWatcherSaga from './getProfileInfo.saga';
import { getProfileInfoSagaAction } from '../../actions/sagas';
import { getProfileInfoRequestActions } from '../../actions/requests/getProfileInfo/getGetProfileInfo.actions';
import successResponse from '../../../fixtures/apiResponses/getProfileInfo/success.json';
import { getProfileInfoRequest } from '../../../services/getProfileInfo/getProfileInfo.service';
import getProfileInfoReducer from '../../reducers/requests/getProfileInfo/getProfileInfo.reducer';
import { getUserCredentials } from '../../../services/authentication/userCredentials';

describe('getProfileInfo Saga', () => {
  const payload = {};
  const userCredentials = { username: 'demo', password: 'password' };
  const genericError = 'RANDOM_ERROR';
  MockDate.set('2017-09-10T17:12:12.000Z');
  const timeStamp = Date.now();
  it('can store getProfileInfo to state', async () => {
    await expectSaga(getProfileInfoWatcherSaga)
      .withReducer(getProfileInfoReducer)
      .provide([
        [matchers.call.fn(getProfileInfoRequest), successResponse.data],
        [matchers.call.fn(getUserCredentials), userCredentials],
      ])
      .put(getProfileInfoRequestActions.start(payload))
      .put(getProfileInfoRequestActions.succeed(successResponse.data))
      .dispatch(getProfileInfoSagaAction(payload))
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
    await expectSaga(getProfileInfoWatcherSaga)
      .withReducer(getProfileInfoReducer)
      .provide([
        [matchers.call.fn(getProfileInfoRequest), throwError(genericError)],
        [matchers.call.fn(getUserCredentials), userCredentials],
      ])
      .put(getProfileInfoRequestActions.start(payload))
      .put(getProfileInfoRequestActions.fail(genericError))
      .dispatch(getProfileInfoSagaAction(payload))
      .hasFinalState({
        isWaiting: false,
        value: payload,
        error: genericError,
        result: null,
      })
      .run({ silenceTimeout: true });
  });
});
