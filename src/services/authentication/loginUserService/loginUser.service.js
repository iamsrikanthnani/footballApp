import { Auth } from '../../../../node_modules/aws-amplify'

// AWS Cognito Auth Methods //
export const loginUserService = (username, password) => Auth.signIn(username, password).then(successData => successData)
  // await Auth.currentSession().then(data => data)

// global.fetch = require('node-fetch');
// var AmazonCognitoIdentity = require('amazon-cognito-identity-js');

// import * as AWS from 'aws-sdk/global';

// var authenticationData = {
// 	Username: 'edbraouf@gmail.com',
// 	Password: 'Allahis1',
// };

// var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
// 	authenticationData
// );

// var poolData = {
// 	UserPoolId: 'us-east-2_16dzsMBfb', // Your user pool id here
// 	ClientId: '2k7kf0227cl7qme8fhcvmj18in', // Your client id here
// };

// var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// var userData = {
// 	Username: 'edbraouf@gmail.com',
// 	Pool: userPool,
// };

// var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);


// export const loginUserService = () => {
//   cognitoUser.authenticateUser(authenticationDetails, {
    
//     onSuccess: function(result) {
//       var accessToken = result.getAccessToken().getJwtToken();

//       //POTENTIAL: Region needs to be set if not already set previously elsewhere.
//       AWS.config.region = '<us-east-2>';

//       AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//         IdentityPoolId: 'us-east-2:86aae5f3-323d-4572-b47f-cfe57c746c4b', // your identity pool id here
//         Logins: {
//           // Change the key below according to the specific region your user pool is in.
//           'cognito-idp.<us-east-2>.amazonaws.com/<us-east-2_16dzsMBfb>': result
//             .getIdToken()
//             .getJwtToken(),
//         },
//       });

//       //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
//       AWS.config.credentials.refresh(error => {
//         if (error) {
//           console.error(error);
//         } else {
//           // Instantiate aws sdk service objects now that the credentials have been updated.
//           // example: var s3 = new AWS.S3();
//           console.log('Successfully logged!');
//         }
//       });
//     },

//     onFailure: function(err) {
//       alert(err.message || JSON.stringify(err));
//     },
// })
// };


