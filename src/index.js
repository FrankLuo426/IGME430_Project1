const http = require('http');

const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./responses.js');
const mediaHandler = require('./mediaResponses');

const urlStruct = {
  '/': jsonHandler.getRandomNPCResponse,
  '/default-styles.css': jsonHandler.getCSSResponse,
  '/user-npc-list': jsonHandler.getUserNPCList,
  '/npc-client': htmlHandler.getnpcClientResponse,
  '/npc-list': htmlHandler.getNPCListResponse,
  '/client-style': mediaHandler.getClientStyleResponse,
  '/list-style': mediaHandler.getlistStyleResponse,
  notFound: htmlHandler.get404Response,
};

// 3 - locally this will be 3000, on Heroku it will be assigned
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/custom-npc') {
    const body = [];

    // https://nodejs.org/api/http.html
    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString(); // name=tony&age=35
      const bodyParams = query.parse(bodyString); // turn into an object with .name & .age
      jsonHandler.customNPC(request, response, bodyParams);
    });
  }
};

const onRequest = (request, response) => {
  let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
  acceptedTypes = acceptedTypes || [];

  const parsedUrl = url.parse(request.url);
  const {
    pathname,
  } = parsedUrl;

  if (request.method === 'POST') {
    // handle POST
    handlePost(request, response, parsedUrl);
    return; // bail out of function
  }

  const params = query.parse(parsedUrl.query);
  const httpMethod = request.method;

  if (urlStruct[pathname]) {
    urlStruct[pathname](request, response, params, acceptedTypes, httpMethod);
  } else {
    urlStruct.notFound(request, response);
  }
};

// 8 - create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port);
