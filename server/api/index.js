const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/message', require('./message'));
router.use('/attendance', require('./attendance'));
router.use('/classes', require('./classes'));
router.use('/users', require('./users'));
router.use('/day', require('./day'));

module.exports = router;