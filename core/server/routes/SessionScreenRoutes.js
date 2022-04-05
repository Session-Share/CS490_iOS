const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/sessionController.js');

// route "api/session"
router.route("/getQueue").get(sessionController.getSongs);
router.route("/like/:songID").post(sessionController.likeSong);
router.route("/dislike/:songID").post(sessionController.dislikeSong);

module.exports = router;
