const userHandlers = require('../handlers/userHandler');

module.exports = function(socket) {

  socket.on('my other event', function (data) {
      console.log(data);
  });

  socket.on('user', function (data) {
      // socket.emit('story', data);


    var result = userHandlers.updateStory(data, (error, data) => {
      console.log('error: '+error);
      console.log('User succesfully updated: '+data.uuid);
    });


  });

}
