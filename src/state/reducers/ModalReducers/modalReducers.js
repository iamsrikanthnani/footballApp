import { showModalType, hideModalType } from "../../types/ModalTypes/modalTypes";

const getInitialState = () => ({
  modalVisibility: false,
  children: null
});

export const ModalReducer = (state = getInitialState(), action) => {
  const { type, payload } = action;
  
  if (type === showModalType) {
    return{
      ...state,
      modalVisibility: !state.modalVisibility,
      children: payload
    };
  } else if (type === hideModalType) {
    return {
      ...state,
      modalVisibility: !state.modalVisibility,
      children: null
    }
  }
  return state;
};

