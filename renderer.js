const fs = require('fs');

function mergeValues(values, fileContents) {
  //cycle over keys
  for(let key in values) {
    //replace all {{key}} with actual values
    fileContents = fileContents.replace(`{{${key}}}`, values[key]);
  }
  //return merged content
  return fileContents;
}

function view(templateName, values, response) {
  //read from file template file
  let fileContents = fs.readFileSync(`./views/${templateName}.html`, {encoding: 'utf8'});

  //Insert values in the content
  fileContents = mergeValues(values, fileContents);

  //write out the response
  response.write(fileContents);
}

module.exports.view = view;
