import { mapKeys, mapValues } from 'lodash';

export const RequestResponseSubactions = mapKeys(['Start', 'Fail', 'Succeed', 'Reset']);

export function createRequestResponseActionTypeSet(base) {
  return mapValues(RequestResponseSubactions, subaction => `${base}/${subaction.toUpperCase()}`);
}
