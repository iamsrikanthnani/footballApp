import _ from 'lodash';
import ResponseError from '../responseError';
// import { strings } from '../../localization';

/* A Function that creates a generic request response handler.
 * @example
 * const handleOffersResponse = responseHandler();
 * request(requestOptions).then(handleOffersResponse);
 *
 * // With errorForStatus function
 * const errorForOffersStatus = errorForStatus('Offers.errors');
 * const handleOffersResponse = responseHandler(errorForOffersStatus);
 * request(requestOptions).then(handleOffersResponse);
 *
 * @param {function} errorForStatus - Function that returns an error message.
 * @returns {Function} - Function that handles a request response.
 */

export const defaultErrorForStatus = () => strings('App.genericError');

export default function responseHandler(errorForStatus = defaultErrorForStatus) {
  return response => {
    if (response.success === true && response.status && response.status.toUpperCase() === 'SUCCESS') {
      return response;
    } else {
      throw new ResponseError(response.status, errorForStatus(response.status));
    }
  };
}

export function responseHandlerWithoutStatusCheck(errorForStatus = defaultErrorForStatus) {
  return response => {
    if (response.success === true && response.data && !response.errors) {
      return response;
    }

    throw new ResponseError(response.status, errorForStatus(response.status));
  };
}

export function responseHandlerGraphQL(response) {
  const { success, status, data } = response;
  if (data && status === 'OK' && success) {
    return data;
  }
  throw new ResponseError(status, defaultErrorForStatus());
}

export function responseLoadCheck(response) {
  if (response.loads) {
    return response;
  } else {
    throw new ResponseError('OK', defaultErrorForStatus());
  }
}

export const responseOfferLoadNotAvailable = (acceptableStatuses, errorForStatus = defaultErrorForStatus) =>
  response => {
    const status = response.status && response.status.toUpperCase();
    if ((response.success && status === 'SUCCESS') || _.includes(acceptableStatuses, status)) {
      return response;
    } else if (response.status === 'CARRIER_RESTRICTED') {
      throw new ResponseError(response.data, errorForStatus(response.errorMessage));
    } else {
      throw new ResponseError(response.status, errorForStatus(response.status));
    }
  };

export function responseHandlerOfferConfidenceMetric() {
  return response => {
    if (typeof response === 'string') {
      return response;
    } else {
      throw new ResponseError('Failure', defaultErrorForStatus());
    }
  };
}

export function responseHandlerForMLDA(acceptableStatuses, errorForStatus = defaultErrorForStatus) {
  return response => {
    if (response.success === true && response.status && response.status.toUpperCase() === 'SUCCESS') {
      if (Array.isArray(response.data)) {
        const failures = _.remove(response.data, l => !_.includes(acceptableStatuses, l.assocResponseStatus));
        if (failures.length > 1) {
          throw new ResponseError('Failure', errorForStatus());
        } else if (failures.length === 1) {
          throw new ResponseError('Failure', errorForStatus(failures[0].loadNumber));
        }
      }
      return response;
    } else {
      throw new ResponseError('Failure', errorForStatus());
    }
  };
}
