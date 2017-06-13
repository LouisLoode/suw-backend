const eventHandlers = require('../handlers/eventHandler');

module.exports = function(socket) {
  socket.on('add_event', function (data, fn) {
    eventHandlers.createEvent(data, (error, event) => {
      if (error) {
        console.log('Error during the creation of an event');
        fn(error);
      }else{
        console.log('New event :'+event.name);
        socket.emit('monitoring_events', {type: 'Add Event', event});
        fn(event);
      }
    });
  });

  socket.on('vote_event', function (data, fn) {
    eventHandlers.voteEvent(data, (error, event) => {
      if (error) {
        console.log('Error during the creation of an event');
        fn(error);
      }else{
        console.log('New vote :'+event);
        socket.emit('monitoring_events', {type: 'Vote Event', event});
        fn(event);
      }
    });
  });

  socket.on('fetch_events', function (data, fn) {
    console.log('fetch_events => data ------------------------------------ BEGIN');
    console.log(data);
    console.log('fetch_events => data ------------------------------------ END');
    eventHandlers.getProximityEvent(data, (error, event) => {
      if (error){
        // res.status(500).json(error);
        console.log('ERROR:');
        console.log(error);
      }
      else if (event.length === 0) {
        fn(event);
        console.log("There isn't actually events at proximity");
      } 
      else {
        fn(event);
        console.log("Fetch events:"+event.length);
        socket.emit('monitoring_events', {type: 'Search Proximity Event', event});
      }
    });
  });
}
