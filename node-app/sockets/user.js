const userHandlers = require('../handlers/userHandler');

module.exports = function(socket) {

  socket.on('user', function (data) {

    var result = userHandlers.updateStory(data, (error, user) => {
      if (error) {
        console.log('error: '+error); 
      } else {
        console.log('User succesfully updated: '+user.uuid);
        socket.emit('monitoring_users', {type: 'Update user position', user});  
      }
    });
  });
}
