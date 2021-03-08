const fs = require('fs');

const npcClientPage = fs.readFileSync(`${__dirname}/../client/npc-client.html`);
const npcListPage = fs.readFileSync(`${__dirname}/../client/npc-list.html`);
const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);

const get404Response = (request, response) => {
  response.writeHead(404, {
    'Content-Type': 'text/html',
  });
  response.write(errorPage);
  response.end();
};

const getnpcClientResponse = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/html',
  });
  response.write(npcClientPage);
  response.end();
};

const getNPCListResponse = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/html',
  });
  response.write(npcListPage);
  response.end();
};

module.exports.get404Response = get404Response;
module.exports.getnpcClientResponse = getnpcClientResponse;
module.exports.getNPCListResponse = getNPCListResponse;
