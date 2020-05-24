import store from './store'

let socket = io('localhost:3000/')

socket.on('connect', () => {
  setTimeout(() => {
    console.log('getting participants', socket.id);
    socket.emit('get-participants', socket.id);
  });
  socket.on('get-participants', (data) => {
    console.log('get part: ', data);
  });
});

export default socket
