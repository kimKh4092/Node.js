const express = require('express');
//creates a function express
const app = express();
//creates an express object
const logger = require('./logger');
const morgan = require('morgan');
const config = require('config');
const courses = require('./courses');
const home = require('./home');


app.use(express.json());
//for routes start with /api/courses use courses router
app.use('/api/courses', courses);
app.use('/', home);


//templating engine
app.set('view engine', 'pug');
app.set('views', './views')

//configuration
console.log('name' + config.get('name'));


//enviroments
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`NODE_ENV: ${app.get('env')}`);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
    console.log('morgan enables')
}

//create custom middleware functions
app.use(logger)
app.use(function (req, res, next) {
    console.log('authenticating...');
    next();
})

//enviroment variable
//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`))


//route handler functions are middleware functions 