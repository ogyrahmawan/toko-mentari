import {createStore, applyMiddleware, combineReducers} from 'redux'
import productReducers from './reducers/ProductReducers'
import thunk from 'redux-thunk'
const rootReducers = combineReducers({
  product: productReducers
})

const store = createStore(
  rootReducers,
  applyMiddleware(thunk)
)
export type RootState = ReturnType<typeof rootReducers> 
export default store