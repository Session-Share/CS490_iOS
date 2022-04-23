const fetch = require('node-fetch');
const SpotifyWebApi = require('spotify-web-api-node');
const Spotify = require('spotify-web-api-js');

const spotifyApi = new SpotifyWebApi({
  clientId: '57ecd291e22142faab9a2841c92d9236',
  clientSecret: '36635a0faee14c4c86e165ebefe44626',
  redirectUri: 'https://localhost:8080/api/login/callback'
});

const playbackSpotifyApi = new SpotifyWebApi();

const baseUri = 'https://api.spotify.com/v1';

exports.addSong = async(req, res) => {
  try {
    // TODO: Code to like add a song to the queue
    console.log("Req:\n", req.body);
    const songUri = req.body.songUri;
    const access_token = req.body.access_token;
    // Set token for the Spotify API
    playbackSpotifyApi.setAccessToken(access_token);

    var options = {
      method: "POST",
      headers : {
           "Content-Type": "application/json",
           "Accept": "application/json",
           "Authorization": `Bearer ${access_token}`
      }
    };

    // playbackSpotifyApi.queue(songUri, function (err, data) {
    //   if (err) {
    //     console.log("Error:\n", err);
    //   }
    //   else {
    //     console.log(data);
    //   }
    // })
    const encodedURI = encodeURIComponent(songUri);
    const url = baseUri + `/me/player/queue?${encodedURI}`
    console.log("\n\n",JSON.stringify(options));
    console.log(JSON.stringify(url));

    fetch(url, options)
    .then ( function (response) {
      console.log(response);
      if (response.status == '204') {
        res.status(201).json({
          status: 'success'
        });
      } else {
        res.status(response.status).json({
          status: 'failed'
        });
      }
    })
    .catch( function (error) {
      console.log("Error adding song:\n", error);
      res.status(404).json({
        status: 'error'
      })
    });
  } catch(error) {
    // Response code (404) and message to send back if there is an error
    console.log("Error adding song:\n", error);
    res.status(404).json({
      status: 'error'
    })
  }
} /* addSong() */

exports.searchSongs = async(req, res) => {

  // console.log("=====Search=====\n");
  try {
    console.log("\nRequest:\n", req.body);
    const songName = req.body.songName;
    const access_token = req.body.access_token;
    // Set token for the Spotify API
    spotifyApi.setAccessToken(access_token);
    var results; // To store the results of the api

    // Call the API and get the results
    spotifyApi.searchTracks(songName)
    .then( function(data) {
      results = JSON.stringify(data.body); // Save the results and return it
      res.status(201).json({
        status: 'success',
        results: results,
      })
    }, function(err) { // Otherwise return an error message
      console.error(err);
      res.status(404).json({
        status: 'error'
      })
    });
  } catch(error) {
    // Response code (404) and message to send back if there is an error
    res.status(404).json({
      status: 'error'
    })
  }
} /* searchSongs() */
