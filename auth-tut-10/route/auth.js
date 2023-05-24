const express = require("express");
const handleLogin = require("../controllers/authcontroller");
const router = express.Router();

router.post('/', handleLogin)

module.exports = router