

process.on('exit', function(){  //exit is the event, function is the callback. When the event occur, the function is call
     
    // do something!
})


const {EventEmitter} = require("events");
const eventEmitter = new EventEmitter();


eventEmitter.on('lunch', () => {

    console.log('yum')
})

eventEmitter.emit('lunch');
eventEmitter.emit('lunch');
eventEmitter.emit('lunch');
eventEmitter.emit('lunch');
