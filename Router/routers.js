const express = require('express');
const { post } = require('../Controllers/UserControllers');
const router = express.Router();

router.post('/register',post);

module.exports = router;
