const bcrypt = require('bcrypt');

//hashing password
//need a salt for hashing password
//a salt is a random string that is added before or after the password
//so the resulting hash password will be different each time based on the
//salt that is used

async function run() {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash('1234', salt)
    console.log(salt);
    console.log(hashed)

}

run(); 