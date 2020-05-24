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

      // Functions
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

      function getParticipants(socketId) {

        socket.emit('get-participants', Object.keys(io.sockets.adapter.rooms[r].sockets));
        // room.getRoom(socketId, (err, reply) => {
        //   console.log(reply);
        //   socket.emit('get-participants', reply);
        // });
      }

      // TODO: Cleanup
      socket.join(r, (err) => {
        if (err) { console.log(err); }

        // Connection handling
        console.log('a user connected to ', r);
        socket.on('disconnect', () => {
          console.log('user disconnected');
          room.deleteConnection(socket.id);

          socket.removeListener('hello', onHello);
          socket.disconnect();
        });

        // Events
        socket.on('hello', onHello);
        socket.on('message', onMessage);
        socket.on('get-participants', getParticipants);
      });
    });
  }
}
