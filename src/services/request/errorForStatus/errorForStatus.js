import { compact } from 'lodash';
import { strings } from '../../localization';
import { underScoreToCamel } from '../../../utilities';

const genericErrorPath = 'App.genericError';
const fallbackOptions = { defaults: [{ scope: genericErrorPath }] };

/* A Function that creates an error message getter.
 * @example
 * const errorForApp = errorForStatus();
 *
 * // With a supplied localization path
 * const errorForOffersStatus = errorForStatus('Offers.errors');
 *
 * @param {string} localizationPath - Path to the localized errors object.
 * @returns {Function} - Function that will return the desired error message based on a localization path.
 */
export default function errorForStatus(localizationPath = '') {
  return status => {
    if (status && status.toUpperCase() !== 'SUCCESS') {
      const statusKey = underScoreToCamel(status);
      const errorPath = compact([localizationPath, statusKey]).join('.');
      return strings(errorPath, fallbackOptions);
    }

    return strings(genericErrorPath);
  };
}
