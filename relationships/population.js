const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/playground')
    .then(() => console.log('connected to mongodb...'))
    .catch(err => console.error('failed...', err))


const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    bio: String,
    website: String
}));


const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}));

async function createAuthor(name, bio, website) {
    const author = new Author({
        name,
        bio,
        website
    });

    const result = await author.save();
    console.log(result)
};

async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    });

    const result = await course.save();
    console.log(result)
};

async function listCourses() {
    const courses = await Course
        .find()
        .populate('author')
        .select('name author');

    console.log(courses)
}

// createAuthor('Mosh', 'MY bio', 'My Wrbsite');

// createCourse('Node Course', '6466852bb6127c40d478492a')

listCourses();

//populate method