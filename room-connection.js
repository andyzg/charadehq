var client = require('./redis-client').getClient();
var db = require('./db')(client);
var fakerdb = require('./faker-db')(client);
var faker = require('./game/faker');

module.exports = {
  init: (io) => {
    // TODO: Everytime the server reloads, the client socket ids change.
    // Need to have a persistent UUID on the client side
    io.on('connect', (socket) => {
      var r = socket.request.headers.referer.split('/').pop();
      r = r.split('?')[0];

      // Functions
      function onDisconnect() {
        console.log('user disconnected');
        db.deleteConnection(socket.id);
        refreshParticipants();

        socket.disconnect();
      }

      function onMessage(data) {
        db.getRoom(data.uuid, (err, reply) => { console.log('Messaging!!!', data.uuid); io.to(r).emit('message', {
            message: data.message,
            uuid: data.uuid,
            datetime: data.datetime,
            name: data.name
          });
        });
      }

      function getRoomSockets() {
        let room = io.sockets.adapter.rooms[r]
        if (room) {
          return Object.keys(room.sockets)
        }
        return []
      }

      function getParticipants(socketId) {
        db.getUUIDs(getRoomSockets(), (err, uuids) => {
          socket.emit('get-participants', getRoomSockets());
        });
      }

      function setName(uuid, name) {
        if (!name) {
          return
        }
        db.setName(uuid, name);
        refreshParticipants();
      }

      function setUUID(uuid) {
        db.setUUID(socket.id, uuid);
      }

      function onGameChange(state) {
        let nextState = faker.onGameChange(state);
        console.log('Next state:', nextState);
        io.to(r).emit('game-change', nextState);
      }

      function constructParticipants(uuids, names) {
        if (uuids.length !== names.length) {
          console.log('constructParticipants WE GOT A PROBLEM!');
        }

        let data = []
        for (let i = 0; i < uuids.length; i++) {
          data.push({
            name: names[i],
            uuid: uuids[i]
          });
        }
        return data
      }

      function refreshParticipants() {
        let socketIds = getRoomSockets()

        db.getUUIDs(socketIds, (err, uuids) => {
          uuids = uuids.filter(Boolean);
          db.getParticipantNames(uuids, (err, reply) => {
            if (uuids && reply) {
              io.to(r).emit('refresh-participants', constructParticipants(uuids, reply));
            }
          });
        });
      }

      function onSubmitAnswer(data) {
        console.log('On submit answer', data);
        fakerdb.addAnswer(data.room, data.source, data.answer);
      }

      socket.join(r, (err) => {
        if (err) { console.log(err); }
        refreshParticipants();

        // Connection handling
        console.log(socket.id, 'connected to ', r);

        // TODO: Pull client data such as names and socket ID. Do not pull any
        // score since that should be stored on backend
        socket.emit('get-profile', (data) => {
          if (data.name) {
            setName(data.uuid, data.name);
          }

          setUUID(data.uuid);

          // Add connection to the room
          db.addConnection(data.uuid, r, (err, reply) => {
            console.log('Added connection: ', reply);
          });
        });

        // Events
        socket.on('disconnect', onDisconnect);
        socket.on('message', onMessage);
        socket.on('get-participants', getParticipants);
        socket.on('set-name', setName);
        socket.on('set-uuid', setUUID);
        socket.on('game-change', onGameChange);
        socket.on('faker-submit-answer', onSubmitAnswer);
      });
    });
  }
}
