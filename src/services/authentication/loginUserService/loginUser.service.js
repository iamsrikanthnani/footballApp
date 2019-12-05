import { Auth } from '../../../../node_modules/aws-amplify'

// AWS Cognito Auth Methods //
export const  loginInUserMethod = (username, password) =>  Auth.signIn(username, password).then(successData => successData)

