const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: String,
    rating: { type: Number, required: true },
    comment: { type: String },
    queueTime: { type: Number },
    toilet: { type: mongoose.Schema.Types.ObjectId, ref: 'Toilet', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
