import * as Keychain from 'react-native-keychain';

export const saveCredentials = async ({ username, password }, options) => {
  const success = await Keychain.setGenericPassword(username, password, options);
  return success;
};

export const getUserCredentials = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    return credentials;
  } catch (error) {
    return { username: null, password: null };
  }
};

export const clearUserCredentials = async () => {
  const success = await Keychain.resetGenericPassword();
  return success;
};
