const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/playground')
    .then(() => console.log('connected to mongodb...'))
    .catch(err => console.error('failed...', err))


const authorSchema = {
    name: String,
    bio: String,
    website: String

}
const Author = mongoose.model('Author', authorSchema);


const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    // author: authorSchema
    authors: [authorSchema]
}));


async function createCourse(name, authors) {
    const course = new Course({
        name,
        authors
    });

    const result = await course.save();
    console.log(result)
};

async function listCourses() {
    const courses = await Course
        .find()

    console.log(courses)
}


createCourse('Node Course', [
    new Author({ name: 'Mosh' }),
    new Author({ name: 'John' })
]);

//array of sub documents