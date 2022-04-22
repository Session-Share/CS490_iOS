// Import the express module
const express = require('express');
var cors = require('cors');
var request = require('request'); // "Request" library
// const https = require('https');
const https = require("https");
const { Server } = require("socket.io");
const fetch = require('node-fetch');
const fs = require('fs');
var path = require('path');

// Cors setup
var corsOptions = {
  origin: 'https://localhost:8080/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Express Setup
const loginController = require('./controllers/loginController.js');
const credentialController = require('./controllers/credentialController.js');
const loginRouter = require('./routes/loginScreenRoutes');
const sessionRouter = require('./routes/sessionScreenRoutes');
const requestRouter = require('./routes/songRequestRoutes');
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/login/', loginRouter);
app.use('/api/session', sessionRouter);
app.use('/api/request', requestRouter);


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
const server = https.createServer({key: key, cert: cert }, app);
const port = 8080;
const io = new Server(server);

// Code to disable SSL verification used by fetch
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

// Spotify Stuff
var access_token;
var refresh_token;
var songsQueue;
var songsCount;

// If anyone connects to the client
io.on('connection', async (socket) => {
  console.log('a user connected');
  if (socket.type == 'host') { // If someone is hosting a session
    var response = loginController.loginToSpotify('','');
    console.log(response);
  }
});

function init () {
  songsQueue = [];
  songsCount = 0;
  access_token = -1;
  refresh_token = -1
}
init();


server.listen(port, () => {
  console.log('listening on 8080');
});

app.get('/', async (req, res) => {
  await loginController.loginToSpotify(req, res);
  // console.log("Read data = \n", data);
});

app.get('/api/success', async (req, res) => {
    const data = credentialController.readTokens();
    const tokens = data.split("\n");
    access_token = tokens[0];
    refresh_token = tokens[1];
    console.log("access_token:", access_token);
    console.log("\nrefresh_token:", refresh_token);
});
