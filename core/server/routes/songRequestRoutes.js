const express = require('express');
const router = express.Router();

const requestController = require('../controllers/requestController.js');

// route "api/request"
router.route("/search").post(requestController.searchSongs);
router.route("/add").post(requestController.addSong);

module.exports = router;
