const DEV_PREFIX = 'DEV:'
const PROD_PREFIX = 'PROD:'

const ACTIVE_ROOMS = 'active-rooms';
const UUID_TO_ROOM = 'uuid-to-room';
const UUID_TO_NAME = 'uuid-to-name';
const UUID_TO_SOCKET_PREFIX = 'uuid-to-socket';
const SOCKET_TO_UUID = 'socket-to-uuid';
const ROOM_TO_UUID_PREFIX = 'room-to-uuid';
const ROOM_TO_FAKERS_PREFIX = 'room-to-fakers';

module.exports = function(client) {

  // List of rooms
  let ROOM_KEY = DEV_PREFIX + ACTIVE_ROOMS;

  // Client UUID to room
  let UUID_TO_ROOM_KEY = DEV_PREFIX + UUID_TO_ROOM;

  // Client UUID to name
  let UUID_TO_NAME_KEY = DEV_PREFIX + UUID_TO_NAME;

  // Client UUID to socket id
  let UUID_TO_SOCKET_PREFIX_KEY = DEV_PREFIX + UUID_TO_SOCKET_PREFIX;

  // Client UUID to socket id
  let SOCKET_TO_UUID_KEY = DEV_PREFIX + SOCKET_TO_UUID;

  // Socket UUID to client UUID
  let ROOM_TO_UUID_PREFIX_KEY = DEV_PREFIX + ROOM_TO_UUID_PREFIX;

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

  function getRoom(clientUUID, cb) {
    client.hmget(UUID_TO_ROOM_KEY, clientUUID, cb);
  }

  function getRooms(cb) {
    client.smembers(ROOM_KEY, cb);
  }

  function roomExists(roomId, cb) {
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
    client.sadd(ROOM_KEY, roomId, cb)
  }

  function generateRoom(roomId, cb) {
    let rooms = getRooms((err, reply) => {
      let id = roomId ? roomId : makeid(8);
      addRoom(id, cb);
    });
  }

  function addConnection(clientUUID, r, cb) {
    client.hmset(UUID_TO_ROOM_KEY, clientUUID, r, cb)
    client.sadd(ROOM_TO_UUID_PREFIX_KEY + r, clientUUID)
  }

  function deleteConnection(socketId) {
    // First get the client uuid
    client.hget(SOCKET_TO_UUID_KEY, socketId, (err, uuid) => {
      // Remove the socket
      client.hdel(SOCKET_TO_UUID_KEY, socketId);

      // Remove it from the uuid -> socket mapping
      client.srem(UUID_TO_SOCKET_PREFIX_KEY + uuid, socketId, () => {
        // Check if there are any sockets remaining
        client.smembers(UUID_TO_SOCKET_PREFIX_KEY + uuid, (err, resp) => {
          if (resp.length === 0 && uuid) {
            client.hdel(UUID_TO_ROOM_KEY, uuid);
            client.hdel(UUID_TO_NAME_KEY, uuid);
          }
        });
      });
    });
  }

  function setName(clientUUID, name, cb) {
    console.log('Set name: ', clientUUID, name);
    client.hmset(UUID_TO_NAME_KEY, clientUUID, name)
  }

  function getSocketIds(uuid, cb) {
    client.smembers(UUID_TO_SOCKET_PREFIX_KEY + uuid, cb);
  }

  function setUUID(socketId, uuid, cb) {
    console.log('Setting the UUID to be ', uuid, ' to ', socketId);
    client.sadd(UUID_TO_SOCKET_PREFIX_KEY + uuid, socketId, cb)
    client.hmset(SOCKET_TO_UUID_KEY, socketId, uuid)
  }

  function getUUIDs(socketIds, cb) {
    client.hmget(SOCKET_TO_UUID_KEY, socketIds, (err, resp) => {
      console.log('getUUIDs: ', resp);
      cb(err, [...new Set(resp)]);
    });
  }

  function getRoomUUIDs(r, cb) {
    client.smembers(ROOM_TO_UUID_PREFIX_KEY + r, cb);
  }

  function getParticipantNames(uuids, cb) {
    client.hmget(UUID_TO_NAME_KEY, uuids, cb)
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
    getParticipantNames,
    setUUID,
    getUUIDs,
    getRoomUUIDs,
    getSocketIds
  }
}
