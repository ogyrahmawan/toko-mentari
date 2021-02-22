import axios from '../../axios/config' 
import { LOADING, SET_PRODUCT } from '../types'

interface Product {
  name: string,
  image: string,
  price: number,
  categoryName: string
}

export const setProduct = (payload: any) => {
  return {
    type: SET_PRODUCT,
    payload
  }
}
export const setLoading = () => {
  return {
    type: LOADING
  }
}
export const addProduct = (payload:Product) => (dispatch:any) => {
  axios({
    url: '/products',
    method: 'POST',
    headers: {
      access_token: localStorage.access_token
    },
    data: payload
  })
    .then(res => {
      dispatch(fetchProduct())
    })
    .catch(err => {
      console.log(err)
    })
}
export const  fetchProduct = () => (dispatch:any) => {
  dispatch(setLoading())
  axios({
    url: '/products',
    method: 'GET',
    headers: {
      access_token: localStorage.access_token
    }
  })
    .then(res => {
      dispatch(setProduct(res.data))
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      dispatch(setLoading())
    })
}