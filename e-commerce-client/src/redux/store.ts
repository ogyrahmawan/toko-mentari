import {createStore, applyMiddleware, combineReducers} from 'redux'
import productReducers from './reducers/ProductReducers'
import thunk from 'redux-thunk'
import userReducer from './reducers/UserReducers'
const rootReducers = combineReducers({
  product: productReducers,
  user: userReducer
})

const store = createStore(
  rootReducers,
  applyMiddleware(thunk)
)
export type RootState = ReturnType<typeof rootReducers> 
export default store