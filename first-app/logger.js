
const EventEmitter = require('events');

//create a module

//send http req to this url
let url = 'http://mylogger.io/log';


//url var and log function are scooped t0 this module
//not available from outside


// module.exports.endPoint = url;

class Logger extends EventEmitter {

    log(message) {
        //send an http req
        console.log(message);

        //raise an event
        this.emit('messageLogged', { id: 1, url: 'http://' });
    }


}

module.exports = Logger;
