import React from 'react'
import ReactDOM from 'react-dom'
import * as jquery from 'jquery'
import { Provider } from 'react-redux'
import store from './store'
import App from './components/App'

import { loadExercises, loadConditions } from './actions/init'

// import socket from './socket-connection'
// socket;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
