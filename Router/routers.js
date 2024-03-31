const express = require('express');
const { post, put } = require('../Controllers/UserControllers');
const router = express.Router();

router.post('/register',post);
router.put('/:id', put);

module.exports = router;
