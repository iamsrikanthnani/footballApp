


global.fetch = require('node-fetch');
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
import * as AWS from 'aws-sdk/global';
import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
} from 'amazon-cognito-identity-js';

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



export const authenticateUser = () => {

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

  // var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  
  var userData = {
    Username: 'edbraouf@gmail.com',
    Pool: userPool,
  };

  var cognitoUser = new AmazonCognitoIdentity.CognitoUserPool(userData);






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





export const signUpUser = (email, password) => {

  // Simple sign up as follows //
  // export const signupUserService = (username, password) =>  Auth.signUp(username, password).then(successData => successData);

    const userPool = new CognitoUserPool({
      UserPoolId: 'us-east-2_16dzsMBfb', // Your user pool id here
      ClientId: '2k7kf0227cl7qme8fhcvmj18in', // Your client id here
    });
    const attributeList = [];
    attributeList.push(new CognitoUserAttribute({
        Name: 'email',
        Value: email
    }));
    return new Promise((resolve, reject) =>
        userPool.signUp(email, password, attributeList, null, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result.user);
        })
    );
};


export function confirmUserRegistration () {
  var userData = {
    Username: 'edbraouf@gmail.com',
    Pool: userPool,
  };
  
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  
  
  cognitoUser.confirmRegistration("272332", true, function(err, result) {
    if (err) {
      alert(err.message || JSON.stringify(err));
      return;
    }
    console.log('call result: ' + result);
  });
};


export const deleteUser = () => {
  cognitoUser.deleteUser(function(err, result) {
    if (err) {
      alert(err.message || JSON.stringify(err));
      return;
    }
    console.log('call result: ' + result);
  });
}


// Works properly 
export const forgotPassword = () => {

cognitoUser.forgotPassword({
	onSuccess: function(data) {
		// successfully initiated reset password request
		console.log('CodeDeliveryData from forgotPassword: ', data);
	},
	onFailure: function(err) {
		// alert(err.message || JSON.stringify(err));
		alert(err.message || JSON.stringify(err));
  },
  
	//Optional automatic callback
// inputVerificationCode: function(data) {
// 		console.log('Code sent to: ' + data);
// 		var verificationCode = '202220'
// 		var newPassword = 'Allahis1'
// 		cognitoUser.confirmPassword(verificationCode, newPassword, {
// 			onSuccess() {
// 				console.log('Password confirmed!');
// 			},
// 			onFailure(err) {
// 				console.log('Password not confirmed!');
// 			},
// 		});
// 	},
});
};

// works properly 
export const newPasswordVerification = () => {
  /* function(data) { */
		// console.log('Code sent to: ' + data);
		var verificationCode = '202220'
		var newPassword = 'Allahis1'
		cognitoUser.confirmPassword(verificationCode, newPassword, {
			onSuccess() {
				console.log('Password confirmed!');
			},
			onFailure(err) {
				console.log('Password not confirmed!');
			},
		});
	// }
}









































// Usage
// The usage examples below use the unqualified names for types in the Amazon Cognito Identity SDK for JavaScript. Remember to import or qualify access to any of these types:

// When using loose Javascript files:
// var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

// Modules, e.g. Webpack:
// var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
// // var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

// // ES Modules, e.g. transpiling with Babel
// import {
// 	CognitoUserPool,
// 	CognitoUserAttribute,
// 	CognitoUser,
// } from 'amazon-cognito-identity-js';

// // Use case 1. Registering a user with the application. One needs to create a CognitoUserPool object by providing a UserPoolId and a ClientId and signing up by using a username, password, attribute list, and validation data.

// var poolData = {
// 	UserPoolId: '...', // Your user pool id here
// 	ClientId: '...', // Your client id here
// };
// var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// var attributeList = [];

// var dataEmail = {
// 	Name: 'email',
// 	Value: 'email@mydomain.com',
// };

// var dataPhoneNumber = {
// 	Name: 'phone_number',
// 	Value: '+15555555555',
// };
// var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
// var attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(
// 	dataPhoneNumber
// );

