import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
// import { devToolsEnhancer } from 'redux-devtools-extension';
import { rootReducer } from './reducers/rootReducer';
import rootSaga from '../../src/state/sagas/index';


// const configureStore = () => {
//   return createStore(rootReducer, devToolsEnhancer());
// }

// const sagaMiddleware = createSagaMiddleware();

// const enhancers = composeWithDevTools(
//   devToolsEnhancer(),
//   applyMiddleware(sagaMiddleware)
// );
// const configureStore = () => {
//   return createStore(rootReducer, enhancers)
//   sagaMiddleware.run(rootSaga)
// }
// // sagaMiddleware.run(rootSaga)

// export default configureStore;




const sagaMiddleware = createSagaMiddleware();

const enhancers = composeWithDevTools(
  // devToolsEnhancer(),
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