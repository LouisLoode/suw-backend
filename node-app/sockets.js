module.exports = function(io, config) {
  // Handle connection
  config.nbr_users = 0;

  io.on('connection', function(socket){
    config.nbr_users += 1;
    console.log('user connected succesfully to the socket ...');

    socket.on('disconnect', function(){
      config.nbr_users -= 1;
      console.log('user disconnected');
    });

    // Sockets about news
    require('./sockets/monitoring')(socket, config);

    // Sockets about news
    require('./sockets/news')(socket);
  });
};