// attributeList.push(attributeEmail);
// attributeList.push(attributePhoneNumber);

// userPool.signUp('username', 'password', attributeList, null, function(
// 	err,
// 	result
// ) {
// 	if (err) {
// 		alert(err.message || JSON.stringify(err));
// 		return;
// 	}
// 	var cognitoUser = result.user;
// 	console.log('user name is ' + cognitoUser.getUsername());
// });

// // Use case 2. Confirming a registered, unauthenticated user using a confirmation code received via SMS.

// var poolData = {
// 	UserPoolId: '...', // Your user pool id here
// 	ClientId: '...', // Your client id here
// };

// var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
// var userData = {
// 	Username: 'username',
// 	Pool: userPool,
// };

// var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
// cognitoUser.confirmRegistration('123456', true, function(err, result) {
// 	if (err) {
// 		alert(err.message || JSON.stringify(err));
// 		return;
// 	}
// 	console.log('call result: ' + result);
// });
// // Use case 3. Resending a confirmation code via SMS for confirming registration for a unauthenticated user.

// cognitoUser.resendConfirmationCode(function(err, result) {
// 	if (err) {
// 		alert(err.message || JSON.stringify(err));
// 		return;
// 	}
// 	console.log('call result: ' + result);
// });

// // Use case 4. Authenticating a user and establishing a user session with the Amazon Cognito Identity service.

// // import * as AWS from 'aws-sdk/global';

// var authenticationData = {
// 	Username: 'username',
// 	Password: 'password',
// };

// var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
// 	authenticationData
// );
// var poolData = {
// 	UserPoolId: '...', // Your user pool id here
// 	ClientId: '...', // Your client id here
// };
// var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
// var userData = {
// 	Username: 'username',
// 	Pool: userPool,
// };
// var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
// cognitoUser.authenticateUser(authenticationDetails, {
// 	onSuccess: function(result) {
// 		var accessToken = result.getAccessToken().getJwtToken();

// 		//POTENTIAL: Region needs to be set if not already set previously elsewhere.
// 		AWS.config.region = '<region>';

// 		AWS.config.credentials = new AWS.CognitoIdentityCredentials({
// 			IdentityPoolId: '...', // your identity pool id here
// 			Logins: {
// 				// Change the key below according to the specific region your user pool is in.
// 				'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>': result
// 					.getIdToken()
// 					.getJwtToken(),
// 			},
// 		});

// 		//refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
// 		AWS.config.credentials.refresh(error => {
// 			if (error) {
// 				console.error(error);
// 			} else {
// 				// Instantiate aws sdk service objects now that the credentials have been updated.
// 				// example: var s3 = new AWS.S3();
// 				console.log('Successfully logged!');
// 			}
// 		});
// 	},

// 	onFailure: function(err) {
// 		alert(err.message || JSON.stringify(err));
// 	},
// });


// // Note that if device tracking is enabled for the user pool with a setting that user opt-in is required, you need to implement an onSuccess(result, userConfirmationNecessary) callback, collect user input and call either setDeviceStatusRemembered to remember the device or setDeviceStatusNotRemembered to not remember the device.

// // Note also that if CognitoUser.authenticateUser throws ReferenceError: navigator is not defined when running on Node.js, follow the instructions on the following Stack Overflow post.

// // Use case 5. Retrieve user attributes for an authenticated user.

// cognitoUser.getUserAttributes(function(err, result) {
// 	if (err) {
// 		alert(err.message || JSON.stringify(err));
// 		return;
// 	}
// 	for (i = 0; i < result.length; i++) {
// 		console.log(
// 			'attribute ' + result[i].getName() + ' has value ' + result[i].getValue()
// 		);
// 	}
// });

// // Use case 6. Verify user attribute for an authenticated user.
// // Note that the inputVerificationCode method needs to be defined but does not need to actually do anything. If you would like the user to input the verification code on another page, you can set inputVerificationCode to null. If inputVerificationCode is null, onSuccess will be called immediately (assuming there is no error).

