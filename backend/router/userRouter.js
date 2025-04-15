const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getAllEmails } = require('../controller/userController');

// user signin
router.post('/signup', registerUser);

// user login
router.post('/login', loginUser);

// getmails
router.get('/getmails', getAllEmails);

module.exports = router;