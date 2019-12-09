import awsConfig from '../../../../AWSconfiguration/awsConfig';
import { Auth } from '../../../../../node_modules/aws-amplify';

export const userConfirmationService = (username, code) => Auth.confirmSignUp(username, code).then(successData => successData);
