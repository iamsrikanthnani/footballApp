import * as types from '../../types/sagas/';

// Authentication Actions
export const loginUserSagaAction = payload => ({type: types.loginUserSagaType, payload });
export const signupUserSagaAction = payload => ({type: types.signUpUserSagaType, payload });
