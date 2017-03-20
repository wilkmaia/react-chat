// Setup Express and socket.io
var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);


// Port the server listens to
var SERVER_PORT = 3000;


// socket.io setup
io.on('connection', function(socket){
    console.log('New connection...');

    // When receiving a new message, broadcast it
    socket.on('new-message', function(msg){
        console.log(msg);
        io.emit('receive-message', msg);
    });
});


// Start-up
http.listen(SERVER_PORT, function(err){
    if (err) {
        console.log('Could not listen on port ' + SERVER_PORT);
    }
    else {
        console.log('Listening on port ' + SERVER_PORT + '...');
    }
});