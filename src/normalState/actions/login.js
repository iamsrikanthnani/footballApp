import { LOGIN_USER_TYPE } from "../types/types"

export const loginAction = credentials => ({ type: LOGIN_USER_TYPE, payload: credentials })