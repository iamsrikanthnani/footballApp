import {requestingType, successType, failType} from '../../types/genericTypes/Generic.types'

const requestingInitialState = {
  requesting: null,
};

export const requestingReducer = (state = requestingInitialState, action ) => {
  const { type } = action;
  if(type === requestingType ){
    return{
      ...state,
      requesting: true,
      error: null
    }
  }
};


const successInitialState = {
  result: null,
}
export const successReducer = (state = successInitialState, action ) => {
  const {type, payload} = action
  if(type === successType ){
    return{
      ...state,
      result: payload
    }
  }
  
  return state;  
};

const failInitialState = {
  error: null,
}

export const failReducer = (state = failInitialState, action ) => {
  const {type, payload} = action
  if(type === failType ){
    return{

      ...state,
      result: null,
      error: payload
    }
  }
  
  return state;  
};

