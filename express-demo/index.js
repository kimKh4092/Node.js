const Joi = require('joi');
const express = require('express');
//creates a function express
const app = express();
//creates an express object
const logger = require('./logger');
const morgan = require('morgan');

app.use(express.json());
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

courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];

app.get('/', (req, res) => {
    res.send('hello world')
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
})


//route parameters
//query parameters
app.get('/api/courses/:id', (req, res) => {
    // res.send(req.params.id);
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('the course was not found')
    else res.send(course);

})

app.post('/api/courses', (req, res) => {
    // if (!req.body.name || req.body.name.length < 3) {
    //     //bad request 400
    //     res.status(400).send('name is required and should be maximum 3 charachters ')
    //     return;
    // }

    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);
    console.log(result);

    if (result.error) {
        //bad request 400
        res.status(400).send(result.error.details[0].message)
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(req.body);
})


//update a course
app.put('/api/courses/:id', (req, res) => {
    //look up the course
    //if not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('the course was not found');
        return;
    }
    //validate
    //if invalid, return 400
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);
    console.log(result);

    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return;
    }

    //update the course
    //return the updated course
    course.name = req.body.name;
    res.send(course);
})


//deleting a course
app.delete('/api/courses/:id', (req, res) => {
    //look up the course
    //if not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('the course was not found');
        return;
    }

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);


})

//enviroment variable
//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`))


//route handler functions are middleware functions 