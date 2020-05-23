var client = require('./redis-client').getClient();
var room = require('./room')(client);

module.exports = {
  init: (io) => {
    io.on('connect', (socket) => {
      var r = socket.request.headers.referer.split('/').pop();
      r = r.split('?')[0];

      room.addConnection(socket.id, r, (err, reply) => {
        console.log('Added connection: ', reply);
      });

      function onMessage(data) {
        room.getRoom(socket.id, (err, reply) => {
          console.log('reply: ', reply);
          io.to(r).emit('chat-message', data);
        });
      }

      function onHello(data) {
        console.log('hello');
        io.to(r).emit('test', data);
      }

      // TODO: Cleanup
      socket.join(r, (err) => {
        if (err) { console.log(err); }
        console.log('a user connected to ', r);
        socket.on('disconnect', () => {
          console.log('user disconnected');
          room.deleteConnection(socket.id);

          socket.removeListener('hello', onHello);
          socket.disconnect();
        });

        socket.on('hello', onHello);

        socket.on('message', onMessage);
      });
    });
  }
}
