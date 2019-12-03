import { combineReducers } from 'redux'
import LogInReducer from '../../../src/state/reducers/requests'
import { ModalReducer } from './ModalReducers/modalReducers';

export const rootReducer = combineReducers({
  Authentication: LogInReducer,
  Modal: ModalReducer
});
