const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const users = require('./routes/user');
const auth = require('./routes/auth')

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/vildy')
    .then(() => console.log('connected to mongodb...'))
    .catch(err => console.error('failed...', err))



app.use(express.json());

app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/users', users);
app.use('/api/auth', auth)


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`))


