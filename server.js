'use strict';

const path = require('path');
const express = require('express');
const http = require('http');
const socket = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
const server = http.Server(app);
const io = socket(server);

const port = process.env.PORT || 3338;

let color = 'is-primary';
let tile = '';
let t1 = 'is-primary';
let t2 = 'is-primary';
let t3 = 'is-primary';
let t4 = 'is-primary';
let t5 = 'is-primary';
let t6 = 'is-primary';
let t7 = 'is-primary';
let t8 = 'is-primary';
let t9 = 'is-primary';

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, 'html')));

io.on('connection', (s) => {
  console.log('Socket.io client connected');
  s.emit('message', {id: '#t1', colorname: t1});
  s.emit('message', {id: '#t2', colorname: t2});
  s.emit('message', {id: '#t3', colorname: t3});
  s.emit('message', {id: '#t4', colorname: t4});
  s.emit('message', {id: '#t5', colorname: t5});
  s.emit('message', {id: '#t6', colorname: t6});
  s.emit('message', {id: '#t7', colorname: t7});
  s.emit('message', {id: '#t8', colorname: t8});
  s.emit('message', {id: '#t9', colorname: t9});
});

app.post('/color', (req, res) => {
  color = req.body.color;
  console.log('Changing color to', color);
  io.emit('color', color);
  res.send({ color });
  'message'
});

/*app.get('/color/:color', (req, res) => {
  color = req.params.color.replace('+', '#');
  console.log('Changing color to', color);
  io.emit('color', color);
  res.send({ color });
});*/

/*app.post('/message', (req, res) => {
  color = req.body.Body;
  console.log('Changing color to', color);
  io.emit('color', color);
  res.end();
});*/

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});

console.log('node-live-color example - see: https://github.com/rsp/node-live-color');
