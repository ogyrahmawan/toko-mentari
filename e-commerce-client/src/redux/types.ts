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