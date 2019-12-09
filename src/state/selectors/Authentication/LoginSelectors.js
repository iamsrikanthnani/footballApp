import _ from 'lodash';
import { createSelector } from 'reselect';

export const authentication = state => state.Authentication

export const selectUserLogInisWaiting = createSelector(authentication, Authentication => _.get(Authentication.loginUser, 'isWaiting'));
export const loginSuccessResults = createSelector(authentication, Authentication => _.get(Authentication.LogIn, 'login_Result'))
export const isUserVerified = createSelector(loginSuccessResults, result => _.get(result, 'attributes.email_verified'))
