import errorForStatus from './errorForStatus';
import { strings } from '../../localization';

jest.mock('../../localization', () => ({ strings: jest.fn() }));

describe('errorForStatus', () => {
  const getErrorForStatus = errorForStatus();

  it('returns a curried function', () => {
    expect(typeof getErrorForStatus).toBe('function');
  });

  describe('curried function', () => {
    const genericErrorPath = 'App.genericError';
    const fallbackOptions = { defaults: [{ scope: genericErrorPath }] };

    beforeAll(() => {
      strings.mockImplementation(() => 'some string');
    });

    afterAll(() => {
      strings.mockClear();
    });

    it('takes one argument [status]', () => {
      expect(getErrorForStatus).toHaveLength(1);
    });

    it('uses the App\'s generic error message when result status is missing', () => {
      const response = {};

      getErrorForStatus(response.status);

      expect(strings).toHaveBeenCalledWith('App.genericError');
    });

    it('uses the App\'s generic message when the error is not in the locale file', () => {
      const localizationPath = 'Some.path';
      const getErrorForService = errorForStatus(localizationPath);
      const response = { status: 'ERROR_WITH_NO_LOCALIZATION' };

      getErrorForService(response.status);

      expect(strings).toHaveBeenCalledWith(expect.anything(), fallbackOptions);
    });

    it('uses the localized error message when result status is not success', () => {
      const response = { status: 'RANDOM_ERROR' };

      getErrorForStatus(response.status);

      expect(strings).toHaveBeenCalledWith('randomError', fallbackOptions);
    });

    it('uses the localization path passed on creation', () => {
      const getErrorForService = errorForStatus('Offers.errors');
      const response = { status: 'RANDOM_ERROR' };

      getErrorForService(response.status);

      expect(strings).toHaveBeenCalledWith('Offers.errors.randomError', fallbackOptions);
    });
  });
});
