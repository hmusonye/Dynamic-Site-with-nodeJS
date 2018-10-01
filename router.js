const Profile = require('./profile.js');
const renderer = require('./renderer.js');
const headers = {'Content-Type': 'text/html'};

//Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
  //if url == "/" && GET
  if(request.url === "/"){
    //show search
    response.writeHead(200, headers);
    renderer.view('header', {}, response);
    renderer.view('search', {}, response);
    renderer.view('footer', {}, response);
    response.end();
  }
    //if url == "/" && POST
    //redirect to /:username
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
