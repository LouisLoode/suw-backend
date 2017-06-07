// app.js
const http = require('http');
const express = require('express');
const config = require('./config/config');
const app = express();

const server = http.createServer(app);
// Pass a http.Server instance to the listen method
const io = require('socket.io').listen(server);

// Database
require('./config/database')(config);

// Middlewares
require('./config/middlewares')(app, config, server);

// Routes
require('./routes')(app, express);

// Sockets
require('./sockets')(io);

console.log('Running in ' + (process.env.NODE_ENV || 'development') + ' mode @ ' + config.api.url);
