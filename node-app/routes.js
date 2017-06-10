const userHandlers = require('./handlers/userHandler');


module.exports = function(app, express) {
  // Register the index route of your app that returns the HTML file
  app.get('/', function (req, res) {
      console.log('Homepage');
      res.status(200).json({success: true, msg: 'Hello World !'});
  });

  // Register the admin route of your app that returns the HTML file
  app.get('/admin', function (req, res) {
      console.log('Admin');
      res.sendFile(__dirname + '/public/admin.html');
  });

  app.post('/login', userHandlers.login);


  // Expose the node_modules folder as static resources (to access socket.io.js in the browser)
  app.use('/static', express.static('node_modules'));

  // Expose the node_modules folder as static resources (to access socket.io.js in the browser)
  app.use('/assets', express.static(__dirname + '/public/assets'));
};
