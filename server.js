'use strict';

var http = require('http');
var fs = require('fs');

// Loading the index file . html displayed to the client
var server = http.createServer(function(req, res) {
  var url = req.url;
  // If no path, get the index.html
  if (url == "/")
    url = "/index.html";

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

// Loading socket.io
var io = require('socket.io').listen(server);

io.sockets.on('connection', (s) => {
  //sends state of tiles upon connection
  for (var i = 0; i < tiles.length; i++) {
    s.emit('message', {
      id: '#t' + `${i + 1}`,
      colorname: getColorString(tiles[i])
    });
  }
  s.on('message', function(message) {
    incrementTile(message.id);
  });
});

var tiles = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
const colorValues = ['is-primary', 'is-link', 'is-info', 'is-success', 'is-warning', 'is-danger'];
const numberOfColors = colorValues.length;

function incrementTile(tileId) {
  //increments the array value corresponding with the tile id
  var idNum = parseId(tileId);
  tiles[idNum - 1]++;
  updateClient(tileId, tiles[idNum - 1]);
}

function updateClient(tileNum, colorInt) {
  //sends tile id and color to client
  var colorString = getColorString(colorInt);
  io.emit('message', {
    id: '#' + tileNum,
    colorname: colorString
  });
}

function getColorString(colorInt) {
  //determines color class for the tile based on the integer in the array
  return colorValues[colorInt%numberOfColors];
}

function parseId(idString) {
  //gets id of tile clicked on the server side and parses the integer in the tile id
  var numString = idString.substr(1);
  return parseInt(numString);
}

server.listen(8080);
//change this to 9000 to run on cslab
