import React from 'react'
import ReactDOM from 'react-dom'
import * as jquery from 'jquery'
import { Provider } from 'react-redux'
import store from './store'
import App from './components/App'

import { loadExercises, loadConditions } from './actions/init'

jquery.getJSON('https://raw.githubusercontent.com/andyzg/doif/master/content/exercises.json', (data) => {
  store.dispatch(loadExercises(data))
})

console.log('req');
jquery.get('https://raw.githubusercontent.com/andyzg/doif/master/content/selector.json', (data) => {
  let d = JSON.parse(data);
  store.dispatch(loadConditions(d['conditions']))
})

import socket from './socket-connection'
socket;
import profile from './profile'
profile;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
