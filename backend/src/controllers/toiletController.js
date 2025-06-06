const Toilet = require('../models/Toilet');

exports.getAllToilets = async (req, res) => {
    try {
        const toilets = await Toilet.find();
        res.json(toilets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
