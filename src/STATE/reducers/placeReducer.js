// placeReducer.js
import { ADD_PLACE } from "../types/types";

const initialState = {
  places: 'ss',
  userName: 'USERNAME'
};

const placeReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PLACE:
      return {
        ...state,
        /* places: state.places.concat({
          key: Math.random(),
          value: action.payload
        }), */
 /*        userName: 'state.userName' */
      };
    default:
      return state;
  }
}

export default placeReducer;
