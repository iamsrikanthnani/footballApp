// import {requestingType, successType, failType} from '../../types/genericTypes/Generic.types'

// const initialState = {
//   isUSARequesting: null,
//   error: null,
//   result: null,
//   timestamp: undefined,
// };

// export const genericReducerSet = (state = initialState, action) => {
//   const { type } = action;
//   switch (type) {
//     case requestingType: return {
//       isUSARequesting: true,
//       error: null,
//       result: null,
//     };
//     case successType: return {
//       ...state,
//       isUSARequesting: null,
//       error: null,
//       result: payload,
//       timestamp: Date.now(),
//     };
//     case failType:
//       return {
//         ...state,
//         isUSARequesting: null,
//         error: payload
//       }
//     default: return state;
//   }
// };

export const getInitialState = () => ({
  isWaiting: false,
  value: null,
  error: null,
  result: null,
  timestamp: undefined,
});

export default actionTypeSet => (state = getInitialState(), action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypeSet.Start: return {
      isWaiting: true,
      value: payload,
      error: null,
      result: null,
    };
    case actionTypeSet.Fail: return {
      ...state,
      isWaiting: false,
      error: payload,
      // leave value unmodified
    };
    case actionTypeSet.Succeed: return {
      ...state,
      isWaiting: false,
      error: null,
      result: payload,
      timestamp: Date.now(),
      // leave value unmodified
    };
    case actionTypeSet.Reset:
      return getInitialState();
    default: return state;
  }
};
















// const requestingInitialState = {
//   requesting: null,
// };

// export const requestingReducer = (state = requestingInitialState, action ) => {
//   const { type } = action;
//   if(type === requestingType ){
//     return{
//       ...state,
//       requesting: true,
//       error: null
//     }
//   }
// };


// const successInitialState = {
//   result: null,
// }
// export const successReducer = (state = successInitialState, action ) => {
//   const {type, payload} = action
//   if(type === successType ){
//     return{
//       ...state,
//       result: payload
//     }
//   }
  
//   return state;  
// };

// const failInitialState = {
//   error: null,
// }

// export const failReducer = (state = failInitialState, action ) => {
//   const {type, payload} = action
//   if(type === failType ){
//     return{

//       ...state,
//       result: null,
//       error: payload
//     }
//   }
  
//   return state;  
// };

