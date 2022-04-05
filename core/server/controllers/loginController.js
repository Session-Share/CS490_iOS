exports.loginToSpotify = async(req, res) => {
  try {
    // TODO: Code to login to spotify and get token

    // Response code (201) and message to send back on success
    res.status(201).json({
      status: 'success'
      // token: spotifyToken
    })
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
    // TODO: Code to create a Session

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
