const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')

module.exports = function(app, config, server) {
	console.log("config.api.port : "+config.api.port);
	server.listen(config.api.port || 3000);
  app.use(cors());
  // setup the logger
  app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));
	app.use( bodyParser.json() );

	// error handler
	app.use(function(error, req, res, next) {
		if (res.headersSent) {
			return next(error)
		}
		console.log(error);
		res.status(error.status).json({success: false, msg: 'Error', error});
	});
};
