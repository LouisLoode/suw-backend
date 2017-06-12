const eventHandlers = require('../handlers/eventHandler');

module.exports = function(socket) {
  socket.on('add_event', function (data) {
    eventHandlers.createEvent(data, (error, data) => {
      if (error) {
        console.log('Error during the creation of an event');
        console.log(error);
      }else{
        console.log('New event :'+data.name);
      }
    });
  });

  socket.on('fetch_events', function (data) {
    var result = eventHandlers.getProximityEvent(data, (error, data) => {
      console.log('error: '+error);
      if (error || data.length === 0){
        // res.status(500).json(error);
        console.log('ERROR:');
        console.log(error);
      } else {
        console.log("Plusieurs events:");
        console.log(data);
      }
    });
  });
}
