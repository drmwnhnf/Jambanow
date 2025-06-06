const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const toiletRoutes = require('./src/routes/toiletRoute');
const reviewRoutes = require('./src/routes/reviewRoute');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/toilets', toiletRoutes);
app.use('/reviews', reviewRoutes);

app.get('/', (req, res) => {
    res.send('Hai');
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Atlas connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
