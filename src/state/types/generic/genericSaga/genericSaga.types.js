import { mapKeys, mapValues } from 'lodash';

export const GenericSagaSubactions = mapKeys(['Start', 'Finished']);

export function createGenericSagaActionTypeSet(base) {
  return mapValues(GenericSagaSubactions, subaction => `${base}/${subaction.toUpperCase()}`);
}
