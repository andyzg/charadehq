var client = require('./redis-client').getClient();
var room = require('./room')(client);

module.exports = {
  init: (io) => {
    io.on('connect', (socket) => {
      var r = socket.request.headers.referer.split('/').pop();
      r = r.split('?')[0];

      room.addConnection(socket.id, r);

      function onMessage(data) {
        io.to('room').emit('chat-message', data);
      }

      function onHello(data) {
        console.log('hello');
        io.to('room').emit('test', data);
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

        socket.on('message', onMessage);
      });
    });
  }
}
