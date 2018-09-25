const router = require('./router.js');
//Problem: We need a simple way to look at a user's badge count and JavaScript point from a web browser
//Solution: Use Node.js to perform the profile look ups and server our template via HTTP

//Create a web server

let http = require('http');

http.createServer((request, response) => {
  router.home(request, response);
  router.user(request, response);
}).listen(3000);

console.log('Server running at http://localhost:3000/');
