var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
  clientId: '57ecd291e22142faab9a2841c92d9236',
  clientSecret: '36635a0faee14c4c86e165ebefe44626',
  redirectUri: 'https://localhost:8080/api/login/callback'
});

exports.addSong = async(req, res) => {
  try {
    // TODO: Code to like add a song to the queue

    // Response code (201) and message to send back on success
    res.status(201).json({
      status: 'success'
      // queue: spotifyQueue
    })
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
    const songName = req.body.songName
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