// cognitoUser.getAttributeVerificationCode('email', {
// 	onSuccess: function(result) {
// 		console.log('call result: ' + result);
// 	},
// 	onFailure: function(err) {
// 		alert(err.message || JSON.stringify(err));
// 	},
// 	inputVerificationCode: function() {
// 		var verificationCode = prompt('Please input verification code: ', '');
// 		cognitoUser.verifyAttribute('email', verificationCode, this);
// 	},
// });

// // Use case 7. Delete user attribute for an authenticated user.

// var attributeList = [];
// attributeList.push('nickname');

// cognitoUser.deleteAttributes(attributeList, function(err, result) {
// 	if (err) {
// 		alert(err.message || JSON.stringify(err));
// 		return;
// 	}
// 	console.log('call result: ' + result);
// });

// // Use case 8. Update user attributes for an authenticated user.

// var attributeList = [];
// var attribute = {
// 	Name: 'nickname',
// 	Value: 'joe',
// };
// var attribute = new AmazonCognitoIdentity.CognitoUserAttribute(attribute);
// attributeList.push(attribute);

// cognitoUser.updateAttributes(attributeList, function(err, result) {
// 	if (err) {
// 		alert(err.message || JSON.stringify(err));
// 		return;
// 	}
// 	console.log('call result: ' + result);
// });

// // Use case 9. Enabling MFA for a user on a pool that has an optional MFA setting for an authenticated user.
// // Note: this method is now deprecated. Please use setUserMfaPreference instead.

// cognitoUser.enableMFA(function(err, result) {
// 	if (err) {
// 		alert(err.message || JSON.stringify(err));
// 		return;
// 	}
// 	console.log('call result: ' + result);
// });

// // Use case 10. Disabling MFA for a user on a pool that has an optional MFA setting for an authenticated user.
// // Note: this method is now deprecated. Please use setUserMfaPreference instead.

// cognitoUser.disableMFA(function(err, result) {
// 	if (err) {
// 		alert(err.message || JSON.stringify(err));
// 		return;
// 	}
// 	console.log('call result: ' + result);
// });

// // Use case 11. Changing the current password for an authenticated user.

// cognitoUser.changePassword('oldPassword', 'newPassword', function(err, result) {
// 	if (err) {
// 		alert(err.message || JSON.stringify(err));
// 		return;
// 	}
// 	console.log('call result: ' + result);
// });

// // Use case 12. Starting and completing a forgot password flow for an unauthenticated user.

// // For example:

// {/* <body>
//     <label for="#code">Code: </label>
//     <input id="code"></input>
//     </br>
//     <label for="#new_password">New Password: </label>
//     <input id="new_password" type="password"></input>
//     <br/>
// </body> */}

// cognitoUser.forgotPassword({
// 	onSuccess: function(data) {
// 		// successfully initiated reset password request
// 		console.log('CodeDeliveryData from forgotPassword: ' + data);
// 	},
// 	onFailure: function(err) {
// 		alert(err.message || JSON.stringify(err));
// 	},
// 	//Optional automatic callback
// 	inputVerificationCode: function(data) {
// 		console.log('Code sent to: ' + data);
// 		var code = document.getElementById('code').value;
// 		var newPassword = document.getElementById('new_password').value;
// 		cognitoUser.confirmPassword(verificationCode, newPassword, {
// 			onSuccess() {
// 				console.log('Password confirmed!');
// 			},
// 			onFailure(err) {
// 				console.log('Password not confirmed!');
// 			},
// 		});
// 	},
// });
// // Use case 13. Deleting an authenticated user.

// cognitoUser.deleteUser(function(err, result) {
// 	if (err) {
// 		alert(err.message || JSON.stringify(err));
// 		return;
// 	}
// 	console.log('call result: ' + result);
// });

// // Use case 14. Signing out from the application.

// cognitoUser.signOut();

// // Use case 15. Global signout for an authenticated user(invalidates all issued tokens).

// cognitoUser.globalSignOut(callback);

// // Use case 16 with React Native.
// // In React Native, loading the persisted current user information requires an extra async call to be made:

