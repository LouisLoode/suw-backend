const Boom = require('boom');
const UserModel = require('../models/user');
const Config = require('../config/config');

const userHandler = {

    // Configurations files
    updateStory(data, cb) {

      console.log(data);
      console.log("user_id : "+data.user_id);

      //Fetch fetch current user
      UserModel.findOne({ _id: data.user_id }, (error, user) => {

          if (error) {
              return cb(error);
          }
          else {
              if (user.length === 0) {
                  return cb('User Not Found');
              }
              else {
                 //console.log('actual equipment name in db :' + req.body.name)
                 console.log('data ----------- begin');
                 console.log(data);
                 console.log('data ----------- end');
                 user.location = [data.location[0], data.location[1]];  // [<longitude>, <latitude>]
                 let informations = {
                     location: [data.location[0], data.location[1]],
                     altitude: data.altitude,
                     speed: data.speed,
                     accuracy: data.accuracy,
                     date: new Date()
                 };
                 user.story.push(informations);
                 // save the bear
                 user.save(function(err) {
                     if (err) {
                       console.log(err);
                       return cb('User Not Found');
                     }else{
                       return cb(error, user);
                     }
                 });
                }
              }
          });
    },

    login(req, res) {
        // console.log('Login');
        // console.log(req.body);
        if (!req.body.uuid) {
          res.status(400).json({success: false, msg: 'Please uuid is required.'});
        }
        else {
          var query = { uuid: req.body.uuid },
          update = {
            uuid: req.body.uuid,
            model: req.body.model,
            system: req.body.system,
            manufacturer: req.body.manufacturer,
            brand: req.body.brand,
            local: req.body.local,
            timezone: req.body.timezone,
            os_version: req.body.os_version,
            build_number: req.body.build_number,
            is_tablet: req.body.is_tablet,
            location: [req.body.longitude, req.body.latitude]
          },
          options = { upsert: true, new: true, setDefaultsOnInsert: true };

          // Find the document
          UserModel.findOneAndUpdate(query, update, options, function(error, result) {
              // do something with the document
              if (error) { // Impossible
                  res.status(400).json({success: false, msg: 'Failed to get data', error});
              }
              else {
                  if (result.length === 0) { // Impossible
                      res.status(404).json({success: false, msg: 'User Not Found', result});
                  }
                  else {
                      return res.status(200).json({success: true, msg: 'User Data Successfully Fetched', result});
                  }
              }
          });
        }
    },

};

module.exports = userHandler;
