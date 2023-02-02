// Add callback

const {readFile, readFileSync} = require('fs');

readFile('./hello.txt', 'utf8', (err, txt) => {
    console.log(txt)
}
);

console.log('do this ASAP')

// Do this ASAP will be print first while waiting file read