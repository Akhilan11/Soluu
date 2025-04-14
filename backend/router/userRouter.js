const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('../controller/userController');

// user signin
router.post('/signup', registerUser);

// user login
router.post('/login', loginUser);

module.exports = router;