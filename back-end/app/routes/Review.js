const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/Review');

// GET all reviews
router.get('/reviews', reviewController.getReview);

// POST create a new review
router.post('/reviews', reviewController.addReview);

// DELETE a review by ID
router.delete('/reviews/:id', reviewController.deleteReview);

module.exports = router;
