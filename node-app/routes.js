const userHandlers = require('./handlers/userHandler');
const eventHandlers = require('./handlers/eventHandler');


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


      // // Upvote / Downvote request
      // var data = {
      //   id_user: '594009f76f397d830ec76be8', // User Id
      //   id_event: '593edbd5c55bd5109a69f87f', // Event Id
      //   type: 'upvote', // upvote or downvote
      //   // type: 'downvote', // upvote or downvote
      //   nbr_participants: 69, // <= @TODO QU'EST CE QU'ON FAIT ?
      // };

      // var result = eventHandlers.voteEvent(data, (error, data) => {
      //   console.log('error: '+error);
      //   if (error){
      //     res.status(500).json(error);
      //   }
      //   // if (data.length === 0){
      //   //   console.log("Aucun event");
      //   //   res.status(500).json(data);
      //   // } 
      //   else {
      //     console.log("Plusieurs events");
      //     console.log(data);
      //     res.status(200).json(data);
      //   }
      // });



      // Search proximity events request

      var data = {
              limit: 10,
              distance: 500, // in km
              latitude: 48.85275120000001,
              longitude: 2.4278817999999998
            };

      var result = eventHandlers.getProximityEvent(data, (error, data) => {
        console.log('error: '+error);
        if (error){
          res.status(500).json(error);
        }
        if (data.length === 0){
          console.log("Aucun event");
          res.status(500).json(data);
        } else {
          console.log("Plusieurs events");
          console.log(data);
          res.status(200).json(data);
        }
      });
  });

  app.post('/login', userHandlers.login);

  // Expose the node_modules folder as static resources (to access socket.io.js in the browser)
  app.use('/static', express.static('node_modules'));

  // Expose the node_modules folder as static resources (to access socket.io.js in the browser)
  app.use('/assets', express.static(__dirname + '/public/assets'));
};
