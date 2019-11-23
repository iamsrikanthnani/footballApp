// store.js

import { createStore, combineReducers } from 'redux';
import placeReducer from './reducers/placeReducer';
import { loginReducer } from './reducers/loginReducer';
import { devToolsEnhancer } from 'redux-devtools-extension';


const rootReducer = combineReducers({
  login: loginReducer,
  places: placeReducer
});

const configureStore = () => {
  return createStore(rootReducer);
}

// , devToolsEnhancer()

export default configureStore;






// mport { createStore } from 'redux';
// import { devToolsEnhancer } from 'redux-devtools-extension';

// const store = createStore(reducer, /* preloadedState, */ devToolsEnhancer(
//   // Specify name here, actionsBlacklist, actionsCreators and other options if needed
// ));

// "debug": "open 'rndebugger://set-debugger-loc?host=localhost&port=8081' "