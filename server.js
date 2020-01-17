const express = require('express');

const projectsRouter = require('./router/projectsRouter.js'); 
const actionsRouter = require('./router/actionsRouter.js');

const server = express();

server.use(express.json());
server.use(logger);
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>API Challenge!</h2>`);
});


// customer logger middleware
function logger(req, res, next) {
  const { method, originalUrl} = req;
  console.log(`${method} to ${originalUrl}`);

  next();
}


module.exports = server;