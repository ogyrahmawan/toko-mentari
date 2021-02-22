import {createStore, applyMiddleware, combineReducers} from 'redux'
import productReducers from './reducers/ProductReducers'
import thunk from 'redux-thunk'
import userReducer from './reducers/UserReducers'
import categoryReducer from './reducers/CategoriesReducers'
const rootReducers = combineReducers({
  product: productReducers,
  user: userReducer,
  category: categoryReducer
})

const store = createStore(
  rootReducers,
  applyMiddleware(thunk)
)
export type RootState = ReturnType<typeof rootReducers> 
export default store