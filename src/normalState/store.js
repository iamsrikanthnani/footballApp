import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import {rootReducer} from '../state/reducers/rootReducer';
import rootSaga from '../../src/state/sagas/index';

const sagaMiddleware = createSagaMiddleware();

const enhancers = composeWithDevTools(

  applyMiddleware(sagaMiddleware)
);

  const configureStore = () => {
        const Store = createStore(
          rootReducer,
          enhancers,
        );
       // use the same saga middleware that you have enhanced your store with
       sagaMiddleware.run(rootSaga);
        return Store;
  }

  export default configureStore;
  