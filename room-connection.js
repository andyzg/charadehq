var client = require('./redis-client').getClient();
var room = require('./room')(client);

module.exports = {
  init: (io) => {
    // TODO: Everytime the server reloads, the client socket ids change.
    // Need to have a persistent UUID on the client side
    io.on('connect', (socket) => {
      var r = socket.request.headers.referer.split('/').pop();
      r = r.split('?')[0];

      room.addConnection(socket.id, r, (err, reply) => {
        console.log('Added connection: ', reply);
      });

      // Functions
      function onDisconnect() {
        console.log('user disconnected');
        room.deleteConnection(socket.id);

        socket.removeListener('hello', onHello);
        socket.disconnect();
      }

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

      function setName(name) {
        room.setName(socket.id, name);
        refreshParticipants();
      }

      function refreshParticipants() {
        let socketIds = Object.keys(io.sockets.adapter.rooms[r].sockets)
        room.getParticipantNames(socketIds, (err, reply) => {
          io.to(r).emit('refresh-participants', reply);
        });
      }

      socket.join(r, (err) => {
        if (err) { console.log(err); }
        // TODO: Pull client data such as names and socket ID. Do not pull any
        // score since that should be stored on backend
        socket.emit('get-name', (data) => {
          console.log('Initializing name for ', socket.id);
          setName(data);
        });

        // Connection handling
        console.log(socket.id, 'connected to ', r);
        // TODO: I think this can be removed.
        // refreshParticipants();

        // Events
        socket.on('disconnect', onDisconnect);
        socket.on('hello', onHello);
        socket.on('message', onMessage);
        socket.on('get-participants', getParticipants);
        socket.on('set-name', setName);
      });
    });
  }
}
