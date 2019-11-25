import * as types from '../../types/sagas/'
// LoginUser
export const loginUserSagaAction = payload => ({type: types.loginUserSagaType, payload });

// GetProfileInfo
export const getProfileInfoSagaAction = payload => ({type: types.getProfileInfoSagaType, payload });
