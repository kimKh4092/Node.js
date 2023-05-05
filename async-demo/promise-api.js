//writing a resolved promise
//for unit testing
const p = Promise.resolve(1);
p.then(result => console.log(result));

//already rejected promise
const p0 = Promise.reject(new Error('reason for rejection...'));
p0.catch(err => console.log(err));


//parallel promises
const p1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('async operation1 ...');
        resolve(1);
    }, 2000)
})

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('async operation2 ...');
        resolve(2);
    }, 2000)
})

Promise.all([p1, p2])
    .then(result => console.log(result));

//promise.race([p1,p2])