


global.fetch = require('node-fetch');
// var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
// import * as AWS from 'aws-sdk/global';
import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
} from 'amazon-cognito-identity-js';

// Simple sign up as follows //
// import { Auth } from 'aws-amplify';
// export const signupUserService = (username, password) =>  Auth.signUp(username, password).then(successData => successData);

export const signupUserService = (email, password) => {
    const userPool = new CognitoUserPool({
      UserPoolId: 'us-east-2_16dzsMBfb', // Your user pool id here
      ClientId: '2k7kf0227cl7qme8fhcvmj18in', // Your client id here
    });
    const attributeList = [];

    attributeList.push(new CognitoUserAttribute({
        Name: 'email',
        Value: email
    }));

  // if wanted to add Phone attributes
  //   attributeList.push(new CognitoUserAttribute({
  //     Name: 'phone_number',
  //     Value: '+12064464475'
  // }));


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

