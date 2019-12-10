import { combineReducers } from 'redux'
import LogInReducer from '../../../src/state/reducers/requests'
import { ModalReducer } from './ModalReducers/modalReducers';
// import Forms from './forms/formsReducers';
// import { reducer as formReducer } from 'redux-form';
import { reducer as Forms } from 'redux-form';

export const rootReducer = combineReducers({
  Authentication: LogInReducer,
  Modal: ModalReducer,
  Forms
});
