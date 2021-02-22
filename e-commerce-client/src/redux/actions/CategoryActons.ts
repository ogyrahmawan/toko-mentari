import axios from '../../axios/config'
import { SET_CATEGORIES } from '../types'

export const setCategories = (payload:any) => {
  return {
    type: SET_CATEGORIES,
    payload
  }
}
export const fetchCategoriesAction = () => (dispatch:any) => {
    axios({
      url: '/category',
      method: 'GET',
      headers: {
        access_token: localStorage.access_token
      }
    })
      .then(res => {
        dispatch(setCategories(res.data))
      })
      .catch(err => {
        console.log(err)
      })
}