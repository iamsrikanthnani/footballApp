import awsConfig from '../../../AWSconfiguration/awsConfig';
import { Auth } from '../../../../node_modules/aws-amplify';

export const LoginInUser = (username, password) =>  Auth.signIn(username, password).then(successData => successData);
  