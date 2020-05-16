var express = require('express');
var router = express.Router();
var socketClient = require('../socket-connection');
var roomClient = require('../room-connection');
var client = require('../redis-client');
var roomState = require('../room')(client.getClient());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/room/:room', function(req, res, next) {

  console.log(Object.keys(socketClient.getIo().nsps));
  console.log(req.params.room);
  // If the room doesn't exist, then create the room
  if (req.params.room) {
    roomState.roomExists(req.params.room, (resp) => {
      console.log('Response for room exist: ', resp);
      if (!resp) {
        roomState.generateRoom(req.params.room, (err, id) => {
          console.log("Done generating room with ", id);
        });
      }
    })
  }
  res.render('room/room', { title: req.params.room });
});

module.exports = router;
