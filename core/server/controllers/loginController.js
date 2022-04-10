var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser')

exports.loginToSpotify = async(req, res) => {
  try {
    // TODO: Code to login to spotify and get token
    console.log("====== Login ======");
    var state = generateRandomString(16);
    res.cookie(stateKey, state);
    console.log(res.cookie);
    var scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
    // Response code (201) and message to send back on success
    // res.status(201).json({
    //   status: 'call made'
    //   // token: spotifyToken
    // })
  } catch(error) {
    console.log("Error logging into Spotify:\n", error);
    // Response code (404) and message to send back if there is an error
    res.status(404).json({
      status: 'error'
    })
  }
} /* loginToSpotify() */

exports.createSession = async(req, res) => {
  try {
    // TODO: Create a Session
    console.log("====== Create ======");
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    console.log(state);

    // if (state === null || state !== storedState) {
    if (state === null) {
      res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
    } else {
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
      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          // No error and status = success
          var access_token = body.access_token,
          refresh_token = body.refresh_token;

          /*
          var options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          };

          // use the access token to access the Spotify Web API
          request.get(options, function(error, response, body) {
            console.log(body);
          });
          */
          // we can also pass the token to the browser to make requests from there
          res.status(201).json({
            status: 'success',
            access_token: access_token,
            refresh_token: refresh_token
          });
        } else {
          res.status(401).json({
            status: 'invalid_token'
          });
        }
      });
    }
  } catch(error) {
    console.log(error);
    // Response code (404) and message to send back if there is an error
    res.status(404).json({
      status: 'error'
    })
  }
} /* createSession() */

exports.joinSession = async(req, res) => {
  try {
    // TODO: Code to join an existing Session

    // const roomID = req.params.roomID;
    // Response code (201) and message to send back on success
    res.status(201).json({
      status: 'success'
    })
  } catch(error) {
    console.log(error);
    // Response code (404) and message to send back if there is an error
    res.status(404).json({
      status: 'error'
    })
  }
} /* joinSession() */

var client_id = '57ecd291e22142faab9a2841c92d9236'; // Sid's client id
var client_secret = '36635a0faee14c4c86e165ebefe44626'; // Sid's secret
var redirect_uri = 'https://localhost:8080/api/login/callback'; // Spotify redirect uri

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
};

var stateKey = 'spotify_auth_state';
