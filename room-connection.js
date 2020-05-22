module.exports = {
  init: (io) => {
    io.on('connect', (socket) => {
      console.log(socket.id);

      function onHello(data) {
        console.log('hello');
        io.to('room').emit('chat-message', data);
      }

      // TODO: Cleanup
      socket.join('room' , (err) => {
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
