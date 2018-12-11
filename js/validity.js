
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

  roomNumberInput.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value === '1') {
      capacityInput.options[0].disabled = true;
      capacityInput.options[1].disabled = true;
      capacityInput.options[2].disabled = false;
      capacityInput.options[3].disabled = true;
    } else if (target.value === '2') {
      capacityInput.options[0].disabled = true;
      capacityInput.options[1].disabled = false;
      capacityInput.options[2].disabled = false;
      capacityInput.options[3].disabled = true;
    } else if (target.value === '3') {
      capacityInput.options[0].disabled = false;
      capacityInput.options[1].disabled = false;
      capacityInput.options[2].disabled = false;
      capacityInput.options[3].disabled = true;
    } else {
      capacityInput.options[0].disabled = true;
      capacityInput.options[1].disabled = true;
      capacityInput.options[2].disabled = true;
      capacityInput.options[3].disabled = false;
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


