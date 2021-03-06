import React from 'react'
import ReactDOM from 'react-dom'
import * as jquery from 'jquery'
import { Provider } from 'react-redux'
import store from './store'
import App from './components/App'
import { init } from './actions/index'

store.dispatch(init())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
