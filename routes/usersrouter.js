const express = require('express');
const router = express.Router();
const { registerUser, loginuser } = require('../controllers/authController');

// Ensure the paths are correct
router.post('/register', registerUser);
router.post('/login', loginuser);

module.exports = router;
