import { createGenericSagaReducer } from '.';
import { createGenericSagaActionSet } from '../../../actions/generic/genericSaga';
import { createGenericSagaActionTypeSet } from '../../../types/generic/genericSaga';

describe('createRequestResponseReducer()', () => {
  const BaseActionName = 'ACTION_X';
  const ActionXTypeSet = createGenericSagaActionTypeSet(BaseActionName);
  const actionXCreators = createGenericSagaActionSet(ActionXTypeSet);
  const reducer = createGenericSagaReducer(ActionXTypeSet);

  describe('handling of isWaiting', () => {
    it('should set isWaiting to true when start is called', () => {
      const expectedStartedState = {
        isWaiting: true,
      };
      const actualStartedState = reducer(undefined, actionXCreators.start());
      expect(actualStartedState).toEqual(expectedStartedState);
    });

    it('should set isWaiting to false when finished is called', () => {
      const expectedSucceededState = {
        isWaiting: false,
      };
      const actualSucceededState = reducer(undefined, actionXCreators.finished());
      expect(actualSucceededState).toEqual(expectedSucceededState);
    });
  });
});
