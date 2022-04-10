// Import the express module
const express = require('express');
var cors = require('cors');
var request = require('request'); // "Request" library
const http = require('http');
const { Server } = require("socket.io");
var path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 8080;

const loginRouter = require('./routes/loginScreenRoutes');
const sessionRouter = require('./routes/sessionScreenRoutes');
const requestRouter = require('./routes/songRequestRoutes');

var corsOptions = {
  origin: 'https://localhost:8080/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(express.json());
app.use(cors());
app.use('/api/login', loginRouter);
app.use('/api/session', sessionRouter);
app.use('/api/request', requestRouter);

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(port, () => {
  console.log('listening on 8080');
});
