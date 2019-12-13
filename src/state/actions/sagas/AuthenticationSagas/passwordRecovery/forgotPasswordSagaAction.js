import { forgotPasswordSagaType } from "../../../../types/sagas/forgotPasswordTypes/forgotPassword.Types";

export const forgotPasswordSagaAction = payload => ({ type: forgotPasswordSagaType, payload });
