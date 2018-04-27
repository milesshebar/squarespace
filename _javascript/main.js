import {select, selectAll} from "d3-selection";

var s=io();

document.addEventListener('DOMContentLoaded', () => {
  console.log('Hello Bulma!');
});

s.on('message', function(message) {
    //message: {id: 'tx', colorname: 'is-color'}
    //d3.select(message.id).removeClass("current colorclass").addClass(message.colorname);
});

//d3.selectAll('tile is-child notification').on('click', changeColor);

function changeColor() {

}
