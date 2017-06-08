// app.js
const http = require('http');
const express = require('express');
const glob = require('glob');
const path = require('path');
const config = require('./config/config');
const app = express();

const server = http.createServer(app);
// Pass a http.Server instance to the listen method
const io = require('socket.io').listen(server);

/**
 * Connexion to mongodb
 */
require('./config/database')(config);

/**
 * Import models
 */
glob.sync('models/*.js', {
    root: __dirname,
    ignore: 'models/**/*.spec.js'
}).forEach((file) => {

    require(path.join(__dirname, file));

});

/**
 * Import middlewares
 */
require('./config/middlewares')(app, config, server);

/**
 * Import des routes
 */
require('./routes')(app, express);

/**
 * Import des sockets
 */
require('./sockets')(io, config);

console.log('Running in ' + (process.env.NODE_ENV || 'development') + ' mode @ ' + config.api.url);
