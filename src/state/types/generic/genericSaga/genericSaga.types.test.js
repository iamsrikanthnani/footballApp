import { createGenericSagaActionTypeSet } from './genericSaga.types';

describe('createGenericSagaActionTypeSet()', () => {
  it('should create the two saga action types in one object', () => {
    const BaseName = 'ACTION_X';
    const expectedActionSet = {
      Start: `${BaseName}/START`,
      Finished: `${BaseName}/FINISHED`,
    };
    const actualActionSet = createGenericSagaActionTypeSet(BaseName);
    expect(actualActionSet).toEqual(expectedActionSet);
  });
});
