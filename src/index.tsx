import React from 'react'
import ReactDOM from 'react-dom'
import * as jquery from 'jquery'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import rootReducer from './reducers'
import middleware from './middleware'

import { loadExercises, loadConditions } from './actions/init'

const store = createStore(rootReducer, middleware);

jquery.getJSON('https://raw.githubusercontent.com/andyzg/doif/master/content/exercises.json', (data) => {
  console.log(data)
  store.dispatch(loadExercises(data))
})

console.log('req');
jquery.get('https://raw.githubusercontent.com/andyzg/doif/master/content/selector.json', (data) => {
  let d = JSON.parse(data);
  console.log(d)
  store.dispatch(loadConditions(d['conditions']))
})


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
