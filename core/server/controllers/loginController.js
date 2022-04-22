var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser')
const fetch = require('node-fetch');
const fs = require('fs')
const credentialController = require('./credentialController.js');

var client_id = '57ecd291e22142faab9a2841c92d9236'; // Sid's client id
var client_secret = '36635a0faee14c4c86e165ebefe44626'; // Sid's secret
var redirect_uri = 'https://localhost:8080/api/login/callback'; // Spotify redirect uri
var stateKey = 'spotify_auth_state';

var access_token, refresh_token;

// Function to enable users to sign into spotify
exports.loginToSpotify = async(req, res) => {

  try {
    console.log("Attempting to Login ");
    var state = generateRandomString(16); // Required by Spotify
    res.cookie(stateKey, state);
    var scope = 'user-read-private user-read-email'; // Required by Spotify

    await res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    })); // Make a request for the Spotify tokens (Spotify auth call)
  } catch(error) {
    console.log("Error logging into Spotify:\n", error);
    // Response code (404) and message to send back if there is an error
    res.status(404).json({
      status: 'error'
    })
  }
} /* loginToSpotify() */

// Callback function to handle Spotify Auth Success/Failure
exports.createSession = async(req, res) => {

  try {
    console.log("Callback Triggered");
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null) { // Auth request failed
      console.log("Spotify Auth failed");
      await res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
    } else { // Auth request success
      res.clearCookie(stateKey);
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
      };
      await request.post(authOptions, function(error, response, body) {
        // No error and status = success
        if (!error && response.statusCode === 200) { // Spotify auth successful

          // Get the tokens and save them
          access_token = body.access_token;
          refresh_token = body.refresh_token;
          const tokens = body.access_token + "\n" + body.refresh_token;
          credentialController.writeTokens(tokens); // Save the tokens

          // Let server know tokens have been saved
          fetch("https://localhost:8080/api/success").
          then( (response) => {
            console.log(response)} )
          .catch( (error) => {
            console.log(error)} );

          // we can also pass the token to the browser to make requests from there
          res.status(201).json({
              status: 'success',
              access_token: access_token,
              refresh_token: refresh_token
          });

          } else { // Spotify Auth unsuccessful
            console.log("Spotify Auth unsuccessful");
            res.status(401).json({
              status: 'invalid_token'
              });
          }
      });
    }
  } catch(error) {
      console.log("Error with Spotify Callback", error);
      // Response code (404) and message to send back if there is an error
      res.status(404).json({
        status: 'error'
      })
    }
} /* createSession() */


/**
  * Generates a random string containing numbers and letters
  * @param  {number} length The length of the string
  * @return {string} The generated string
  */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
    return text;
}; /* generateRandomString() */
