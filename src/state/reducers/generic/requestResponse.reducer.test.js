import MockDate from 'mockdate';
import { createRequestResponseReducer } from '.';
import { createRequestResponseActionTypeSet } from '../../types/generic';
import { createRequestResponseActionSet } from '../../actions/generic';

describe('createRequestResponseReducer()', () => {
  const BaseActionName = 'ACTION_X';
  const ActionXTypeSet = createRequestResponseActionTypeSet(BaseActionName);
  const actionXCreators = createRequestResponseActionSet(ActionXTypeSet);
  const reducer = createRequestResponseReducer(ActionXTypeSet);

  const exampleRequestData = { message: 'hello' };
  const exampleError = new Error('hello');
  const exampleResult = { status: 'ok', success: true };
  MockDate.set('2017-09-10T17:12:12.000Z');
  const timeStamp = Date.now();
  describe('creating states from the initial state', () => {
    it('should create a request "started" state from the initial state', () => {
      const expectedStartedState = {
        isWaiting: true,
        value: exampleRequestData,
        error: null,
        result: null,
      };
      const actualStartedState = reducer(undefined, actionXCreators.start(exampleRequestData));
      expect(actualStartedState).toEqual(expectedStartedState);
    });

    it('should create a request "failed" state from the initial state', () => {
      const expectedFailedState = {
        isWaiting: false,
        value: null,
        error: exampleError,
        result: null,
      };
      const actualFailedState = reducer(undefined, actionXCreators.fail(exampleError));
      expect(actualFailedState).toEqual(expectedFailedState);
    });

    it('should create a request "succeeded" state from the initial state', () => {
      const expectedSucceededState = {
        isWaiting: false,
        value: null,
        error: null,
        result: exampleResult,
        timestamp: timeStamp,
      };
      const actualSucceededState = reducer(undefined, actionXCreators.succeed(exampleResult));
      expect(actualSucceededState).toEqual(expectedSucceededState);
    });
  });

  describe('request is started then fails', () => {
    let carriedState = null;

    it('should create a request "started" state from the initial state', () => {
      const expectedStartedState = {
        isWaiting: true,
        value: exampleRequestData,
        error: null,
        result: null,
      };
      const actualStartedState = reducer(undefined, actionXCreators.start(exampleRequestData));
      carriedState = actualStartedState;
      expect(actualStartedState).toEqual(expectedStartedState);
    });

    it('should create a "failed" state from the "started" state', () => {
      const expectedFailedState = {
        isWaiting: false,
        value: exampleRequestData,
        error: exampleError,
        result: null,
      };
      const actualFailedState = reducer(carriedState, actionXCreators.fail(exampleError));
      expect(actualFailedState).toEqual(expectedFailedState);
    });
  });

  describe('request is started then succeeds', () => {
    let carriedState = null;

    it('should create a request "started" state from the initial state', () => {
      const expectedStartedState = {
        isWaiting: true,
        value: exampleRequestData,
        error: null,
        result: null,
      };
      const actualStartedState = reducer(undefined, actionXCreators.start(exampleRequestData));
      carriedState = actualStartedState;
      expect(actualStartedState).toEqual(expectedStartedState);
    });

    it('should create a "succeeded" state from the "started" state', () => {
      const expectedSucceededState = {
        isWaiting: false,
        value: exampleRequestData,
        error: null,
        result: exampleResult,
        timestamp: timeStamp,
      };
      const actualSucceededState = reducer(carriedState, actionXCreators.succeed(exampleResult));
      expect(actualSucceededState).toEqual(expectedSucceededState);
    });
  });
});
