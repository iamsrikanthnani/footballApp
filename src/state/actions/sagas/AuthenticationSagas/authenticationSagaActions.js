import * as types from '../../../types/sagas'

// Authentication Actions
export const loginUserAction = payload => ({type: types.loginUserSagaType, payload });
export const signupUserAction = payload => ({type: types.signUpUserSagaType, payload });
export const userConfirmationAction = payload => ({ type: types.userConfirmationSagaType, payload });
