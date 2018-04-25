
document.addEventListener('DOMContentLoaded', () => {
  console.log('Hello Bulma!');
});

d3.selectAll('tile is-child notification is-primary').on('click', changeColor);

function changeColor() {
    if ($(this).hasClass('is-primary')) {
        $(this).removeClass('is-primary').addClass('is-secondary');
    } else if ($(this).hasClass('is-secondary'))
        $(this).removeClass('is-secondary').addClass('is-primary');
    }
}
