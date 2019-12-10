import {requestingType, successType, failType} from '../../types/genericTypes/Generic.types';

export const genericRequestingAction = () => ({ type: requestingType });
export const genericSuccessAction = payload => ({ type: successType, payload });
export const genericFailAction = payload => ({ type: failType, payload });