// var poolData = {
// 	UserPoolId: '...', // Your user pool id here
// 	ClientId: '...', // Your client id here
// };
// var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// userPool.storage.sync(function(err, result) {
// 	if (err) {
// 	} else if (result === 'SUCCESS') {
// 		var cognitoUser = userPool.getCurrentUser();
// 		// Continue with steps in Use case 16
// 	}
// });

// // Use case 16. Retrieving the current user from local storage.

// var poolData = {
// 	UserPoolId: '...', // Your user pool id here
// 	ClientId: '...', // Your client id here
// };
// var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
// var cognitoUser = userPool.getCurrentUser();

// if (cognitoUser != null) {
// 	cognitoUser.getSession(function(err, session) {
// 		if (err) {
// 			alert(err.message || JSON.stringify(err));
// 			return;
// 		}
// 		console.log('session validity: ' + session.isValid());

// 		// NOTE: getSession must be called to authenticate user before calling getUserAttributes
// 		cognitoUser.getUserAttributes(function(err, attributes) {
// 			if (err) {
// 				// Handle error
// 			} else {
// 				// Do something with attributes
// 			}
// 		});

// 		AWS.config.credentials = new AWS.CognitoIdentityCredentials({
// 			IdentityPoolId: '...', // your identity pool id here
// 			Logins: {
// 				// Change the key below according to the specific region your user pool is in.
// 				'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>': session
// 					.getIdToken()
// 					.getJwtToken(),
// 			},
// 		});

// 		// Instantiate aws sdk service objects now that the credentials have been updated.
// 		// example: var s3 = new AWS.S3();
// 	});
// }

// // Use case 17. Integrating User Pools with Cognito Identity.

// var cognitoUser = userPool.getCurrentUser();

// if (cognitoUser != null) {
// 	cognitoUser.getSession(function(err, result) {
// 		if (result) {
// 			console.log('You are now logged in.');

// 			//POTENTIAL: Region needs to be set if not already set previously elsewhere.
// 			AWS.config.region = '<region>';

// 			// Add the User's Id Token to the Cognito credentials login map.
// 			AWS.config.credentials = new AWS.CognitoIdentityCredentials({
// 				IdentityPoolId: 'YOUR_IDENTITY_POOL_ID',
// 				Logins: {
// 					'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>': result
// 						.getIdToken()
// 						.getJwtToken(),
// 				},
// 			});
// 		}
// 	});
// }
// //call refresh method in order to authenticate user and get new temp credentials
// AWS.config.credentials.refresh(error => {
// 	if (error) {
// 		console.error(error);
// 	} else {
// 		console.log('Successfully logged!');
// 	}
// });

// // note that you can not replace the login key with a variable because it will be interpreted literally. if you want to use a variable, the resolution to issue 17 has a working example
// // Use case 18. List all remembered devices for an authenticated user. In this case, we need to pass a limit on the number of devices retrieved at a time and a pagination token is returned to make subsequent calls. The pagination token can be subsequently passed. When making the first call, the pagination token should be null.

// cognitoUser.listDevices(limit, paginationToken, {
// 	onSuccess: function(result) {
// 		console.log('call result: ' + result);
// 	},
// 	onFailure: function(err) {
// 		alert(err.message);
// 	},
// });

// // Use case 19. List information about the current device.

// cognitoUser.getDevice({
// 	onSuccess: function(result) {
// 		console.log('call result: ' + result);
// 	},
// 	onFailure: function(err) {
// 		alert(err.message || JSON.stringify(err));
// 	},
// });

// // Use case 20. Remember a device.

// cognitoUser.setDeviceStatusRemembered({
// 	onSuccess: function(result) {
// 		console.log('call result: ' + result);
// 	},
// 	onFailure: function(err) {
// 		alert(err.message || JSON.stringify(err));
// 	},
// });

// // Use case 21. Do not remember a device.

// cognitoUser.setDeviceStatusNotRemembered({
// 	onSuccess: function(result) {
// 		console.log('call result: ' + result);
// 	},
// 	onFailure: function(err) {
// 		alert(err.message || JSON.stringify(err));
// 	},
// });

