import { combineReducers } from 'redux'
import LogInReducer from '../../../src/state/reducers/requests'
import { ModalReducer } from './ModalReducers/modalReducers';
import formsReducers from './formsReducers/formsReducers';
// import { reducer as formReducer } from 'redux-form';


export const rootReducer = combineReducers({
  Authentication: LogInReducer,
  Modal: ModalReducer,
  Forms: formsReducers
});
