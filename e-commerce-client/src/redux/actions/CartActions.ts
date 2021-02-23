import axios from '../../axios/config'
import { SET_CART } from '../types'

export const setCart = (payload:any) => {
  return {
    type: SET_CART,
    payload
  }
}

export const fetchCartActions = () => (dispatch: any) => {
  axios({
    url: '/cart',
    method: 'GET',
    headers: {
      access_token: localStorage.access_token
    }
  })
    .then(res => {
      dispatch(setCart(res.data))
    })
    .catch(err => {
      console.log(err)
    })
}

export const addProductToCartActions = (id:number) => (dispatch: any) => {
  axios({
    url: '/cart',
    method: 'POST',
    headers: {
      access_token: localStorage.access_token
    },
    data: {
      ProductId: id
    }
  })
    .then(res => {
      console.log(res.data)
      dispatch(fetchCartActions())
    })
    .catch(err => {
      console.log(err)
    })
}
export const removeCartActions = (id:number) => (dispatch:any) => {
  axios({
    url: `/cart/${id}`,
    method: 'DELETE',
    headers: {
      access_token: localStorage.access_token
    }
  })
    .then(res => {
      dispatch(fetchCartActions())
      
    })
    .catch(err => {
      dispatch(fetchCartActions())
      console.log(err)
    })
}