import { createRequestResponseActionTypeSet } from './requestResponse.types';

describe('createRequestResponseActionTypeSet()', () => {
  it('should create the three request-response action types in one object', () => {
    const BaseName = 'ACTION_X';
    const expectedActionSet = {
      Start: `${BaseName}/START`,
      Fail: `${BaseName}/FAIL`,
      Succeed: `${BaseName}/SUCCEED`,
      Reset: `${BaseName}/RESET`,
    };
    const actualActionSet = createRequestResponseActionTypeSet(BaseName);
    expect(actualActionSet).toEqual(expectedActionSet);
  });
});
