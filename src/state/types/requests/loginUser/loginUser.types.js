import { createRequestResponseActionTypeSet } from '../../generic';

const ActionNamespace = 'LoginUser';
export const LoginUserRequestTypes = createRequestResponseActionTypeSet(`${ActionNamespace}/LOGIN_USER`);
