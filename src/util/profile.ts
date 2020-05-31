import Cookies from 'js-cookie'
import socket from '../socket-connection'

function createUUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

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
      Cookies.set('uuid', createUUID(), { expires: 7 })
    }
    console.log('Setting uuid as ', uuid);
    socket.emit('set-uuid', uuid);
  },
  clearCookies: () => {
    Cookies.remove('name');
  }
}

