// Load process.env via .env package
require('dotenv').config();

// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// get configuration 
const config = require('./server/configuration');

// get api routes
const webUiApi = require('./server/routes/webui.api');
const assetApi = require('./server/routes/asset.api');
const app = express();

// POST data parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create middleware for checking the JWT
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: config.oidcWellKnown
  }),

  // Validate the audience and the issuer.
  audience: config.oidcAudience,
  issuer: config.oidcIssuer,
  algorithms: ['RS256']
});

// Static content
app.use(express.static(path.join(__dirname, 'dist')));

// Init web ui routes
app.use('/api/webui', checkJwt, webUiApi);

// Init asset routes, used for submitting asset data points
app.use('/api/assets', assetApi);


// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Start server
app.set('port', config.serverPort);
const server = http.createServer(app);
server.listen(config.serverPort, () => console.log(`API running on localhost: ${config.serverPort}`));
