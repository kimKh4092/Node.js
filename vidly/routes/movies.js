const Joi = require('joi');
const express = require('express');
const router = express.Router();
const Movie = require('../models/movies');
const { Genre } = require('../models/genres');



router.get('/', async (req, res) => {
    const movies = await Movie.find();
    res.send(movies);
})

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id)

    if (!movie) res.status(404).send('the movie was not found')

    else res.send(movie);
})

router.post('/', async (req, res) => {
    const schema = {
        title: Joi.string().required(),
        numberInStock: Joi.number(),
        dailyRentalRate: Joi.number()
    };
    const result = Joi.validate(req.body, schema);

    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return;
    }

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('invalid genre')

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        dailyRentalRate: req.body.dailyRentalRate,
        numberInStock: req.body.numberInStock
    })

    movie = await movie.save()
    res.send(movie)
})


router.put('/:id', async (req, res) => {
    const schema = {
        title: Joi.string().required(),
        numberInStock: Joi.number(),
        dailyRentalRate: Joi.number()
    };
    const result = Joi.validate(req.body, schema);

    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return;
    }
    const movie = await Movie.findByIdAndUpdate(req.params.id,
        {
            title: req.body.title,
            genre: new Genre({ name: req.body.genre }),
            dailyRentalRate: req.body.dailyRentalRate,
            numberInStock: req.body.numberInStock
        },
        { new: true })

    if (!movie) {
        res.status(404).send('the movie was not found');
        return;
    }
    res.send(movie);
})

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id)

    if (!movie) {
        res.status(404).send('the movie was not found');
        return;
    }

    res.send(movie);
})

module.exports = router;