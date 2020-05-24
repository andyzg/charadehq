const DEV_PREFIX = 'DEV:'
const PROD_PREFIX = 'PROD:'

const ACTIVE_ROOMS = 'active-rooms';
const SOCKET_TO_ROOM = 'socket-to-room';
const SOCKET_TO_NAME = 'socket-to-name';

module.exports = function(client) {

  let ROOM_KEY = DEV_PREFIX + ACTIVE_ROOMS;
  let SOCKET_TO_ROOM_KEY = DEV_PREFIX + SOCKET_TO_ROOM;
  let SOCKET_TO_NAME_KEY = DEV_PREFIX + SOCKET_TO_NAME;

  function makeid(length) {
     var result           = '';
     var characters       = 'abcdefghijklmnopqrstuvwxyz';
     var charactersLength = characters.length;
     for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
     }
     return result;
  }

  function generateRoomId(length) {
    length = length ? length : 8;
    return makeid(length);
  }

  function getRoom(socketId, cb) {
    console.log(socketId);
    client.hmget(SOCKET_TO_ROOM_KEY, socketId, cb);
  }

  function getRooms(cb) {
    client.smembers(ROOM_KEY, cb);
  }

  function roomExists(roomId, cb) {
    console.log('Checking if room id exists: ', roomId);
    client.sismember(ROOM_KEY, roomId, (err, reply) => {
      cb(reply === 1);
    });
  }

  function clearRooms(cb) {
    client.del(ROOM_KEY, cb);
  }

  function clearConnections(cb) {
    client.del(ROOM_KEY, cb);
  }

  // Assume that the roomId is valid
  function addRoom(roomId, cb) {
    console.log('Addding room id: ', roomId);
    client.sadd(ROOM_KEY, roomId, cb)
  }

  function generateRoom(roomId, cb) {
    console.log('Generating room with: ', roomId);
    let rooms = getRooms((err, reply) => {
      let id = roomId ? roomId : makeid(8);
      addRoom(id, cb);
    });
  }

  function addConnection(socketId, r, cb) {
    console.log('Add connection: ', socketId);
    client.hmset(SOCKET_TO_ROOM_KEY, socketId, r, cb)
  }

  function deleteConnection(socketId, cb) {
    console.log('Delete connection: ', socketId);
    client.hdel(SOCKET_TO_ROOM_KEY, socketId, cb)
  }

  function setName(socketId, name, cb) {
    console.log('Set name ', socketId, name);
    client.hmset(SOCKET_TO_NAME_KEY, socketId, name, cb)
  }

  function getParticipantNames(socketIds, cb) {
    console.log('Get participant names', socketIds);
    client.hmget(SOCKET_TO_NAME_KEY, socketIds, cb)
  }

  return {
    getRooms,
    getRoom,
    clearRooms,
    generateRoom,
    generateRoomId,
    roomExists,
    addConnection,
    deleteConnection,
    setName,
    getParticipantNames
  }
}
