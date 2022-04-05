// Import the express module
const express = require('express');
// Create a new instance of express
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
// Import the path module
var path = require('path');
// Set port
const port = 8080;

const loginRouter = require('./routes/loginScreenRoutes');
const sessionRouter = require('./routes/sessionScreenRoutes');
const requestRouter = require('./routes/songRequestRoutes');

app.use(express.json());
app.use('/api/login', loginRouter);
app.use('/api/session', sessionRouter);
app.use('/api/request', requestRouter);

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(port, () => {
  console.log('listening on 8080');
});
