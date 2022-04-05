const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController.js');

// route "api/login"
router.route("/create").post(loginController.loginToSpotify);
router.route("/join").post(loginController.joinSession);

module.exports = router;
