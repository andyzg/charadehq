import store from './store'
import { refreshParticipants } from './actions/index'
import profile from './util/profile'

let socket = io('localhost:3000/')

socket.on('connect', () => {
  socket.on('get-participants', (data) => {
    console.log('get part: ', data);
  });
  socket.on('refresh-participants', (data) => {
    console.log('get part: ', data);
    store.dispatch(refreshParticipants(data))
  });
  socket.on('get-name', (cb) => {
    console.log('get my name!');
    cb(profile.getName());
  });
});

export default socket
