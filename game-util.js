var client = require('./redis-client').getClient();
var db = require('./db')(client);
var fakerdb = require('./faker-db')(client);
var io = require('./socket-connection');

function constructParticipants(uuids, names, votes, status) {
  console.log('Construct participants', votes);
  if (uuids.length !== names.length) {
    console.log('constructParticipants WE GOT A PROBLEM!');
  }

  let data = {}
  for (let i = 0; i < uuids.length; i++) {
    let v = {}
    for (let j in votes) {
      if (votes[j] === uuids[i]) {
        v[j] = true
      }
    }

    data[uuids[i]] = {
      name: names[i],
      uuid: uuids[i],
      votes: v,
      status: (status ? status[uuids[i]] : null)
    };
  }
  return data
}

function getRoomSockets(r) {
  let room = io.getIo().sockets.adapter.rooms[r]
  if (room) {
    return Object.keys(room.sockets)
  }
  return []
}

function refreshParticipants(room) {
  let socketIds = getRoomSockets(room)

  db.getUUIDs(socketIds, (err, uuids) => {
    uuids = uuids.filter(Boolean);
    db.getParticipantNames(uuids, (err, reply) => {
      fakerdb.getVotes(room, (err, votes) => {
        fakerdb.getAnswers(room, (err, answers)  => {
          if (uuids && reply) {
            io.getIo().to(room).emit('refresh-participants', constructParticipants(uuids, reply, votes, answers));
          }
        });
      });
    });
  });
}

module.exports = {
  getRoomSockets,
  refreshParticipants
}
