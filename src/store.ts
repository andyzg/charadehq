import { createStore, compose } from 'redux'
import rootReducer from './reducers'
import middleware from './middleware'

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(rootReducer, composeEnhancers(middleware));

export default store
