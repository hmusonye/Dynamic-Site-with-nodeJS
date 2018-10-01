const Profile = require('./profile.js');
const renderer = require('./renderer.js');
const queryStrting = require('querystring');
const headers = {'Content-Type': 'text/html'};

//Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
  //if url == "/" && GET
  if(request.url === "/"){
    if(request.method.toLowerCase() === "get") {
      //show search
      response.writeHead(200, headers);
      renderer.view('header', {}, response);
      renderer.view('search', {}, response);
      renderer.view('footer', {}, response);
      response.end();
    } else {
      //if url == "/" && POST
      //get post data from body
      request.on('data', (postBody) => {
        //extract username
        let query = queryStrting.parse(postBody.toString());
        //redirect to /:username
        response.writeHead(303, {'Location': '/'+ query.username});
        response.end();
      })
    }
  }
}

//Handle HTTP route GET /:username i.e. /chalkers
  function user(request, response) {
    //if url == "/...."
    let username = request.url.replace("/", "");

    if(username.length > 0){
      response.writeHead(200, headers);
      renderer.view('header', {}, response);

      //get json from Treehouseconst
      let studentProfile = new Profile(username);

      //on "end"
      studentProfile.on('end', (profileInJSON) => {
        //show profile

        //store values we need
        let values  = {
          avatarUrl: profileInJSON.gravatar_url,
          username: profileInJSON.name,
          badges: profileInJSON.badges.length,
          javaScriptPoints: profileInJSON.points.JavaScript
        };

        //simple response
        renderer.view('profile', values, response);
        renderer.view('footer', {}, response);
      });

      //on "error"
      studentProfile.on('error', (error) => {
        //show error
        renderer.view('error', {errorMessage: error.message}, response);
        renderer.view('search', {}, response);
        renderer.view('footer', {}, response);
        response.end();
      });
    }
}

module.exports.home = home;
module.exports.user = user;
