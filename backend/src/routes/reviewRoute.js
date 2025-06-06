const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/:toiletId', reviewController.addReview);
router.get('/:toiletId', reviewController.getReviewsByToiletId);

module.exports = router;
