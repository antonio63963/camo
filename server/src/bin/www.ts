#!/usr/bin/env node
require('dotenv').config()
import cluster from 'cluster';
import http from 'http';
import os from 'os';

import app from '../app';

const port = normalizePort(process.env.PORT || '3000');
console.log('PORT: ', port, process.env.PORT)
if (cluster.isPrimary) {
  const cpuCount = os.cpus().length;
  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }
} else {
  const server = http.createServer(app);
  server.listen(port);
}

function normalizePort(val: string) {
  const parsedPort = parseInt(val, 10);

  if (isNaN(parsedPort)) {
    // named pipe
    return val;
  }

  if (parsedPort >= 0) {
    // port number
    return parsedPort;
  }

  return false;
}
