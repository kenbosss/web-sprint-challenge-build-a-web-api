const express = require('express');
const server = express();
const projectRouters = require('./projects/projects-router');
const actionRouters = require('./actions/actions-router');





// Configure your server here
server.use(express.json())
server.use('/api/projects',projectRouters)
server.use('/api/actions', actionRouters)
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
