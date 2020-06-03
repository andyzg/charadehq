import { SEND_MESSAGE } from '../actions/index'
import socket from '../socket-connection'
import profile from '../util/profile'


export default store => next => action => {
  try {
    if (action.type === SEND_MESSAGE) {
      socket.emit('message', {
        message: action.message,
        uuid: profile.getUUID(),
        name: profile.getName(),
        datetime: new Date(),
        type: 'MESSAGE'
      });
    }
    next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    throw err
  }
}
