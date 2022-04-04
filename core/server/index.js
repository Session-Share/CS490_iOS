// Import the express module
var express = require('express');

// Import the path module
var path = require('path');

// Create a new instance of express
var app = express();

// Import the 'Main' file of the program
// var main = require('./filePath')

// Create a simple express application
app.configure(function() {
    // Turn down the logging activity
    app.use(express.logger('dev'));

    // Serve static html, js, css, and image files from the given directory
    app.use(express.static(path.join(__dirname, 'given')));
});

// Create a Node.js based http server on port 8080 (can be mapped to IP Address)
var server = require('http').createServer(app).listen(process.env.PORT || 8080);

// Create a Socket.IO server and attach to http server
var io = require('socket.io').listen(server);

// Reduce logging output of Socket.IO
io.set('log level', 1);

// Listen for Socket.IO Connections, once completed perform desired task upon new Jammer joining session
io.sockets.on('connection', function (socket) {
    console.log('client connected');
    //main.function(io, socket)
});