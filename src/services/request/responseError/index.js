import * as _ from 'lodash';

function ResponseError(status, message) {
  const instance = new Error(message);
  instance.name = 'ResponseError';
  instance.status = status;

  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  return instance;
}

ResponseError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true,
  },
});

if (_.isFunction(Object.setPrototypeOf)) {
  Object.setPrototypeOf(ResponseError, Error);
} else {
  // setting __proto__ manually like this is deprecated, but is required for android
  ResponseError.__proto__ = Error; // eslint-disable-line no-proto
}

export default ResponseError;
