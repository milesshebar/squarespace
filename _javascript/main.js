import {select, selectAll} from "d3-selection";


document.addEventListener('DOMContentLoaded', () => {
  console.log('Hello Bulma!');
});

$(document).ready(function() {
    d3.selectAll('tile is-child notification is-primary').on('click', changeColor);
});

function changeColor() {
    if (d3.select(this).hasClass('is-primary')) {
        d3.select(this).removeClass('is-primary').addClass('is-secondary');
    } else if (d3.select(this).hasClass('is-secondary')) {
        d3.select(this).removeClass('is-secondary').addClass('is-primary');
    }
}
