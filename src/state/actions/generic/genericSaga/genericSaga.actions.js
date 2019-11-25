import _ from 'lodash';
import { GenericSagaSubactions } from '../../../types/generic/genericSaga';

const genericSagaActions = _.mapKeys(GenericSagaSubactions, key => key.toLowerCase());

export const createGenericTag = (actionTypeSet, subtypeKey) => {
  const splitAction = _.split(_.toLower(actionTypeSet[subtypeKey]), '/');
  const action = _.replace(_.nth(splitAction, -2), /get_/, '');

  return `saga_${action}_${_.toLower(subtypeKey)}`;
};

export const createGenericSagaActionSet = actionTypeSet =>
  _.mapValues(genericSagaActions, subtypeKey => payload => ({
    tag: createGenericTag(actionTypeSet, subtypeKey),
    type: actionTypeSet[subtypeKey],
    payload,
  }));
