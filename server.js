const express = require('express');
const server = express();

const apiRouter = require('./api/apiRouter');

server.use('/api', apiRouter);

const PORT = 4000;

server.listen(PORT, () => {
    console.log(`===Server Listening on port ${PORT}===`)
});