//promises

const p = new Promise(function (resolve, reject) {
    //kick off some async work
    //...
    setTimeout(() => {
        resolve(1);// result of async function

    }, 2000)


    // reject(new Error('message')); 
    // return error
});

//consume a promise

//catching error
//p.catch

//getting the result of async
p
    .then(result => console.log(result))
    .catch(err => console.log(err.message));