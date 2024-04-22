
const {EventEmitter} = require('node:events');
const logEvent = require('./logEvent')


const myEmitter = new EventEmitter();
myEmitter.on('log', (msg) => logEvent(msg));

// console.log(myEmitter.listeners('log'));
myEmitter.emit('log', 'emmited')

setTimeout(() => {
    myEmitter.emit("log", "emitted");
},3000)