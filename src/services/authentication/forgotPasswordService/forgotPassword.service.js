import { Auth } from '../../../../node_modules/aws-amplify';

export const forgotPasswordService = username => Auth.forgotPassword(username).then(data => data);
