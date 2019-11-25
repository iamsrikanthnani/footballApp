import { createRequestResponseActionSet } from '../../generic';
import { GetProfileInfoRequestTypes } from '../../../types/requests/getProfileInfo/getProfileInfo.types';

export const getProfileInfoRequestActions = createRequestResponseActionSet(GetProfileInfoRequestTypes);
