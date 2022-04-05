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
  try {
    // TODO: Code to get songs matching the search

    // Response code (201) and message to send back on success
    res.status(201).json({
      status: 'success'
      // results: spotifyResults
    })
  } catch(error) {
    // Response code (404) and message to send back if there is an error
    res.status(404).json({
      status: 'error'
    })
  }
} /* searchSongs() */
