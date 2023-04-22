//path module

//load path built in module
const path = require('path');

//parse method
const pathObj = path.parse(__filename);
console.log(pathObj);


//os module
//get info ab current operating system
const os = require('os');
const totalMemory = os.totalmem();
console.log('Total Memory' + totalMemory);

//template string => ``

//file system module
const fs = require('fs');

const files = fs.readdirSync('./');
//return all folder and files in current folder
console.log(files);

//all async methods take a function as last argument and
//node will call this function when this async operation completes => a callbacl function
fs.readdir('./', function (err, files) {
    if (err) console.log('Error', err);
    else console.log('Result', files);
});


