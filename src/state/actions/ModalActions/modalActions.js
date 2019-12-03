import { showModalType, hideModalType } from "../../types/ModalTypes/modalTypes"

export const showModalAction = payload => ({ type: showModalType, payload });
export const hideModalAction = payload => ({ type: hideModalType, payload });
