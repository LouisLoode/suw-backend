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
        //var limit = data.limit || 15;

        // get the max distance or set it to 8 kilometers
        var maxDistance = 1;
        // we need to convert the distance to radians
        // the raduis of Earth is approximately 6371 kilometers
        var rayon = maxDistance/6371;

        // find a location
        EventModel.find(
          { location :
              {
                $geoWithin : {
                  $centerSphere : [ [ data.latitude, data.longitude ] , rayon ] }
              }
          }
        ).where('is_activate').equals(true).exec(function(error, events) {
            if (error) {
              console.log(error);
              return cb(error);
            }
            // console.log(events);
            return cb(error, events);
        });
    },

    voteEvent(data, cb) {

      console.log("data in voteEvent => Begin");
      console.log(data);
      console.log("data in voteEvent => End");
      
      // console.log("data.event_id",data.id_event);
       EventModel.findOne({ _id: data.id_event }, (error, event) => {
        // console.log('event',event);
        // console.log('error',error);
        if (error) {
            return cb(error);
        }
        else {
          // return cb(error, event);
            if (!event) {
               return cb('Event Not Found');
            }
            else {
               console.log('data ----------- begin');
               console.log(data);
               console.log('data ----------- end');

               console.log('event ----------- begin');
               console.log(event);
               console.log('event ----------- end');
               
                if (event.upvotes.indexOf(data.id_user) === -1 && data.type === 'upvote') {
                  if (event.downvotes.indexOf(data.id_user) !== -1) {
                    event.downvotes.splice(data.id_user, 1);
                  }
                  event.upvotes.push(data.id_user);
                   
                } else if (event.downvotes.indexOf(data.id_user) === -1 && data.type === 'downvote') {
                  if (event.upvotes.indexOf(data.id_user) !== -1) {
                    event.upvotes.splice(data.id_user, 1);
                  }
                  event.downvotes.push(data.id_user);

                  if (event.downvotes.length > event.downvotes.length){
                    event.is_activate = false;                    
                  }

                } else {
                  console.log('On a rien voté car un vote existe déjà');
                }
               // save the event
               event.save(function(error) {
                   if (error) {
                     console.log(error);
                     return cb('Event Not Found');
                   }else{
                     return cb(error, event);
                   }
               });
              }
            }
        });
    },
};

module.exports = eventHandler;
