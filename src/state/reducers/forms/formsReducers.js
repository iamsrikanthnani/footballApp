import { combineReducers } from 'redux';
import { reducer as forms } from 'redux-form';

export default combineReducers({
  forms,
});



// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import { reducer as formReducer } from 'redux-form';
// import { formPersistKey } from '../persistKeys';

// const persistConfig = {
//   storage,
//   key: 'form',
//   // blacklist: ['createAccount'],
// };

// export default persistReducer(persistConfig, formReducer);


// import { combineReducers } from 'redux-immutable';
// import { reducer as formReducer } from 'redux-form'; // <--- immutable import

// const reducer = combineReducers({ formReducer })

// export default reducer;
