import {SET_CATEGORIES, CategoriesAction, CategoryInitialState} from '../types'

const initialState: CategoryInitialState = {
  data: []
}
const categoryReducer = (state = initialState, action: CategoriesAction) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {...state, data:action.payload}
    default:
      return state
  }
}

export default categoryReducer