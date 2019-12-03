import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import {rootReducer} from '../reducers/rootReducer';
import rootSaga from '../sagas/index'

const sagaMiddleware = createSagaMiddleware();

const enhancers = composeWithDevTools(

  applyMiddleware(sagaMiddleware)
);

  const configureStore = () => {
        const Store = createStore(
          rootReducer,
          enhancers,
        );
       sagaMiddleware.run(rootSaga);
        return Store;
  }

  export default configureStore;
  