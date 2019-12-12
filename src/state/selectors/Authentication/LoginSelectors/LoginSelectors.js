import _ from 'lodash';
import { createSelector } from 'reselect';

export const authentication = state => state.Authentication;
export const loginSuccessResults = createSelector(authentication, Authentication => _.get(Authentication.LogIn, 'login_Result'));

export const selectUserLogInisRequesting = createSelector(authentication, Authentication => _.get(Authentication.LogIn, 'isRequesting'));
export const isUserVerified = createSelector(loginSuccessResults, result => _.get(result, 'attributes.email_verified'));
export const loginErrorMessage = createSelector(authentication, Authentication => _.get(Authentication.LogIn, 'error.message'));
export const isUserHasAccessToken = createSelector(loginSuccessResults, login_Result => _.get(login_Result, 'signInUserSession.accessToken.jwtToken'));
export const isUserHasIDToken = createSelector(loginSuccessResults, login_Result => _.get(login_Result, 'signInUserSession.idToken.jwtToken'));
