import Cookies from 'js-cookie'
import socket from '../socket-connection'
import uuidUtil from './uuid'

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
  // Cookies.set('name', makeid(8), { expires: 7 })
}

export default {
  getName: () => {
    return Cookies.get('name');
  },
  isNameSet: () => {
    return Cookies.get('uuid');
  },
  getUUID: () => {
    return Cookies.get('uuid');
  },
  setUUID: () => {
    let uuid = Cookies.get('uuid');
    if (!uuid) {
      uuid = uuidUtil.createUUID()
      Cookies.set('uuid', uuid, { expires: 7 })
    }
    console.log('Setting uuid as ', uuid);
    socket.emit('set-uuid', uuid);
  },
  clearCookies: () => {
    Cookies.remove('name');
  }
}