// // Use case 22. Forget the current device.

// cognitoUser.forgetDevice({
// 	onSuccess: function(result) {
// 		console.log('call result: ' + result);
// 	},
// 	onFailure: function(err) {
// 		alert(err.message || JSON.stringify(err));
// 	},
// });

// // Use case 23. Authenticate a user and set new password for a user that was created using AdminCreateUser API.

//   var cognitoUser, sessionUserAttributes; // global variables to handle completeNewPasswordChallenge flow


//     cognitoUser.authenticateUser(authenticationDetails, {
//         onSuccess: function (result) {
//             // User authentication was successful
//         },

//         onFailure: function(err) {
//             // User authentication was not successful
//         },

//         mfaRequired: function(codeDeliveryDetails) {
//             // MFA is required to complete user authentication.
//             // Get the code from user and call
//             cognitoUser.sendMFACode(mfaCode, this)
//         },

//         newPasswordRequired: function(userAttributes, requiredAttributes) {
//             // User was signed up by an admin and must provide new
//             // password and required attributes, if any, to complete
//             // authentication.

//             // the api doesn't accept this field back
//             delete userAttributes.email_verified;

//             // store userAttributes on global variable
//             sessionUserAttributes = userAttributes;
//         }
//     });

//     // ... handle new password flow on your app
//   export const handleNewPassword = (newPassword) => {
//       cognitoUser.completeNewPasswordChallenge(newPassword, sessionUserAttributes);
//     }
// // Use case 24. Retrieve the MFA Options for the user in case MFA is optional.

// cognitoUser.getMFAOptions(function(err, mfaOptions) {
// 	if (err) {
// 		alert(err.message || JSON.stringify(err));
// 		return;
// 	}
// 	console.log('MFA options for user ' + mfaOptions);
// });

// // Use case 25. Authenticating a user with a passwordless custom flow.

// cognitoUser.setAuthenticationFlowType('CUSTOM_AUTH');

// cognitoUser.initiateAuth(authenticationDetails, {
// 	onSuccess: function(result) {
// 		// User authentication was successful
// 	},
// 	onFailure: function(err) {
// 		// User authentication was not successful
// 	},
// 	customChallenge: function(challengeParameters) {
// 		// User authentication depends on challenge response
// 		var challengeResponses = 'challenge-answer';
// 		cognitoUser.sendCustomChallengeAnswer(challengeResponses, this);
// 	},
// });

// // Use case 26. Using cookies to store cognito tokens
// // To use the CookieStorage you have to pass it in the constructor map of CognitoUserPool and CognitoUser (when constructed directly):

//  var poolData = {
//      UserPoolId : '...', // Your user pool id here
//      ClientId : '...', // Your client id here
//      Storage: new AmazonCognitoIdentity.CookieStorage({domain: ".yourdomain.com"})
//  };

//  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

//  var userData = {
//      Username: 'username',
//      Pool: userPool,
//      Storage: new AmazonCognitoIdentity.CookieStorage({domain: ".yourdomain.com"})
//  };

// // The CookieStorage object receives a map (data) in its constructor that may have these values:

// // data.domain Cookies domain (mandatory)
// // data.path Cookies path (default: '/')
// // data.expires Cookie expiration (in days, default: 365)
// // data.secure Cookie secure flag (default: true)
// // Use case 27. Selecting the MFA method and authenticating using TOTP.

// var authenticationData = {
// 	Username: 'username',
// 	Password: 'password',
// };
// var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
// 	authenticationData
// );
// var poolData = {
// 	UserPoolId: '...', // Your user pool id here
// 	ClientId: '...', // Your client id here
// };
// var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
// var userData = {
// 	Username: 'username',
// 	Pool: userPool,
// };
// var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

// cognitoUser.authenticateUser(authenticationDetails, {
// 	onSuccess: function(result) {
// 		var accessToken = result.getAccessToken().getJwtToken();
// 	},

