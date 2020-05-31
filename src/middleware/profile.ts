import { SET_NAME } from '../actions/index'
import profile from '../util/profile'
import Cookies from 'js-cookie'
import socket from '../socket-connection'

export default store => next => action => {
  try {
    if (action.type === SET_NAME) {
      console.log('setting the name', action.name);
      Cookies.set('name', action.name, { expires: 7 })
      socket.emit('set-name', profile.getUUID(), action.name);
    }
    next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    throw err
  }
}
