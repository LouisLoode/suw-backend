const os = require('os');

module.exports = function(socket, config) {

  // in interval emit the monitoring report.
  setInterval(function(){

      var monitoring = {
          release: os.release(),
          apiDirect: os.tmpdir(),
          uptime: os.uptime(),
          loadavg: os.loadavg(),
          ram: {
            total: os.totalmem(),
            free: os.freemem(),
          }};
      socket.emit('monitoring', {
          nbr_users: config.nbr_users,
          monit: monitoring
      });
  }, config.monitoring.interval);

}
