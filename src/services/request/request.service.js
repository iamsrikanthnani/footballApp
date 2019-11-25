import omit from 'lodash/omit';
// import Base64 from 'Base64';
import get from 'lodash/get';
import { Platform } from 'react-native';
import Config from 'react-native-config';
// import { strings } from '../localization';
import ResponseError from './responseError';
// import { bugsnag } from '../analytics/bugsnag.service';
import { underScoreToCamel } from '../../utilities/case';

/*
 * Since this file is the only place we should be using fetch, tell eslint
 * about the fetch global here but let it yell at us for using it in any other
 * place.
 */
/* global fetch */

/* A Function that will handling building and firing off a http request.
 * @param {Object} requestOptions - Used to build the request.
 * @return {Promise}
 */
/*
 * requestOptions Fields:
 * @param {String} url - *Required* the url to be used for the request
 * @param {String} method - *Required* the http method to use
 * @param {Object} headers - any additional items that need to be added to the header
 */
export default function request(requestOptions) {
  if (!requestOptions.method || !requestOptions.url) {
    throw new Error('RequestOptions missing required property method or url');
  }

  const options = omit(requestOptions, ['headers', 'userCredentials', 'url']);
  return fetch(requestOptions.url, { ...options, headers: combineHeaders(requestOptions) })
    .then(response => {
      if (!response.ok) {
        const error = new ResponseError(get(response, 'status'));
        throwGenericError(error);
        // reportError(error, requestOptions);
      }
      return response;
    })
    .then(response => {
      switch (response.status) {
        case 204:
          return null;
        case 202:
          return throwGenericError(new ResponseError(get(response, 'status')), requestOptions);
        default:
          return response.json();
      }
    })
    .catch(error => throwGenericError(error, requestOptions));
}

function throwGenericError(error, requestOptions) {
  // reportError(error, requestOptions);
  throw new ResponseError(get(error, 'status'), 'strings(App.genericServiceError)');
}

/* TODO: remove in favor of request/errorForStatus
 * @param {String} status - The status received from the service
 * @param {String} localizationPath - The path to the list of errors in the language files.
 */
function errorForStatus(status, localizationPath) {
  let errorMessage = 'strings(App.genericError)';
  if (status) {
    const underScoreStatus = underScoreToCamel(status);
    errorMessage = 'StringHolder';
    // strings(`${localizationPath}.${underScoreStatus}`, { defaultValue: errorMessage });
  }
  return errorMessage;
}

function setDefaultHeaders(headers) {
  const { APP_NAME } = Config;
  const { graphQL } = headers;

  let allHeaders = {
    'Accept-Encoding': 'gzip,deflate',
    'Accept-Language': 'en-US',
    'Content-Type': graphQL ? 'text/plain' : 'application/json',
    'User-Agent': `${APP_NAME} (compatible; Mozilla/5.0; MSIE 9.0; Trident/5.0; ${Platform.OS})`,
    'Proxy-Connection': 'Keep-Alive',
    Connection: 'Keep-Alive',
    Accept: 'application/hal+json, application/json',
    ...headers,
  };

  // Omit Accept-Encoding header for Android only since it will gzip encoding on it's own
  if (Platform.OS === 'android') {
    allHeaders = omit(allHeaders, 'Accept-Encoding');
  }

  return allHeaders;
}

function combineHeaders(requestOptions) {
  // TODO: There are other items that will eventually need to be added to the header, like impersonation items.
  const optionHeaders = requestOptions.headers || {};
  if (requestOptions.userCredentials) {
    return setDefaultHeaders({ ...optionHeaders, ...getCredentials(requestOptions.userCredentials) });
  }
  return setDefaultHeaders(optionHeaders);
}

function getCredentials({ username, password }) {
  const base = { username, password }
  // `Basic ${Base64.btoa(`${username}:${password}`)}`;
  return { Authorization: base };
}

// https://docs.bugsnag.com/platforms/react-native/#attaching-custom-diagnostics
/* eslint-disable no-param-reassign, prefer-arrow-callback, func-names */
// function reportError(error, requestOptions, response) {
//   bugsnag.notify(error, function (report) {
//     report.metadata = {
//       request: {
//         url: requestOptions ? requestOptions.url : null,
//         method: requestOptions ? requestOptions.method : null,
//       },
//       response: {
//         status: response ? response.status : null,
//       },
//     };
//   });
// }
export { getCredentials, setDefaultHeaders, combineHeaders, errorForStatus };
