const mongoose = require('mongoose');

const toiletSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: String,
    description: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
}, {
    timestamps: true
});

toiletSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Toilet', toiletSchema);
