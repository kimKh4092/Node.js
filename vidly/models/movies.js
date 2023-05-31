const mongoose = require('mongoose');
const { Genre, genreSchema } = require('./genres')

mongoose.connect('mongodb://127.0.0.1/vidly')
    .then(() => console.log('connected to mongodb...'))
    .catch(err => console.error('failed...', err))


const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: genreSchema,
    numberInStock: {
        type: Number,
        default: 0
    },
    dailyRentalRate: {
        type: Number,
        default: 0
    }
}));

module.exports = Movie;

