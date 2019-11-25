import { setGenericPassword, getGenericPassword, resetGenericPassword } from 'react-native-keychain';
import { saveCredentials, getUserCredentials, clearUserCredentials } from './userCredentials.service';

jest.mock('react-native-keychain', () => ({
  setGenericPassword: jest.fn((username, password) => !!({ username, password })),
  getGenericPassword: jest.fn(() => ({ username: 'user', password: 'pa55' })),
  resetGenericPassword: jest.fn(() => true),
}));

describe('userCredentials Service', () => {
  describe('saveCredentials()', () => {
    it('calls setGenericPassword()', async () => {
      await saveCredentials('us3rnam3', 'pa55w0rd');
      expect(setGenericPassword).toHaveBeenCalled();
    });
    it('saves the users credentials', async () => {
      const result = await saveCredentials('us3rnam3', 'pa55w0rd');
      expect(result).toEqual(true);
    });
  });

  describe('getUserCredentials()', () => {
    it('gets the saved credentials', async () => {
      const result = await getUserCredentials();
      expect(getGenericPassword).toHaveBeenCalled();
      expect(result).toEqual({ username: 'user', password: 'pa55' });
    });

    it('returns null for username and password if something goes wrong', async () => {
      getGenericPassword.mockImplementation(() => Promise.reject(Error('SOME_RANDOM_ERROR')));
      const result = await getUserCredentials();
      expect(getGenericPassword).toHaveBeenCalled();
      expect(result).toEqual({ username: null, password: null });
    });
  });

  describe('clearUserCredentials()', () => {
    it('removes saved credentials', async () => {
      const result = await clearUserCredentials();
      expect(resetGenericPassword).toHaveBeenCalled();
      expect(result).toEqual(true);
    });
  });
});
