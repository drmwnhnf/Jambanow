const Review = require('../models/Review');
const Toilet = require('../models/Toilet');

exports.addReview = async (req, res) => {
    try {
        const toilet = await Toilet.findById(req.params.toiletId);
        if (!toilet) return res.status(404).json({ error: 'Toilet not found' });

        const review = new Review({
            toilet: toilet._id,
            ...req.body
        });
        await review.save();

        res.status(201).json(review);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getReviewsByToiletId = async (req, res) => {
    try {
        const reviews = await Review.find({ toilet: req.params.toiletId });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
