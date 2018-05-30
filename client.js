const io = require('socket.io-client');

const socket = io('ws://localhost:8000');

socket.on('connect', function() {
  const update = {
    message: {
      text: 'Hey there botmaster!'
    }
  };

  socket.send(update);
});