const userHandlers = require('../handlers/userHandler');
const eventHandlers = require('../handlers/eventHandler');

module.exports = function(socket) {

  socket.on('user', function (data, fn) {
console.log('data========================= begin');
    console.log('data 1',data);
console.log('data========================= end');
const distance = data.distance;
const latitude = data.location[0];
const longitude = data.location[1];

    var result = userHandlers.updateStory(data, (error, user) => {
      if (error) {
        console.log('error: '+error); 
      } else {
        console.log('User succesfully updated: '+user.uuid);

        const data = {
          distance : distance,
          // limit : parseInt($('#limit_search_event').val(), 10),
          longitude : longitude,
          latitude : latitude
        };

        console.log('data========================= begin');
    console.log('data 2',data);
console.log('data========================= end');

        socket.emit('monitoring_users', {type: 'Update user position', user});

        eventHandlers.getProximityEvent(data, (error, event) => {
          if (error){
            console.log('ERROR DURING FETCHING EVENTS AROUND USER:');
            console.log(error);
            fn(error);
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
          
      }
    });
  });
}
