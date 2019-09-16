const express = require('express');
const router = express.Router();

router.use('/notification', require('./notification'));
router.use('/users', require('./users'));

module.exports = router;
