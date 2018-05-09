'use strict';

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

/*var t1 = 'is-primary';
var t2 = 'is-link';
var t3 = 'is-info';
var t4 = 'is-success';
var t5 = 'is-warning';
var t6 = 'is-danger';
var t7 = 'is-primary';
var t8 = 'is-link';
var t9 = 'is-info';

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

  s.on('message', function(message) {
    //set tile color to next color in order
    console.log(message.id);
    getVar(message.id);
    //push changes to clients
  });
});

function changeColor(id){
  if(id=='is-danger'){
    id = 'is-primary';
  } else if(id=='is-primary'){
    id = 'is-link';
  } else if(id=='is-link'){
    id = 'is-info';
  } else if(id=='is-info'){
    id = 'is-success';
  } else if(id=='is-success'){
    id = 'is-warning';
  } else if(id=='is-warning'){
    id = 'is-danger';
  } else {
    console.log('Error loading color class');
  }

  return id;
}

function getVar(idName){
  idName = "#" + idName;
  if(idName === "#t1"){
    t1 = changeColor(t1);
    io.emit('message',{id: idName, colorname: t1});
  } else if(idName === '#t2'){
    t2 = changeColor(t2);
    io.emit('message',{id: idName, colorname: t2});
  } else if(idName === '#t3'){
    t3 = changeColor(t3);
    io.emit('message',{id: idName, colorname: t3});
  } else if(idName === '#t4'){
    t4 = changeColor(t4);
    io.emit('message',{id: idName, colorname: t4});
  } else if(idName === '#t5'){
    t5 = changeColor(t5);
    io.emit('message',{id: idName, colorname: t5});
  } else if(idName === '#t6'){
    t6 = changeColor(t6);
    io.emit('message',{id: idName, colorname: t6});
  } else if(idName === '#t7'){
    t7 = changeColor(t7);
    io.emit('message',{id: idName, colorname: t7});
  } else if(idName === '#t8'){
    t8 = changeColor(t8);
    io.emit('message',{id: idName, colorname: t8});
  } else if(idName === '#t9'){
    t9 = changeColor(t9);
    io.emit('message',{id: idName, colorname: t9});
  }
}*/


io.sockets.on('connection', (s) => {
  console.log('Socket.io client connected');
  for(var i = 0; i < tiles.length; i++){
    s.emit('message', {id: `#t${i+1}`+, colorname: getColorString(tiles[i])});
  }
  s.on('message', function(message) {
    incrementTile(message.id);
  });
});
var tiles = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function incrementTile(tileId){
  //get the id number
  //tiles[id-1]++
  //updateClient(tileId, tiles[id-1])
  var idNum = parseId(tileId);
  tiles[idNum-1]++;
  updateClient(tileId, tiles[idNum-1]);
  }
}

updateClient(tileNum, colorInt){
  var colorString = getColorString(colorInt);
  io.emit('message',{id: tileNum, colorname: colorString});
}

getColorString(colorInt){
  if(colorInt%6===0){
    return 'is-primary';
  }else if(colorInt%6===1){
    return 'is-link';
  }else if(colorInt%6===2){
    return 'is-info';
  }else if(colorInt%6===3){
    return 'is-success';
  }else if(colorInt%6===4){
    return 'is-warning';
  }else if(colorInt%6===5){
    return 'is-danger';
  }else{
    console.log('Error getting color info');
  }
}

parseId(idString){
  var numString = idString.substr(2);
  return parseInt(numString);
  //wasn't sure if the id would be #t1 or t1
}


server.listen(8080);
//change this to 9000 to run on cslab

//console.log('node-live-color example - see: https://github.com/rsp/node-live-color');
