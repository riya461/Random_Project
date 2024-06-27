const express = require('express');
const router = express.Router();
const { 
    registerUser, 
    loginUser, 
    getCurrentUser 
} = require('../controllers/userController');
const validateTokenHandler = require('../middleware/validateTokenHandler');

router.post('/register', registerUser)

router.post('/login',loginUser);


router.get('/current', validateTokenHandler, getCurrentUser);

module.exports = router;