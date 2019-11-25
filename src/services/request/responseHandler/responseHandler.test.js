import _ from 'lodash';
import responseHandler, {
  responseHandlerWithoutStatusCheck,
  responseHandlerGraphQL,
  responseOfferLoadNotAvailable,
  responseHandlerOfferConfidenceMetric,
  responseHandlerForMLDA,
} from './responseHandler';
import ResponseError from '../responseError';
import { strings } from '../../localization';
import { notAvailableStatuses } from '../../../state/sagas/offers/handleLoadNotAvailable/handleLoadNotAvailable';
import errorForStatus from '../errorForStatus/errorForStatus';
import AssignMultipleLoadsStatuses, { statuses as statusesForMLDA } from '../../mlda/model/assignMultipleLoadsStatuses';
import { errorForMLDAStatus } from '../../mlda/reorderLoads/reorderLoads.service';

describe('responseHandler Service', () => {
  describe('responseHandler', () => {
    const myResponseHandler = responseHandler();

    it('returns a curried function', () => {
      expect(typeof myResponseHandler).toBe('function');
    });

    describe('curried function', () => {
      it('takes one argument [response]', () => {
        expect(myResponseHandler).toHaveLength(1);
      });

      describe('successful response', () => {
        it('returns the response', () => {
          const response = {
            data: 'I never knew what a friend was until I met Geordi.',
            status: 'SUCCESS',
            success: true,
          };

          expect(myResponseHandler(response)).toBe(response);
        });
      });

      describe('unsuccessful response', () => {
        it('throws an error when success is false', () => {
          const response = { success: false };

          expect(() => myResponseHandler(response)).toThrow();
        });

        it('throws an error when status is not success', () => {
          const response = { status: 'NO' };

          expect(() => myResponseHandler(response)).toThrow();
        });

        describe('thrown error', () => {
          it('throws a ResponseError', () => {
            const response = { status: 'NO' };

            expect(() => myResponseHandler(response)).toThrow(ResponseError);
          });

          it('throws a generic message by default', () => {
            const errorMessage = strings('App.genericError');
            const response = { status: 'NO' };

            expect(() => myResponseHandler(response)).toThrow(new ResponseError(response.status, errorMessage));
          });
        });

        it('throws an error supplied by a function supplied during creation', () => {
          const errorMessage = 'Unfortunate funny business has occurred';
          const mySpecificResponseHandler = responseHandler(() => errorMessage);
          const response = { status: 'NO' };

          expect(() => mySpecificResponseHandler(response)).toThrow(new ResponseError(response.status, errorMessage));
        });
      });
    });
  });

  describe('responseHandlerWithoutStatusCheck', () => {
    const handleResponse = responseHandlerWithoutStatusCheck();

    describe('when the response is successful, contains data, and has no errors', () => {
      const response = {
        success: true,
        data: {},
        errors: null,
      };

      it('should return the response ', () => {
        expect(handleResponse(response)).toEqual(response);
      });
    });

    const itShouldThrowResponseError = response => {
      it('should throw a response error', () => {
        expect(() => handleResponse(response)).toThrow(ResponseError);
      });
    };

    describe('when the response is unsuccessful', () => {
      itShouldThrowResponseError({
        success: false,
        data: {},
        errors: null,
      });
    });

    describe('when the data is not present', () => {
      itShouldThrowResponseError({
        success: true,
        data: null,
        errors: null,
      });
    });

    describe('when errors are present', () => {
      itShouldThrowResponseError({
        success: true,
        data: {},
        errors: [],
      });
    });
  });

  describe('responseHandlerGraphQL', () => {
    describe('when the service response is successful, contains data, and status is OK', () => {
      const data = {
        someKey: 'someValue',
      };
      const response = {
        status: 'OK',
        success: true,
        data,
      };
      it('should return the response', () => {
        expect(responseHandlerGraphQL(response)).toEqual({ someKey: 'someValue' });
      });
    });

    describe('when the service response is successful, contains data, data.load, and status is OK', () => {
      const data = {
        load: 'someValue',
      };
      const response = {
        status: 'OK',
        success: true,
        data,
      };
      it('should return the response', () => {
        expect(responseHandlerGraphQL(response)).toEqual({ load: 'someValue' });
      });
    });

    describe('when the response is successful but it contain errors message', () => {
      const name = 'serviceName';
      const data = {
        someKey: 'someValue',
      };
      const response = {
        data: {
          [name]: {
            status: 'Fail',
            data,
          },
        },
      };
      it('should throw response error', () => {
        const errorMessage = strings('App.genericError');
        const { status } = response.data[name];
        expect(() => responseHandlerGraphQL(name)(response)).toThrow(new ResponseError(status, errorMessage));
      });
    });
  });

  describe('responseOfferLoadNotAvailable', () => {
    it('returns a curried function', () => {
      const responseHandlerOffer = responseOfferLoadNotAvailable();
      expect(responseHandlerOffer).toEqual(expect.any(Function));
    });

    describe('successful statusese', () => {
      it('succeeds is success status', () => {
        const responseHandlerOffer = responseOfferLoadNotAvailable();
        const status = { success: true, status: 'success' };
        expect(responseHandlerOffer(status)).toEqual(status);
      });

      _.forEach(notAvailableStatuses, st =>
        it(`succeeds if '${st}' status`, () => {
          const responseHandlerOffer = responseOfferLoadNotAvailable(st);
          _.forEach(st, okStatus => {
            const status = { success: false, status: okStatus };
            expect(responseHandlerOffer(status)).toEqual(status);
          });
        }));
    });

    describe('failure statuses', () => {
      it('should throw response error if bad status', () => {
        const errorMessage = 'Failed';
        const errorHandler = errorForStatus(errorMessage);
        const response = {
          success: false,
          status: 'fail',
        };
        expect(() => responseOfferLoadNotAvailable(null, errorHandler)(response))
          .toThrow(new ResponseError(response.status, errorMessage));
      });

      it('should throw response error if no response', () => {
        const errorMessage = 'Failed';
        const errorHandler = errorForStatus(errorMessage);
        const response = {};
        expect(() => responseOfferLoadNotAvailable(null, errorHandler)(response))
          .toThrow(new ResponseError(response.status, errorMessage));
      });
    });
  });

  describe('responseHandlerOfferConfidenceMetric', () => {
    const handleResponse = responseHandlerOfferConfidenceMetric();

    it('should return the response ', () => {
      const response = 'GREEN';
      expect(handleResponse(response)).toEqual(response);
    });

    it('should throw response error', () => {
      const errorMessage = strings('App.genericError');
      const response = {
        success: false,
        errors: {
          errorMessage: 'No message available',
          errorCode: 500,
        },
      };
      expect(() => handleResponse(response)).toThrow(new ResponseError('Failure', errorMessage));
    });
  });

  describe('responseHandlerForMLDA', () => {
    const handleResponse = responseHandlerForMLDA(AssignMultipleLoadsStatuses.success, errorForMLDAStatus);
    it('should return the response ', () => {
      const response = {
        status: 'SUCCESS',
        success: true,
        data: null,
      };
      expect(handleResponse(response)).toEqual(response);
    });
    it('should throw top level response error', () => {
      const response = {
        success: false,
        status: 'UNEXPECTED_ERROR',
        errors: {
          errorMessage: 'No message available',
          errorCode: 500,
        },
      };
      expect(() => handleResponse(response)).toThrow(new ResponseError('Failure', strings('reorderLoads.multiLoadError')));
    });
    it('should throw multi load response error', () => {
      const response = {
        success: true,
        status: 'SUCCESS',
        data: [
          {
            assocResponseStatus: statusesForMLDA.driverAlreadyAssigned,
            loadNumber: 'LOAD_NUMBER_1',
          },
          {
            assocResponseStatus: statusesForMLDA.driverAlreadyAssigned,
            loadNumber: 'LOAD_NUMBER_2',
          },
        ],
      };
      expect(() => handleResponse(response)).toThrow(new ResponseError('Failure', strings('reorderLoads.multiLoadError')));
    });
    it('should throw single load response error with load number', () => {
      const response = {
        success: true,
        status: 'SUCCESS',
        data: [
          {
            assocResponseStatus: statusesForMLDA.driverAlreadyAssigned,
            loadNumber: 'LOAD_NUMBER_1',
          },
          {
            assocResponseStatus: statusesForMLDA.success,
            loadNumber: 'LOAD_NUMBER_2',
          },
        ],
      };
      expect(() => handleResponse(response)).toThrow(new ResponseError('Failure', `${strings('reorderLoads.singleLoadError')} LOAD_NUMBER_1`));
    });
  });
});
