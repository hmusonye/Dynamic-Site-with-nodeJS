const fs = require('fs');

function view(templateName, values, response) {
  //read from file template file
  let fileContents = fs.readFileSync(`./views/${templateName}.html`);
  //Insert values in the content

  //write out the response
  response.write(fileContents);
}

module.exports.view = view;
