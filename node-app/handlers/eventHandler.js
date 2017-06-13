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
        var maxDistance = data.distance || 1;
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
      ).limit(limit).exec(function(error, events) {
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
      
console.log("data.event_id",data.id_event);
       EventModel.findOne({ _id: data.id_event }, (error, event) => {
        console.log('event',event);
        console.log('error',error);
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
               
                // if (selfUser.following.indexOf(userToFollow._id) === -1 || userToFollow.followers.indexOf(selfUser._id) === -1) {
                //   console.log('Follow user');
                //   userToFollow.followers.push(selfUser._id);
                //   selfUser.following.push(userToFollow._id);
                // } else {
                //   console.log('Unfollow user');
                //   userToFollow.followers.splice(userToFollow.followers.indexOf(selfUser._id), 1);
                  // selfUser.following.splice(selfUser.following.indexOf(userToFollow._id), 1);
                // }
                if (event.upvotes.indexOf(data.id_user) === -1 && data.type === 'upvote') {
                  console.log("Pas présent")
                  if (event.downvotes.indexOf(data.id_user) !== -1) {
                    event.downvotes.splice(data.id_user, 1);
                  }
                  event.upvotes.push(data.id_user);
                   
                } else if (event.downvotes.indexOf(data.id_user) === -1 && data.type === 'downvote') {
                  // if (event.upvotes.indexOf(data.id_user) === -1) {
                  //   event.downvotes.push(data.id_user);
                  // }
                  if (event.upvotes.indexOf(data.id_user) !== -1) {
                    event.upvotes.splice(data.id_user, 1);
                  }
                  event.downvotes.push(data.id_user);

                } else {
                  console.log('ON A RIEN MODIFIé')
                }
                console.log("Mon putain de nouvel event");
                console.log(event);
               // save the bear
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

            //return cb(error);
        
          // console.log(events);
         // return cb(data);
      
    },
};

module.exports = eventHandler;
