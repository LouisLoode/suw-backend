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

  // Register the index route of your app that returns the HTML file
  app.get('/test', function (req, res) {
      console.log('Test page');


      var user_datas = {
              location: [2.4277856, 48.8527847],  // [<longitude>, <latitude>]
              altitude: 30,
              speed: 8,
              accuracy: 0.0001,
              user_id: "59385963e589bcdb133327ba"
            };

      var result = userHandlers.updateStory(user_datas, (error, data) => {
        console.log('error: '+error);

        console.log('data: '+data);
        res.status(200).json({success: true, msg: data});
      });
  });

  app.post('/login', userHandlers.login);


  // Expose the node_modules folder as static resources (to access socket.io.js in the browser)
  app.use('/static', express.static('node_modules'));

  // Expose the node_modules folder as static resources (to access socket.io.js in the browser)
  app.use('/assets', express.static(__dirname + '/public/assets'));
};
