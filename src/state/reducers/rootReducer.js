import { combineReducers } from 'redux'

import loginUserReducer from '../../../src/state/reducers/requests'

export const rootReducer = combineReducers({
  login: loginUserReducer,
});
