console.log('before');
getUser(1);
console.log('after');

//sync or blocking
//async or none blocking

function getUser(id) {
    //async or non blocking function
    setTimeout(() => {
        console.log('reading from database...');
        return { id: id, username: 'kim' }
    }, 2000);
}

//patterns for dealing with async functions
//callbacks
//promises
//async/await
