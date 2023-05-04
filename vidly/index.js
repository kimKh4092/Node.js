const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

genres = [
    { id: 1, name: 'genre1' },
    { id: 2, name: 'genre2' },
    { id: 3, name: 'genre3' }
]

genreApi();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`))




function genreApi() {
    app.get('/', (req, res) => {
        res.send('hello world')
    });


    //genre api
    app.get('/api/genres', (req, res) => {
        res.send(genres);
    })

    app.get('/api/genres/:id', (req, res) => {
        const genre = genres.find(c => c.id === parseInt(req.params.id));
        if (!genre) res.status(404).send('the genre was not found')
        else res.send(genre);
    })


    app.post('/api/genres', (req, res) => {

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

    app.put('/api/genres/:id', (req, res) => {

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

    app.delete('/api/genres/:id', (req, res) => {
        const genre = genres.find(c => c.id === parseInt(req.params.id));
        if (!genre) {
            res.status(404).send('the genre was not found');
            return;
        }

        const index = genres.indexOf(genre);
        genres.splice(index, 1);
        res.send(genre);
    })


}