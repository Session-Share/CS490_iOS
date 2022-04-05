// Import the express module
var express = require('express');
// Create a new instance of express
var app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
// Import the path module
var path = require('path');
// Set port
const port = 8080;

// Import the 'Main' file of the program
// var main = require('./filePath')


// Create a Node.js based http server on port 8080 (can be mapped to IP Address)
// var server = require('http').createServer(app).listen(process.env.PORT || 8080);

// Create a Socket.IO server and attach to http server
// var io = require('socket.io').listen(server);

// Reduce logging output of Socket.IO
// io.set('log level', 1);

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(port, () => {
  console.log('listening on 8080');
});
