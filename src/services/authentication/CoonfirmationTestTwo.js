global.fetch = require('node-fetch');
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
import * as AWS from 'aws-sdk/global';

import awsConfig from '../../AWSconfiguration/awsConfig';
import { Auth } from '../../../node_modules/aws-amplify';


// import { Auth } from 'aws-amplify';

export async function SignInTwo(username, password) {
    try {
        const user = await Auth.signIn(username, password);
        if (user.challengeName === 'SMS_MFA' ||
            user.challengeName === 'SOFTWARE_TOKEN_MFA') {
            // You need to get the code from the UI inputs
            // and then trigger the following function with a button click
            console.log('SMS_MFA || SOFTWARE_TOKEN_MFA is required');
            /* const code = getCodeFromUserInput();
            // If MFA is enabled, sign-in should be confirmed with the confirmation code
            const loggedUser = await Auth.confirmSignIn(
                user,   // Return object from Auth.signIn()
                code,   // Confirmation code  
                mfaType // MFA Type e.g. SMS_MFA, SOFTWARE_TOKEN_MFA
            ); */
        } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
            /* const {requiredAttributes} = user.challengeParam; */ // the array of required attributes, e.g ['email', 'phone_number']
            // You need to get the new password and required attributes from the UI inputs
            // and then trigger the following function with a button click
            // For example, the email and phone_number are required attributes
            // const {username, email, phone_number} = getInfoFromUserInput();
            /* const loggedUser = await Auth.completeNewPassword(
                user,              // the Cognito User Object
                newPassword,       // the new password
                // OPTIONAL, the required attributes
                {
                    email,
                    phone_number,
                }
            ); */
            console.log('NEW_PASSWORD_REQUIRED');
        } else if (user.challengeName === 'MFA_SETUP') {
            // This happens when the MFA method is TOTP
            // The user needs to setup the TOTP before using it
            // More info please check the Enabling MFA part
            // Auth.setupTOTP(user);
            console.log('MFA_SETUP');
        } else {
            // The user directly signs in
            // console.log('Success', user);
            return user
        }
    } catch (err) {
        if (err.code === 'UserNotConfirmedException') {
            // The error happens if the user didn't finish the confirmation step when signing up
            // In this case you need to resend the code and confirm the user
            // About how to resend the code and confirm the user, please check the signUp part
        } else if (err.code === 'PasswordResetRequiredException') {
            // The error happens when the password is reset in the Cognito console
            // In this case you need to call forgotPassword to reset the password
            // Please check the Forgot Password part.
        } else if (err.code === 'NotAuthorizedException') {
            // The error happens when the incorrect password is provided
        } else if (err.code === 'UserNotFoundException') {
            // The error happens when the supplied username/email does not exist in the Cognito user pool
        } else {
            console.log(err);
        }
    }
}




// requires log in first
export const authenticateUserTwo = () => {

  var authenticationData = {
    Username: 'edbraouf@gmail.com',
    Password: 'Allahis1',
  };
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData
  );

  var poolData = {
    UserPoolId: 'us-east-2_16dzsMBfb', // Your user pool id here
    ClientId: '2k7kf0227cl7qme8fhcvmj18in', // Your client id here
  };

  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  
  var userData = {
    Username: 'edbraouf@gmail.com',
    Pool: userPool,
  };

  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function(result) {
      var accessToken = result.getAccessToken().getJwtToken();
  
      //POTENTIAL: Region needs to be set if not already set previously elsewhere.
      AWS.config.region = '<us-east-2>';
  
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-2:86aae5f3-323d-4572-b47f-cfe57c746c4b', // your identity pool id here
        Logins: {
          // Change the key below according to the specific region your user pool is in.
          'cognito-idp.<us-east-2>.amazonaws.com/<us-east-2_16dzsMBfb>': result
            .getIdToken()
            .getJwtToken(),
        },
      });
  
      //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
      AWS.config.credentials.refresh(error => {
        if (error) {
          console.error(error);
        } else {
          // Instantiate aws sdk service objects now that the credentials have been updated.
          // example: var s3 = new AWS.S3();
          console.log('Successfully logged!');
        }
      });
    },
  
    onFailure: function(err) {
      alert(err.message || JSON.stringify(err));
    },
  });
};

export const forgotPasswordTwo = () => {
  Auth.forgotPassword('edbraouf@gmail.com')
      .then( data => {
        console.log('actions.forgotPassword():Auth.forgotPassword() data:', data);

        // dispatch({ type: FORGOT_PASSWORD });
      })
      .catch( err => {
        console.error('actions.forgotPassword():Auth.forgotPassword() err:', err);

        // error -- invoke authError which dispatches AUTH_ERROR
        // dispatch(authError(err));
      });
}







export const getUserSession = () => {

  Auth.userSession(currentAuthUser).then(session => {
    console.log('actions.validateUserSession():Auth.userSession() session:', session);
    // finally invoke isValid() method on session to check if auth tokens are valid
    // if tokens have expired, lets call "logout"
    // otherwise, dispatch AUTH_USER success action and by-pass login screen
    if (session.isValid()) {
      console.log('fire user is authenticated');
      // fire user is authenticated
      // dispatch({ type: AUTH_USER });
      //history.push('/');
    } else {
      console.log('fire user is NOT authenticated');
      // fire user is unauthenticated
      // dispatch({ type: UNAUTH_USER });
      //history.push('/');
    }
  })
  .catch(err => {
    console.error('actions.validateUserSession():Auth.userSession() err:', err);
    // error occured during session validation, fire user is unauthenticated
    // dispatch({ type: UNAUTH_USER });
    //history.push('/');
  });

};





// export function forgotPassword( { username }, history ) {
//   return function(dispatch) {
//     console.log('actions.forgotPassword(): username: ', { username });

//     // forgotPassword (cognito)
//     Auth.forgotPassword(username)
//       .then( data => {
//         console.log('actions.forgotPassword():Auth.forgotPassword() data:', data);

//         dispatch({ type: FORGOT_PASSWORD });
//       })
//       .catch( err => {
//         console.error('actions.forgotPassword():Auth.forgotPassword() err:', err);

//         // error -- invoke authError which dispatches AUTH_ERROR
//         dispatch(authError(err));
//       });
//   }
// }
