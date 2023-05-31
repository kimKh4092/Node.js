//data validation



const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('connected to mongodb...'))
    .catch(err => console.error('failed...', err))



const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: String,
    tags: {
        type: Array,
        validate: {//custom validator
            validator: function (v) {
                return v && v.length > 0;
            },
            message: 'course should have at least one tag'
        }

    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () { return this.isPublished },
        min: 10,
        get: v => Math.round(v),
        set: v => Math.round(v)
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network']
    }

})

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    //object
    const course = new Course({
        // name: 'react.js',
        author: 'Kim',
        tags: ['react', 'frontend'],
        isPublished: true,
        price: 15
    })

    try {
        const result = await course.save();
        console.log(result);
    }

    catch (ex) {
        console.log(ex.message)
    }

}

createCourse();

//mongodb doesnt care ab validation
//validation is implemented by mongoose

//built-in validators
//required validator
//minlength and maxlength for strings, enum validators
//min and max for numbers

//async validator

//schematype options
//uppercase and lowercase and trim for strings
//getters and setters


//transactions in relational databases
//a group of operations that should be performed as a unit

//two phase commit in mongodb
//use fawn to simulate transactions in mongodb