//connect to mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('connected to mongodb...'))
    .catch(err => console.error('failed...', err))


//schemas (in mongoose)
//define the shape of documents within a collection in mongodb
//collection in mongodb like tables
//documents like rows
//documents container of key value pairs

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,

})

//compile schema into a model to create a class
//class
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    //object
    const course = new Course({
        name: 'react.js',
        author: 'Kim',
        tags: ['react', 'frontend'],
        isPublished: true
    })

    const result = await course.save();
    console.log(result);
}

// createCourse();

//queries
async function getCourses() {
    const courses = await Course.find();
    console.log(courses);
}

// getCourses();


//comparison operators
//eq, ne, gt, gte, lt, lte, in, nin

//logical operators
//.or .and

//regular expressions
//starts with mosh
// .find({author: /^mosh/ })

//end with hamedan
//.find({author: /hamedan$/ })

//contains mosh
//.find({author: /.*mosh*/ })


//update document
//1.query first
//indById()
//modify its properties
//save()

//2.update first
//update directly in db => course.update()
//mongodb update operators
//get the updated document

async function updateCourse(id) {

}