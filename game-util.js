var client = require('./redis-client').getClient();
var db = require('./db')(client);
var fakerdb = require('./faker-db')(client);
var io = require('./socket-connection');

function constructParticipants(uuids, names, votes, status) {
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

function createUUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

module.exports = {
  getRoomSockets,
  refreshParticipants,
  createUUID
}
