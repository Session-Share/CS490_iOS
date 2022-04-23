exports.getSongs = async(req, res) => {
  try {
    // TODO: Code to get songs in the queue

    // Response code (201) and message to send back on success
    res.status(201).json({
      status: 'success'
      // queue: musicQueue
    })
  } catch(error) {
    console.log("Error logging into Spotify:\n", error);
    // Response code (404) and message to send back if there is an error
    res.status(404).json({
      status: 'error'
    })
  }
} /* getSongs() */

exports.likeSong = async(req, res) => {
  try {
    // TODO: Code to like a song in the queue

    // Response code (201) and message to send back on success
    res.status(201).json({
      status: 'success'
    })
  } catch(error) {
    console.log("Error liking song:\n", error);
    // Response code (404) and message to send back if there is an error
    res.status(404).json({
      status: 'error'
    })
  }
} /* likeSong() */

exports.dislikeSong = async(req, res) => {
  try {
    // TODO: Code to like a song in the queue

    // Response code (201) and message to send back on success
    res.status(201).json({
      status: 'success'
    })
  } catch(error) {
    console.log("Error disliking song:\n", error);
    // Response code (404) and message to send back if there is an error
    res.status(404).json({
      status: 'error'
    })
  }
} /* dislikeSong() */
