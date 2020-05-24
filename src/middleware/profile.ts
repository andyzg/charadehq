import { SET_NAME } from '../actions/index'
import socket from '../socket-connection'

export default store => next => action => {
  try {
    if (action.type === SET_NAME) {
      console.log('setting the name', action.name);
      socket.emit('set-name', action.name);
    }
    next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    throw err
  }
}
