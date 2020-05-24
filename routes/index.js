var express = require('express');
var router = express.Router();
var socketClient = require('../socket-connection');
var roomClient = require('../room-connection');
var client = require('../redis-client');
var db = require('../db')(client.getClient());

/* GET home page. */
router.get('/', function(req, res, next) {
  var roomId = db.generateRoomId();
  db.generateRoom(roomId, (err, id) => {
    res.redirect('/room/' + roomId);
  });
});

router.get('/room/:room', function(req, res, next) {

  // If the room doesn't exist, then create the room
  if (req.params.room) {
    db.roomExists(req.params.room, (resp) => {
      console.log('Response for room exist: ', resp);
      if (!resp) {
        db.generateRoom(req.params.room, (err, id) => {
          console.log("Done generating room with ", id);
        });
      }
    })
  }
  res.render('room/index', { title: req.params.room });
});

module.exports = router;
