const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/genres')
    .then(() => console.log('connected to mongodb...'))
    .catch(err => console.error('failed...', err))




const genreSchema = new mongoose.Schema({
    name: String,
    date: { type: Date, default: Date.now },
})

const Genre = mongoose.model('Genre', genreSchema);

async function createGenre() {

    const genre = new Genre({

    })

    const result = await genre.save();
    console.log(result);
}

createGenre();