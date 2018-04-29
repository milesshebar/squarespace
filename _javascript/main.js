//import {select, selectAll} from "d3-selection";

var s= io.connect('http://cslab.kenyon.edu:8080');

document.addEventListener('DOMContentLoaded', () => {
  console.log('Hello Bulma!');
  d3.selectAll('tile is-child notification').on('click', function() {
    console.log(this.id + 'ID clicked')
    s.emit('message', {id: this.id});
  });
});

s.on('message', function(message) {
    //message: {id: '#tx', colorname: 'is-color'}
    console.log(message.id);
    if(message.colorname == 'is-primary') {
      d3.select(message.id).removeClass('is-danger').addClass(message.colorname);
    } else if(message.colorname == 'is-link') {
      d3.select(message.id).removeClass('is-primary').addClass(message.colorname);
    } else if(message.colorname == 'is-info') {
      d3.select(message.id).removeClass('is-link').addClass(message.colorname);
    } else if(message.colorname == 'is-success') {
      d3.select(message.id).removeClass('is-info').addClass(message.colorname);
    } else if(message.colorname == 'is-warning') {
      d3.select(message.id).removeClass('is-success').addClass(message.colorname);
    } else if(message.colorname == 'is-danger') {
      d3.select(message.id).removeClass('is-warning').addClass(message.colorname);
    } else {
      console.log('Error loading color class');
    }
});
