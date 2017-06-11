module.exports = function(socket) {

  // const news = [
  //     { title: 'The cure of the Sadness is to play Videogames',date:'04.10.2016'},
  //     { title: 'Batman saves Racoon City, the Joker is infected once again',date:'05.10.2016'},
  //     { title: 'Deadpool doesn\'t want to do a third part of the franchise',date:'05.10.2016'},
  //     { title: 'Quicksilver demand Warner Bros. due to plagiarism with Speedy Gonzales',date:'04.10.2016'},
  // ];
  // // Send news on the socket
  // socket.emit('story', news);

  socket.on('my other event', function (data) {
      console.log(data);
  });

  socket.on('user', function (data) {
    console.log('-------- user data begin');
      console.log(data);

      socket.emit('story', data);
    console.log('-------- user data end');
  });

}
