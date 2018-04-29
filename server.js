'use strict';

/*const path = require('path');
const express = require('express');
const http = require('http');
const socket = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
const server = http.Server(app);
const io = socket(server);

const port = process.env.PORT || 3338;*/

var http = require('http');
var fs = require('fs');

// Loading the index file . html displayed to the client
var server = http.createServer(function(req, res) {
  var url = req.url;
  // If no path, get the index.html
  if (url == "/") url = "/index.html";
  // get the file extension (needed for Content-Type)
  var ext = url.split('.').pop();
  console.log(url + "  :  " + ext);
  // convert file type to correct Content-Type
  var memeType = 'html'; // default
  switch (ext) {
    case 'css':
      memeType = 'css';
      break;
    case 'png':
      memeType = 'png';
      break;
    case 'jpg':
      memeType = 'jpeg';
      break;
  }
  // Send the requested file
  fs.readFile('.' + url, 'utf-8', function(error, content) {
    res.writeHead(200, {
      "Content-Type": "text/" + memeType
    });
    res.end(content);
  });
});

console.log("Loaded index file");
// Loading socket.io
var io = require('socket.io').listen(server);

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

/*app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, 'html')));*/

io.sockets.on('connection', (s) => {
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
  //push current state if tiles to connection
});



/*app.post('/color', (req, res) => {
  color = req.body.color;
  console.log('Changing color to', color);
  io.emit('color', color);
  res.send({ color });
  'message'
});*/

io.on('message', function(message) {
  //set tile color to next color in order
  console.log(message.id);
  getVar(message.id);
  //push changes to clients
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

/*server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});*/

function changeColor(id){
  if(id==='is-danger'){
    id = 'is-primary';
  }
  else if(id==='is-primary'){
    id = 'is-link';
  }
  else if(id==='is-link'){
    id = 'is-info';
  }
  else if(id==='is-info'){
    id = 'is-success';
  }
  else if(id==='is-success'){
    id = 'is-warning';
  }
  else if(id==='is-warning'){
    id = 'is-danger';
  }
  else {
    console.log('Error loading color class');
  }
}

function getVar(idName){
  if(idName === "#t1"){
    changeColor(t1);
    io.emit('message',{id: idName, colorname: t1});
  }else if(idName === '#t2'){
    changeColor(t2);
    io.emit('message',{id: idName, colorname: t2});
  }else if(idName === '#t3'){
    changeColor(t3);
    io.emit('message',{id: idName, colorname: t3});
  }else if(idName === '#t4'){
    changeColor(t4);
    io.emit('message',{id: idName, colorname: t4});
  }else if(idName === '#t5'){
    changeColor(t5);
    io.emit('message',{id: idName, colorname: t5});
  }else if(idName === '#t6'){
    changeColor(t6);
    io.emit('message',{id: idName, colorname: t5});
  }else if(idName === '#t7'){
    changeColor(t7);
    io.emit('message',{id: idName, colorname: t7});
  }else if(idName === '#t8'){
    changeColor(t8);
    io.emit('message',{id: idName, colorname: t8});
  }else if(idName === '#t9'){
    changeColor(t9);
    io.emit('message',{id: idName, colorname: t9});
  }
}

server.listen(8080);

//console.log('node-live-color example - see: https://github.com/rsp/node-live-color');
