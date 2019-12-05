import { Auth } from '../../../../node_modules/aws-amplify';

export const signupUserMethod = (username, password) =>  Auth.signUp(username, password).then(successData => successData);