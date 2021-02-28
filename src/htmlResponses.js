const fs = require('fs');

const jokeClientPage = fs.readFileSync(`${__dirname}/../client/joke-client.html`);
const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);

const get404Response = (request, response) => {
  response.writeHead(404, {
    'Content-Type': 'text/html',
  });
  response.write(errorPage);
  response.end();
};

const getJokeClientResponse = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/html',
  });
  response.write(jokeClientPage);
  response.end();
};

module.exports.get404Response = get404Response;
module.exports.getJokeClientResponse = getJokeClientResponse;
