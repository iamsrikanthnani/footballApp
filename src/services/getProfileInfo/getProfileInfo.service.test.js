import { getProfileInfoRequest } from './getProfileInfo.service';
import request from '../request/request.service';
import fakeSuccessResult from '../../fixtures/apiResponses/getProfileInfo/success.json';

jest.mock('../request/request.service');

describe('getProfileInfo Service', () => {
  const options = {
    username: 'test_username',
    payGroup: 'test_payGroup',
    jobGroup: 'test_jobGroup',
  };
  const userCredentials = { username: 'demo', password: 'demo' };

  it('can request getProfileInfo', async () => {
    request.mockImplementation(() => Promise.resolve(fakeSuccessResult));
    expect(await getProfileInfoRequest(userCredentials, options)).toEqual(fakeSuccessResult.data);
  });

  it('fails because of a non-success-related error', async () => {
    request.mockImplementation(() => {
      return Promise.reject(Error('SOME_RANDOM_ERROR'));
    });
    await expect(getProfileInfoRequest(userCredentials, options)).rejects.toThrow('SOME_RANDOM_ERROR');
  });
});
