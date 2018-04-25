import {select, selectAll} from "d3-selection";


document.addEventListener('DOMContentLoaded', () => {
  console.log('Hello Bulma!');
});

$(document).ready(function() {
    d3.selectAll('tile is-child notification is-primary').on('click', changeColor);
});

function changeColor() {
    if ($(this).hasClass('is-primary')) {
        console.log('Changed Primary Color')
        $(this).removeClass('is-primary').addClass('is-secondary');
    } else if ($(this).hasClass('is-secondary')) {
        console.log('Changed Secondary Color')
        $(this).removeClass('is-secondary').addClass('is-primary');
    }
}
