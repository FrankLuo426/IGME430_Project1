const fs = require('fs');

const clientStyle = fs.readFileSync(`${__dirname}/../style/clientStyle.css`);

const listStyle = fs.readFileSync(`${__dirname}/../style/listStyle.css`);

const getClientStyleResponse = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/css',
  });
  response.write(clientStyle);
  response.end();
};

const getlistStyleResponse = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/css',
  });
  response.write(listStyle);
  response.end();
};

module.exports.getClientStyleResponse = getClientStyleResponse;
module.exports.getlistStyleResponse = getlistStyleResponse;
