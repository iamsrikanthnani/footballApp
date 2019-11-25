import { isFunction } from 'lodash';
import { createGenericSagaActionSet } from './genericSaga.actions';
import { createGenericSagaActionTypeSet } from '../../../types/generic/genericSaga';

describe('createGenericSagaActionSet()', () => {
  const BaseActionName = 'ACTION_X';
  const ActionXTypeSet = createGenericSagaActionTypeSet(BaseActionName);
  const actionCreatorSet = createGenericSagaActionSet(ActionXTypeSet);

  ['start', 'finished'].forEach(subaction => {
    it(`should create a ${subaction} action creator`, () => {
      expect(isFunction(actionCreatorSet[subaction])).toBe(true);
    });
  });

  const examplePayload = { message: 'hello' };

  ['start', 'finished'].forEach(subaction => {
    it(`should create a ${subaction} action`, () => {
      const expectedAction = {
        type: `${BaseActionName}/${subaction.toUpperCase()}`,
        tag: `saga_${BaseActionName.toLowerCase()}_${subaction.toLowerCase()}`,
        payload: examplePayload,
      };
      const actualAction = actionCreatorSet[subaction](examplePayload);
      expect(actualAction).toEqual(expectedAction);
    });
  });
});
