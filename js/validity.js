/* eslint-disable strict */
'use strict';
(function () {
  var priceInput = document.querySelector('#price');
  var typeInput = document.querySelector('#type');

  var roomNumberInput = document.querySelector('#room_number');
  var capacityInput = document.querySelector('#capacity');

  var timeinInput = document.querySelector('#timein');
  var timeoutInput = document.querySelector('#timeout');

  timeoutInput.addEventListener('input', function (evt) {
    timeinInput.value = evt.target.value;
  });

  timeinInput.addEventListener('input', function (evt) {
    timeoutInput.value = evt.target.value;
  });

  typeInput.addEventListener('input', function (evt) {
    defineMinPrise(evt.target.value);
  });

  capacityInput.addEventListener('input', function (evt) {
    var target = evt.target;
    if ((target.value <= roomNumberInput.value) && (roomNumberInput.value !== 100)) {
      target.setCustomValidity('');
    } else if (roomNumberInput.value === 100) {
      target.value = 0;
      target.setCustomValidity('');
    } else {
      target.setCustomValidity('Вы выбрли некорректное количество гостей');
    }
  }); 
 
  var defineMinPrise = function (obj) {
    var price;
    switch (obj) {
      case 'bungalo':
        price = '0';
        break;
      case 'flat':
        price = '1000';
        break;
      case 'house':
        price = '5000';
        break;
      case 'palace':
        price = '10000';
        break;
      default:
    }
    priceInput.minlength = priceInput.placeholder = price;
  };
})();


