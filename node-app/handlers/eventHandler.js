const EventModel = require('../models/event');

const eventHandler = {

    createEvent(data, cb) {
      if (!data.user_id) {
        return cb('Please a valid user_id is required.');
      }
      else if (!data.name) {
        return cb('Please name is required.');
      }
      else if (!data.nbr_participant) {
        return cb('Please number of participants is required.');
      }
      else {
        var newEvent = new EventModel({
          user_id: data.user_id,
          nbr_participant: data.nbr_participant,
          type: data.type,
          name: data.name,
          description: data.description,
          hashtag: data.hashtag,
          location: [data.latitude, data.longitude], // [<longitude>, <latitude>]
        });
        // save the event
        newEvent.save(function(error, event) {
           if (error) {
             console.log(error);
             return cb(error);
           }else{
             return cb(error, event);
           }
        });
      }
    },

    getProximityEvent(data, cb) {
        var limit = data.limit || 15;

        // get the max distance or set it to 8 kilometers
        var maxDistance = data.distance || 75;
        // we need to convert the distance to radians
        // the raduis of Earth is approximately 6371 kilometers
        var rayon = maxDistance/6371;

        // get coordinates [ <latitude> , <longitude> ]
        // var coords = [];
        // coords[0] = data.latitude;
        // coords[1] = data.longitude;

        // find a location
        EventModel.find(
          // {
          //   location: {
          //     $geoNear: coords,
          //     $maxDistance: maxDistance
          //   }
          // }

          { location :
              {
                $geoWithin : {
                  $centerSphere : [ [ data.latitude, data.longitude ] , rayon ] }
              }
          }
      ).limit(limit).exec(function(error, events) {
          if (error) {
            console.log(error);
            return cb(error);
          }
          console.log(events);
          return cb(error, events);
        });
    },
};

module.exports = eventHandler;
