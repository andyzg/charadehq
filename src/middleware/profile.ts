import { SET_NAME } from '../actions/index'
import Cookies from 'js-cookie'
import socket from '../socket-connection'

function makeid(length) {
   var result           = '';
   var characters       = 'abcdefghijklmnopqrstuvwxyz';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

let name = Cookies.get('name');
if (!name) {
  Cookies.set('name', makeid(8), { expires: 7 })
}
socket.emit('set-name', name);

export default store => next => action => {
  try {
    if (action.type === SET_NAME) {
      console.log('setting the name', action.name);
      Cookies.set('name', action.name, { expires: 7 })
      socket.emit('set-name', action.name);
    }
    next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    throw err
  }
}
