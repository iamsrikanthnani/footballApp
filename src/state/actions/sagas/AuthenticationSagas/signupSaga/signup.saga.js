import * as types from '../../../../types/sagas/index'

export const signupUserSagaAction = payload => ({type: types.signUpUserSagaType, payload });
export const userConfirmationActionSagaAction = payload => ({ type: types.userConfirmationSagaType, payload });
