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
  s.emit('color', color);
});

app.post('/color', (req, res) => {
  color = req.body.color;
  console.log('Changing color to', color);
  io.emit('color', color);
  res.send({ color });
});

app.get('/color/:color', (req, res) => {
  color = req.params.color.replace('+', '#');
  console.log('Changing color to', color);
  io.emit('color', color);
  res.send({ color });
});

app.post('/message', (req, res) => {
  color = req.body.Body;
  console.log('Changing color to', color);
  io.emit('color', color);
  res.end();
});

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});

console.log('node-live-color example - see: https://github.com/rsp/node-live-color');
