import awsConfig from '../../../../AWSconfiguration/awsConfig';
import { Auth } from 'aws-amplify';

export const userConfirmationService = (username, code) => Auth.confirmSignUp(username, code).then(successData => successData);
