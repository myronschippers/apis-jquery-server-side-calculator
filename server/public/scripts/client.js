console.log('WOOT!!!');
$(document).ready(onReady);

const mathsObject = {
  num1: 0,
  num2: 0,
  operator: null,
};

function onReady() {
  console.log('$ is ready');
  // event listeners
  $('.js-btn-op').on('click', clickOp);
  $('.js-equation-form').on('submit', submitForm);
  $('.js-btn-clear').on('click', clearFields);

  getHistory();
}

function clearFields() {
  $('.js-num1').val('');
  $('.js-num2').val('');
}

function clickOp() {
  console.log('PLUS');
  mathsObject.operator = $(this).data('op');
}

// function clickOpMinus() {
//   console.log('MINUS');
//   mathsObject.operator = $(this).data('op');
// }

function submitForm(event) {
  event.preventDefault();

  mathsObject.num1 = $('.js-num1').val();
  mathsObject.num2 = $('.js-num2').val();

  // AJAX Call to POST DATA
  postEquation();
}

function postEquation() {
  $.ajax({
    type: 'POST',
    url: '/api/equation',
    data: mathsObject,
  })
  .then((response) => {
    // get our stuff
    getHistory();
  })
  .catch((err) => {
    console.log(err);
    alert('WOW!!! Stuff went wrong!');
  })
}

function getHistory() {
  console.log('TOTES get stuff');
  $.ajax({
    type: 'GET',
    url: '/api/equation'
  })
  .then((response) => {
    // render stuff
    render(response);
  })
  .catch((err) => {
    console.log(err);
    alert('WOW!!! Stuff went wrong!');
  })
}

function render(history) {
  console.log(history);
  if (history.length > 0) {
    $('.js-solution').text(history[history.length - 1].solution);
  }

  $('.js-history').empty();
  for (let equation of history) {
    $('.js-history').append(`<li>${equation.num1} ${equation.operator} ${equation.num2} = ${equation.solution}</li>`);
  }
}