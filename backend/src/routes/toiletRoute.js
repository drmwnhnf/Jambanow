const express = require('express');
const router = express.Router();
const toiletController = require('../controllers/toiletController');

router.get('/', toiletController.getAllToilets);

module.exports = router;
