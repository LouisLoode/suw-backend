const mongoose = require('mongoose');
// import BlueBird from 'bluebird';

// console.log(Config.mongodb);
module.exports = function(config) {
  // connect mongo
  mongoose.Promise = global.Promise;
  // mongoose.Promise = BlueBird;
  mongoose.connect(Config.mongodb);

  // When successfully connected
  mongoose.connection.on('connected', () => {

      console.log('mongoose default connection open to ' + Config.mongodb);

  });

  // If the connection throws an error
  mongoose.connection.on('error', (err) => {

      console.log('mongoose default connection error: ' + err);

  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', () => {

      console.log('mongoose default connection disconnected');

  });

  // When the connection is open
  mongoose.connection.on('open', () => {

      console.log('mongoose default connection is open');

  });
};
