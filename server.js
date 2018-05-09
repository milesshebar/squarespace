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
  if (colorInt % 6 === 0) {
    return 'is-primary';
  } else if (colorInt % 6 === 1) {
    return 'is-link';
  } else if (colorInt % 6 === 2) {
    return 'is-info';
  } else if (colorInt % 6 === 3) {
    return 'is-success';
  } else if (colorInt % 6 === 4) {
    return 'is-warning';
  } else if (colorInt % 6 === 5) {
    return 'is-danger';
  } else {
    console.log('Error getting color info');
  }
}

function parseId(idString) {
  //gets id of tile clicked on the server side and parses the integer in the tile id
  var numString = idString.substr(1);
  return parseInt(numString);
}

server.listen(8080);
//change this to 9000 to run on cslab
