import {SET_CART, CartInitialState, CartAction} from "../types"

const initialState: CartInitialState = {
  data: []
}
const cartReducer = (state = initialState, action: CartAction) => {
  switch (action.type) {
    case SET_CART:
      return {...state, data: action.payload}
    default:
      return state
  }
}

export default cartReducer