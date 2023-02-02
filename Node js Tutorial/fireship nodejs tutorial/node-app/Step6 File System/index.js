const {readFile, readFileSync} = require('fs');

const txt = readFileSync("./hello.txt", 'utf8'); //Specify encoding as utf8

console.log(txt);

console.log('Hello');


// Hello will never be print until hello.txt is finish reading