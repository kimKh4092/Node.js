const Joi = require('joi');
const express = require('express');
const router = express.Router();
const { Genre } = require('../models/genres')


//genre api
router.get('/', async (req, res) => {
    const genres = await Genre.find();
    res.send(genres);
})

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id)

    if (!genre) res.status(404).send('the genre was not found')

    else res.send(genre);
})


router.post('/', async (req, res) => {
    const schema = {
        name: Joi.string().required()
    };
    const result = Joi.validate(req.body, schema);

    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return;
    }

    let genre = new Genre({
        name: req.body.name
    })

    genre = await genre.save()
    res.send(genre)
})


router.put('/:id', async (req, res) => {
    const schema = {
        name: Joi.string().required()
    };
    const result = Joi.validate(req.body, schema);

    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return;
    }
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })

    if (!genre) {
        res.status(404).send('the genre was not found');
        return;
    }
    res.send(genre);
})

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id)

    if (!genre) {
        res.status(404).send('the genre was not found');
        return;
    }

    res.send(genre);
})

module.exports = router;