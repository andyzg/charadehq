$(document).ready(() => {
  console.log('connecting...');
  var socket = io('localhost:3000/');

  // EVENT LISTENERS

  // Send message
  $('#message-box').submit((e) => {
    e.preventDefault();
    console.log('emitting...');
    socket.emit('hello', 'world');
  });


  // SOCKET LISTENERS

  // Receive message
  socket.on('chat-message', (data) => {
    console.log('receive message...');
    $('#chat-box').append($('<li>' + data + '</li>'));
  });
});
