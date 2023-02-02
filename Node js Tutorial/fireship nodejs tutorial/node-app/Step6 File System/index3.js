// Promise based solution 
// Promise is non-blocking and tend to produce much cleaner code compare to callback


const {readFile} = require('fs').promises;


async function hello(){
    const file = await readFile('./hello.txt', 'utf8'); // Can use this line without function with node v14.3 & above
}
