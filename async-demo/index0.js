//callbacks
//callback a function that is called when the result is ready

console.log('before');
getUser(1, function (user) {
    console.log(user);

    getRepos(user.username, function (repos) {
        console.log(repos);
    })
});
console.log('after');



function getUser(id, callback) {

    setTimeout(() => {
        console.log('reading from database...');
        callback({ id: id, username: 'kim' })
    }, 2000);
}

function getRepos(username, callback) {
    setTimeout(() => {
        console.log(`getting ${username} repos...`);
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000)
}

//solve callback hell by named functions