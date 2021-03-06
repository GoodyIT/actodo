var dotenv = require('dotenv').load();
import * as http from 'http';
import * as debug from 'debug';

import App from './App';

var fs = require('fs');
var https = require('https');

var privateKey  = fs.readFileSync(process.env.CERTKEY, 'utf8');
var certificate = fs.readFileSync(process.env.CERTCRT, 'utf8');
var credentials = { key: privateKey, cert: certificate };

debug('ts-express:server');

const port = normalizePort(process.env.PORT || 3000);
App.set('port', port);

const server = https.createServer(credentials, App);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: number|string): number|string|boolean {
  let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  else return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') throw error;
  let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
  switch(error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  let addr = server.address();
  let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}
// Commented;; HTTPS server
// var dotenv = require('dotenv').load();
// import * as http from 'http';
// import * as debug from 'debug';
// import * as https from 'https';
// import * as path from 'path';
// import * as fs from 'fs';

// import App from './App';

// debug('ts-express:server');

// const port = normalizePort(process.env.PORT || 3000);
// App.set('port', port);

// // const server = http.createServer(App);
// const server = http.createServer(function (req, res) {
//     res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
//     res.end();
// });
// var options = {
//     // key: fs.readFileSync(path.join(__dirname, '../cert/key.pem')),
//     // cert: fs.readFileSync(path.join(__dirname, '../cert/cert.pem'))
//     key:"key",
//     cert:"cert"
// };
// https.createServer(options, App).listen(443);

// server.listen(port);
// server.on('error', onError);
// server.on('listening', onListening);

// function normalizePort(val: number|string): number|string|boolean {
//   let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
//   if (isNaN(port)) return val;
//   else if (port >= 0) return port;
//   else return false;
// }

// function onError(error: NodeJS.ErrnoException): void {
//   if (error.syscall !== 'listen') throw error;
//   let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
//   switch(error.code) {
//     case 'EACCES':
//       console.error(`${bind} requires elevated privileges`);
//       process.exit(1);
//       break;
//     case 'EADDRINUSE':
//       console.error(`${bind} is already in use`);
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// }

// function onListening(): void {
//   let addr = server.address();
//   let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
//   debug(`Listening on ${bind}`);
// }
