const Boom = require('boom');
const UserModel = require('../models/user');
const Config = require('../config/config');

const userHandler = {

    login(req, res) {
        console.log('Login');
        console.log(req.body);
        if (!req.body.uuid) {
          res.send({success: false, msg: 'Please uuid is required.'});
        }
        else {
          var query = { uuid: req.body.uuid },
          update = {
            uuid: req.body.uuid,
            model: req.body.model,
            system: req.body.system,
            manufacturer: req.body.manufacturer,
            device_name: req.body.device_name,
            locale: req.body.locale,
            location: [req.body.longitude, req.body.latitude]
          },
          options = { upsert: true, new: true, setDefaultsOnInsert: true };

          // Find the document
          UserModel.findOneAndUpdate(query, update, options, function(error, result) {
              // do something with the document
              if (error) { // Impossible
                  res.status(400).send('Failed to get data: '+error);
              }
              else {
                  if (result.length === 0) { // Impossible
                      res.status(404).send('User Not Found: '+result);
                  }
                  else {
                      return res.send({success: true, msg: 'User Data Successfully Fetched', result});
                  }
              }
          });
        }
    },

};

module.exports = userHandler;
