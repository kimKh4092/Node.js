const Joi = require('joi');
const express = require('express');
const router = express.Router();


genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Horror' },
    { id: 3, name: 'Romance' }
]


//genre api
router.get('/', (req, res) => {
    res.send(genres);
})

router.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) res.status(404).send('the genre was not found')
    else res.send(genre);
})


router.post('/', (req, res) => {

    const schema = {
        name: Joi.string().required()
    };
    const result = Joi.validate(req.body, schema);

    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return;
    }

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(req.body);
})

router.put('/:id', (req, res) => {

    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) {
        res.status(404).send('the genre was not found');
        return;
    }

    const schema = {
        name: Joi.string().required()
    };
    const result = Joi.validate(req.body, schema);

    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return;
    }

    genre.name = req.body.name;
    res.send(genre);
})

router.delete('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) {
        res.status(404).send('the genre was not found');
        return;
    }

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
})

module.exports = router;