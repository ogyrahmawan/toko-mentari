import axios from '../../axios/config' 
import { LOADING, SET_PRODUCT } from '../types'

interface Product {
  id?: number,
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
      dispatch(fetchProductAction())
    })
    .catch(err => {
      console.log(err)
    })
}
export const fetchProductAction = () => (dispatch:any) => {
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
export const editProductAction = (payload:Product) => (dispatch:any) => {
  axios({
    url: `/products/${payload.id}`,
    method: 'PUT',
    headers: {
      access_token: localStorage.access_token
    },
    data: {
      name: payload.name,
      image_url: payload.image,
      price: payload.price,
      categoryName: payload.categoryName
    }
  })
    .then(res => {
      dispatch(fetchProductAction())
    })
    .catch(err => {
      console.log(err)
    })
}
export const deleteProductAction = (id:number) => (dispatch:any) => {
  axios({
    url: `/products/${id}`,
    method: 'DELETE',
    headers: {
      access_token: localStorage.access_token
    }
  })
    .then(res => {
      dispatch(fetchProductAction())
    })
    .catch(err => {
      console.log(err)
    })
}
