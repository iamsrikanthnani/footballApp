import _ from 'lodash';
import { RequestResponseSubactions } from '../../../../src/state/types/generic';

const requestResponseActions = _.mapKeys(RequestResponseSubactions, key => key.toLowerCase());

export const createGenericTag = (actionTypeSet, subtypeKey) => {
  const splitAction = _.split(_.toLower(actionTypeSet[subtypeKey]), '/');
  const action = _.replace(_.nth(splitAction, -2), /get_/, '');

  return `req_${action}_${_.toLower(subtypeKey)}`;
};

export const createRequestResponseActionSet = actionTypeSet =>
  _.mapValues(requestResponseActions, subtypeKey => payload => ({
    tag: createGenericTag(actionTypeSet, subtypeKey),
    type: actionTypeSet[subtypeKey],
    payload,
  }));
