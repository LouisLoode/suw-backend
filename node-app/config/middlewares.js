const morgan = require('morgan');
const cors = require('cors');

module.exports = function(app, config, server) {
	server.listen(config.api.port)
  app.use(cors());
  // setup the logger
  app.use(morgan(':method :url :status :response-time ms - :res[content-length]'))
};
