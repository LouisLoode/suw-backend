const userHandlers = require('../handlers/userHandler');

module.exports = function(socket) {

  socket.on('user', function (data) {
      // socket.emit('story', data);


    var result = userHandlers.updateStory(data, (error, data) => {
      if (error) {
        console.log('error: '+error); 
      } else {
        console.log('User succesfully updated: '+data.uuid);  
      }
    });
  });
}
