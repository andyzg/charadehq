import { createStore } from 'redux'
import rootReducer from './reducers'
import middleware from './middleware'

let store = createStore(rootReducer, middleware);

export default store
