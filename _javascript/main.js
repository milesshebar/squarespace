var s = io.connect('http://localhost:8080');
//change this link to cslab.kenyon.edu:9000 to run on cslab

document.addEventListener('DOMContentLoaded', () => {
  d3.selectAll('.tile.is-child').on('click', function() {
    console.log(this.id + ' ID clicked');
    s.emit('message', {id: this.id});
  });
});

s.on('message', function(message) {
    //message: {id: '#tx', colorname: 'is-color'}
    if(message.colorname == 'is-primary') {
      $(message.id).removeClass('is-danger').addClass(message.colorname);
    } else if(message.colorname == 'is-link') {
      $(message.id).removeClass('is-primary').addClass(message.colorname);
    } else if(message.colorname == 'is-info') {
      $(message.id).removeClass('is-link').addClass(message.colorname);
    } else if(message.colorname == 'is-success') {
      $(message.id).removeClass('is-info').addClass(message.colorname);
    } else if(message.colorname == 'is-warning') {
      $(message.id).removeClass('is-success').addClass(message.colorname);
    } else if(message.colorname == 'is-danger') {
      $(message.id).removeClass('is-warning').addClass(message.colorname);
    } else {
      console.log('Error loading color class');
    }
});
