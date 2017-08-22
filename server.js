// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// get configuration 
const config = require('./server/configuration');

// get api routes
const api = require('./server/routes/api');

const app = express();

// POST data parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Static content
app.use(express.static(path.join(__dirname, 'dist')));

// Init routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Start server
app.set('port', config.serverPort);
const server = http.createServer(app);
server.listen(config.serverPort, () => console.log(`API running on localhost: ${config.serverPort}`));
