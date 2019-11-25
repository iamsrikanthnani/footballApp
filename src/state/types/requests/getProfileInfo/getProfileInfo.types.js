import { createRequestResponseActionTypeSet } from '../../generic';

const ActionNamespace = 'GetProfileInfo';
export const GetProfileInfoRequestTypes = createRequestResponseActionTypeSet(`${ActionNamespace}/GET_PROFILE_INFO`);
