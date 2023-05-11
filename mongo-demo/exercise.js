const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('connected to mongodb...'))
    .catch(err => console.error('failed...', err))




const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number

})

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    //object
    const course = new Course({
        name: 'angular.js',
        author: 'pouya',
        tags: ['angular', 'frontend'],
        isPublished: true,
        price: 15
    })

    const result = await course.save();
    console.log(result);
}

// createCourse();

async function getBackendCourses() {
    const courses = await Course
        .find({ tags: 'backend', isPublished: true })
        .sort({ name: 1 })
        .select({ author: 1, name: 1 })
    console.log(courses);
}

getBackendCourses();

async function getAllCourses() {
    const courses = await Course
        .find({ isPublished: true, tags: { $in: ['backend', 'frontend'] } })
        .sort({ price: 1 })
        .select({ author: 1, name: 1 })
    console.log(courses);
}

getAllCourses();
