const queryString = require('query-string');

const query = 'page=2&sort=asc';
const parsed = queryString.parse(query);

console.log(parsed.page); // 2
console.log(parsed.sort); // asc
