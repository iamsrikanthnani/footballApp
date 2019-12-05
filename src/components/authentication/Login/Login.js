import awsConfig from '../../../AWSconfiguration/awsConfig';
import { Auth } from '../../../../node_modules/aws-amplify';

// AWS Cognito Auth Methods //
export const LoginInUserMethod = (username, password) =>  Auth.signIn(username, password).then(successData => successData)
export const signupUserMethod = (username, password) =>  Auth.signUp(username, password).then(successData => successData)
