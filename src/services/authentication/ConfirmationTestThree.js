import { Auth } from '../../../node_modules/aws-amplify';

export const userCurrentAuthentication = () => Auth.currentAuthenticatedUser().then(user => user).then(err => err);
export const userCurrentSession = () => Auth.currentSession().then(data => data).then(err => err);
