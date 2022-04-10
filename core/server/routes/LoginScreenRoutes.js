const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController.js');

// route "localhost:8080/api/login/create"
router.route("/create").get(loginController.loginToSpotify);
// route /api/login/callback
router.route("/callback").get(loginController.createSession);
router.route("/join").post(loginController.joinSession);

module.exports = router;
