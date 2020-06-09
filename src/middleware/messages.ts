import { SEND_MESSAGE, SUBMIT_PROMPT, setUserStatus } from '../actions/index'
import { SET_STATE } from '../actions/faker'
import { WRITE_ANSWER } from '../models/FakerState'
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
    } else if (action.type === SET_STATE) {
      switch (action.data.event) {
        case SUBMIT_PROMPT:
          console.log('User has submitted a prompt');
          store.dispatch(setUserStatus(action.data.payload))
          break;
        case WRITE_ANSWER:
          console.log('Writing an answer');
          break;
      }
    }
    next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    throw err
  }
}
