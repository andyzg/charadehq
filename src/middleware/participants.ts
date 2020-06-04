import { START_VOTE } from '../models/FakerState'
import { SET_STATE } from '../actions/faker'
import { setAllStatus } from '../actions/index'


export default store => next => action => {
  try {
    if (action.type === SET_STATE) {
      if (action.data.event === START_VOTE) {
        console.log('START VOTE~!!!');
        store.dispatch(setAllStatus(action.data.payload))
      }
    }
    next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    throw err
  }
}

