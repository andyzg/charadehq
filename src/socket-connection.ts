import store from './store'

let socket = io('localhost:3000/')

socket.on('connect', () => {
  socket.on('get-participants', (data) => {
    console.log('get part: ', data);
  });
  socket.on('refresh-participants', (data) => {
    console.log('get part: ', data);
  });
});

export default socket
