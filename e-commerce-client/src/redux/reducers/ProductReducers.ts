import {productInitialState, SET_PRODUCT, LOADING, ProductAction} from '../types'

const initialState: productInitialState = {
  data: [],
  loading: false
}

const productReducers  = (state = initialState, action: ProductAction) => {
  switch (action.type) {
    case SET_PRODUCT:
      return {...state, data: action.payload}
    case LOADING:
      return {...state, loading: !state.loading}
    default:
      return state
  }
}

export default productReducers