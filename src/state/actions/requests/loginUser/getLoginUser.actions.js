import { createRequestResponseActionSet } from '../../generic';
import { LoginUserRequestTypes } from '../../../types/requests/loginUser/loginUser.types';

export const loginUserRequestActions = createRequestResponseActionSet(LoginUserRequestTypes);
