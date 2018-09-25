const Profile = require("./profile.js");

//Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
  //if url == "/" && GET
  if(request.url === "/"){
    //show search
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(`Header gg \n`);
    response.write(`Search \n`);
    response.end(`Footer \n`);
  }
    //if url == "/" && POST
    //redirect to /:username
}

//Handle HTTP route GET /:username i.e. /chalkers
  function user(request, response) {
    //if url == "/...."
    let username = request.url.replace("/", "");
    if(username.length > 0){
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.write(`Header Yolo \n`);

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
        response.write(`${values.username} has ${values.badges} badges`);
      });

      //on "error"
      studentProfile.on('error', (error) => {
        //show error
        response.write(`${error.message} \n`);
      });
    }
    return response;
  }

module.exports.home = home;
module.exports.user = user;