// 	onFailure: function(err) {
// 		alert(err.message || JSON.stringify(err));
// 	},

// 	mfaSetup: function(challengeName, challengeParameters) {
// 		cognitoUser.associateSoftwareToken(this);
// 	},

// 	associateSecretCode: function(secretCode) {
// 		var challengeAnswer = prompt('Please input the TOTP code.', '');
// 		cognitoUser.verifySoftwareToken(challengeAnswer, 'My TOTP device', this);
// 	},

// 	selectMFAType: function(challengeName, challengeParameters) {
// 		var mfaType = prompt('Please select the MFA method.', ''); // valid values for mfaType is "SMS_MFA", "SOFTWARE_TOKEN_MFA"
// 		cognitoUser.sendMFASelectionAnswer(mfaType, this);
// 	},

// 	totpRequired: function(secretCode) {
// 		var challengeAnswer = prompt('Please input the TOTP code.', '');
// 		cognitoUser.sendMFACode(challengeAnswer, this, 'SOFTWARE_TOKEN_MFA');
// 	},

// 	mfaRequired: function(codeDeliveryDetails) {
// 		var verificationCode = prompt('Please input verification code', '');
// 		cognitoUser.sendMFACode(verificationCode, this);
// 	},
// });
// // Use case 28. Enabling and setting SMS MFA as the preferred MFA method for the user.

// smsMfaSettings = {
// 	PreferredMfa: true,
// 	Enabled: true,
// };
// cognitoUser.setUserMfaPreference(smsMfaSettings, null, function(err, result) {
// 	if (err) {
// 		alert(err.message || JSON.stringify(err));
// 	}
// 	console.log('call result ' + result);
// });
// // Use case 29. Enabling and setting TOTP MFA as the preferred MFA method for the user.

// totpMfaSettings = {
// 	PreferredMfa: true,
// 	Enabled: true,
// };
// cognitoUser.setUserMfaPreference(null, totpMfaSettings, function(err, result) {
// 	if (err) {
// 		alert(err.message || JSON.stringify(err));
// 	}
// 	console.log('call result ' + result);
// });
// // Use case 30. Authenticating a user with a user password auth flow.

// cognitoUser.setAuthenticationFlowType('USER_PASSWORD_AUTH');

// cognitoUser.authenticateUser(authenticationDetails, {
// 	onSuccess: function(result) {
// 		// User authentication was successful
// 	},
// 	onFailure: function(err) {
// 		// User authentication was not successful
// 	},
// 	mfaRequired: function(codeDeliveryDetails) {
// 		// MFA is required to complete user authentication.
// 		// Get the code from user and call
// 		cognitoUser.sendMFACode(verificationCode, this);
// 	},
// });
// // Use case 31. Retrieve the user data for an authenticated user.

// cognitoUser.getUserData(function(err, userData) {
// 	if (err) {
// 		alert(err.message || JSON.stringify(err));
// 		return;
// 	}
// 	console.log('User data for user ' + userData);
// });

// // If you want to force to get the user data from backend,
// // you can set the bypassCache to true
// cognitoUser.getUserData(
// 	function(err, userData) {
// 		if (err) {
// 			alert(err.message || JSON.stringify(err));
// 			return;
// 		}
// 		console.log('User data for user ' + userData);
// 	},
// 	{ bypassCache: true }
// );
// // Use case 32. Handling expiration of the Id Token.

// refresh_token = session.getRefreshToken(); // receive session from calling cognitoUser.getSession()
// if (AWS.config.credentials.needsRefresh()) {
// 	cognitoUser.refreshSession(refresh_token, (err, session) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			AWS.config.credentials.params.Logins[
// 				'cognito-idp.<YOUR-REGION>.amazonaws.com/<YOUR_USER_POOL_ID>'
// 			] = session.getIdToken().getJwtToken();
// 			AWS.config.credentials.refresh(err => {
// 				if (err) {
// 					console.log(err);
// 				} else {
// 					console.log('TOKEN SUCCESSFULLY UPDATED');
// 				}
// 			});
// 		}
// 	});
// }
