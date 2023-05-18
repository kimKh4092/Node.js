const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: { type: Date, default: Date.now },
})

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;