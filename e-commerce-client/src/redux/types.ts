// TYPE PRODUCT

export const SET_PRODUCT = "SET_PRODUCT"
export const LOADING = "LOADING"

export interface Product {
  name: string,
  image : string,
  price: number,
  CategoryId: number
}

export interface productInitialState {
  data: Product[],
  loading: boolean
}

interface SetProductAction {
  type: typeof SET_PRODUCT
  payload: Product[]
}

interface LoadingAction {
  type: typeof LOADING
}

export type ProductAction = SetProductAction | LoadingAction

//TYPES USER
export const SET_LOGIN_SUCCESS = "SET_LOGIN_SUCCESS"
export const SET_LOGIN_ERROR = "SET_LOGIN_ERROR"
export const SET_USER_DATA = "SET_USER_DATA"

export interface UserInitialState {
  userData: any
  success: boolean,
  error: boolean | string,
  loading: boolean
}

interface SetUserData {
  type: typeof SET_USER_DATA,
  payload: any
}
interface SetSuccess {
  type: typeof SET_LOGIN_SUCCESS
}
interface SetError {
  type: typeof SET_LOGIN_ERROR
}

export type UserAction = SetUserData | SetSuccess | SetError | LoadingAction