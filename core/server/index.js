const express = require('express');
const cors = require('cors');
var request = require('request'); // "Request" library
const https = require("https");
const { Server } = require("socket.io");
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const SpotifyWebApi = require('spotify-web-api-node');

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
// app.use('/api/session', sessionRouter);
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
var spotifyApi = new SpotifyWebApi({
  clientId: '57ecd291e22142faab9a2841c92d9236',
  clientSecret: '36635a0faee14c4c86e165ebefe44626',
  redirectUri: 'https://localhost:8080/api/login/callback'
});

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

// sort comparer function to sort by descending order
function getSortOrder(prop) {
  return function(a, b) {
      if (a[prop] > b[prop]) {
          return -1;
      } else if (a[prop] < b[prop]) {
          return 1;
      }
      return 0;
  }
} /* getSortOrder() */

// function to reorder the queue based on likes
function reorderQueue() {
  songsQueue.sort(getSortOrder("likes"));
} /* reorderQueue() */


server.listen(port, () => {
  console.log('listening on 8080');
});

app.get('/', async (req, res) => {
  await loginController.loginToSpotify(req, res);
  // console.log("Read data = \n", data);
});

// Route to get and set tokens upon successful Spotify Auth
app.get('/api/success', async (req, res) => {
    const data = credentialController.readTokens();
    const tokens = data.split("\n");
    access_token = tokens[0];
    refresh_token = tokens[1];
    console.log("\naccess_token:", access_token);
    // console.log("\nrefresh_token:", refresh_token);
    spotifyApi.setAccessToken(access_token);
});


// Route to add a song to the queue
app.post('/api/add', async (req, res) => {
  try {
  var params = req.body.params ? JSON.parse(req.body.params) : ''; // Save params if any
  const song = {
    "songUri": req.body.songUri,
    "songName": req.body.songName,
    "songArtist" : req.body.songArtist,
    "params": params,
    "likes": 0
  };
  console.log("Adding to queue:\n", JSON.stringify(song));
  songsQueue.push(song);
  reorderQueue();
  res.status(201).json({
    status: "success",
    songsQueue: songsQueue
  });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "error",
    });
  }
});

// Route to resume playing song
app.get('/api/play', async (req, res) => {
  spotifyApi.play()
  .then(function() {
    console.log('Playback started');
  }, function(err) {
    //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
    console.log('Something went wrong, could not play!', err);
  });
});

// Route to pause song
app.get('/api/pause', async (req, res) => {
  spotifyApi.pause()
  .then(function() {
    console.log('Playback paused');
  }, function(err) {
    //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
    console.log('Something went wrong, could not pause!', err);
  });
});

// Route to skip current song
app.get('/api/next', async (req, res) => {
  spotifyApi.skipToNext()
  .then(function() {
    console.log('Skipped to next song');
  }, function(err) {
    //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
    console.log('Something went wrong, could not skip!', err);
  });
});

// Route to go back to previous song
app.get('/api/previous', async (req, res) => {
  spotifyApi.skipToPrevious()
  .then(function() {
    console.log('Going back to previous song');
  }, function(err) {
    //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
    console.log('Something went wrong, could not go back!', err);
  });
});


function requestSongDemoCode() {
  // Let express know what type of request to expect
  var options = {
    method: "POST",
    headers : {
         "Content-Type": "application/json"
    }
  };
  // The actual search parameters
  const search = {
      songName: "Is it true",
      access_token: access_token
  };

  // The search parameters must be appended to the body of the request
  options.body = JSON.stringify(search);

  // Call the API to look for the song
  fetch("https://localhost:8080/api/request/search", options)
  .then( (response) => {
    // Use returned results as desired
    console.log("success")} )
  .catch( (error) => {
    console.log("Error:\n", error)} );
} /* requestSongDemoCode() */


function addSongDemoCode() {

  var options = {
    method: "POST",
    headers : {
         "Content-Type": "application/json",
         // 'Authorization': 'Bearer ' + access_token
    }
  };
  // The actual search parameters
  var search = {
      songUri: "spotify:track:6RZmhpvukfyeSURhf4kZ0d", // Spotify uri for the track is required
      songName: "Is it True", // song name is required
      songArtist: "Tame Impala" // song artist is required
  };

  // The search parameters must be appended to the BODY of the request
  options.body = JSON.stringify(search);

  fetch("https://localhost:8080/api/add", options) // call the api
  .then( (response) => {
    // Use returned results as desired
    console.log("received:\n", response)} )
  .catch( (error) => {
    console.log("Error:\n", error)} );

} /* addSongDemoCode() */
