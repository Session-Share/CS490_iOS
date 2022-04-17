// Import the express module
const express = require('express');
var cors = require('cors');
var request = require('request'); // "Request" library
const http = require('http');
const https = require('https');
const { Server } = require("socket.io");
const fs = require('fs');
var path = require('path');

/**
  * Code to enable express html support
  * Ensure that the key.pm file is generated before running the code.
  * First create Keys and Cerificate by running the following command (Linux):
  * openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 365
  * Then get the Decrypted Keys by running
  * openssl rsa -in keytmp.pem -out key.pem
 */
const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');

const app = express();
const server = https.createServer({key: key, cert: cert }, app);
const io = new Server(server);
const port = 8080;

const loginRouter = require('./routes/loginScreenRoutes');
const sessionRouter = require('./routes/sessionScreenRoutes');
const requestRouter = require('./routes/songRequestRoutes');

var access_token;
var refresh_token;

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
