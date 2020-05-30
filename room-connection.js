var client = require('./redis-client').getClient();
var db = require('./db')(client);
var musictionary = require('./game/musictionary');

module.exports = {
  init: (io) => {
    // TODO: Everytime the server reloads, the client socket ids change.
    // Need to have a persistent UUID on the client side
    io.on('connect', (socket) => {
      var r = socket.request.headers.referer.split('/').pop();
      r = r.split('?')[0];

      db.addConnection(socket.id, r, (err, reply) => {
        console.log('Added connection: ', reply);
      });

      // Functions
      function onDisconnect() {
        console.log('user disconnected');
        db.deleteConnection(socket.id);

        socket.removeListener('hello', onHello);
        socket.disconnect();
      }

      function onMessage(data) {
        db.getRoom(socket.id, (err, reply) => {
          console.log('Messaging!!!', socket.id);
          io.to(r).emit('message', data);
        });
      }

      function onHello(data) {
        io.to(r).emit('test', data);
      }

      function getParticipants(socketId) {
        socket.emit('get-participants', Object.keys(io.sockets.adapter.rooms[r].sockets));
      }

      function setName(name) {
        db.setName(socket.id, name);
        refreshParticipants();
      }

      function setUUID(uuid) {
        db.setUUID(uuid, socket.id);
      }

      function onGameChange(state) {
        let nextState = musictionary.onGameChange(state);
        console.log('Next state:', nextState);
        io.to(r).emit('game-change', nextState);
      }

      function refreshParticipants() {
        let socketIds = Object.keys(io.sockets.adapter.rooms[r].sockets)
        db.getParticipantNames(socketIds, (err, reply) => {
          io.to(r).emit('refresh-participants', reply);
        });
      }

      socket.join(r, (err) => {
        if (err) { console.log(err); }
        // Connection handling
        console.log(socket.id, 'connected to ', r);

        // TODO: Pull client data such as names and socket ID. Do not pull any
        // score since that should be stored on backend
        socket.emit('get-profile', (data) => {
          setName(data.name);
          setUUID(data.uuid);
        });

        // Events
        socket.on('disconnect', onDisconnect);
        socket.on('hello', onHello);
        socket.on('message', onMessage);
        socket.on('get-participants', getParticipants);
        socket.on('set-name', setName);
        socket.on('set-uuid', setUUID);
        socket.on('game-change', onGameChange);
      });
    });
  }
}
