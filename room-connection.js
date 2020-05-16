module.exports = {
  createRoom: (io, roomName) => {
    console.log('Creating room called', roomName);
    console.log(io.eventNames());

    io.on('connect', (socket) => {
      console.log(socket.id);
      function onHello(data) {
        console.log('yeeeeee', data);
        socket.emit('chat-message', data);
      }

      socket.join(roomName, (err) => {
        if (err) { console.log(err); }
        console.log('a user connected');
        socket.on('disconnect', () => {
          console.log('user disconnected');

          socket.removeListener('hello', onHello);
          socket.disconnect();
        });

        socket.on('hello', onHello);
      });
    });
  }
}
