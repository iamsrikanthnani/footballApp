import { loginUserRequest } from './loginUser.service';
import request from '../request/request.service';
import fakeSuccessResult from '../../fixtures/apiResponses/loginUser/success.json';

jest.mock('../request/request.service');

describe('loginUser Service', () => {
  const options = {
    username: 'test_username',
    payGroup: 'test_payGroup',
    jobGroup: 'test_jobGroup',
  };
  const userCredentials = { username: 'demo', password: 'demo' };

  it('can request loginUser', async () => {
    request.mockImplementation(() => Promise.resolve(fakeSuccessResult));
    expect(await loginUserRequest(userCredentials, options)).toEqual(fakeSuccessResult.data);
  });

  it('fails because of a non-success-related error', async () => {
    request.mockImplementation(() => {
      return Promise.reject(Error('SOME_RANDOM_ERROR'));
    });
    await expect(loginUserRequest(userCredentials, options)).rejects.toThrow('SOME_RANDOM_ERROR');
  });
});
