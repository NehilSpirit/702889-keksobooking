
'use strict';
(function () {
  var MAX_ROOM_NUM = 100;

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

  var setCapacity = function (e) {
    cpacityOptionsCondition(e.target.value);
  };

  var setOptionsDisabled = function (inpt) {
    Array.prototype.forEach.call(inpt.options, function (option) {
      option.disabled = true;
    });
  };

  var cpacityOptionsCondition = function (roomNumInpt) {
    setOptionsDisabled(capacityInput);
    var roomNum = parseInt(roomNumInpt, 10);
    if (roomNum === MAX_ROOM_NUM) {
      capacityInput.options[capacityInput.length - 1].disabled = false;
      capacityInput.options[capacityInput.length - 1].selected = true;
    } else {

      var cpArray = [];
      for (var i = 0; i < capacityInput.options.length; i++) {
        var option = capacityInput.options[i];
        cpArray.push(option);
      }
      cpArray = cpArray.slice(0, -1);
      var filteredArray = cpArray.filter(function (element) {
        var value = parseInt(element.value, 10);
        return value <= roomNum;
      });
      filteredArray.forEach(function (opt) {
        opt.disabled = false;
      });
      filteredArray[0].selected = true;
    }
  };

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
  /* отправляет данные формы на сервер  */
  var form = document.querySelector('.ad-form');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), function () {
      if (window.onSucsess) {
        window.createSucsess();
      } if (window.onError) {
        window.createError();
      }
    });
    evt.stopPropagation(); // тут надо вернуть форме настройки по дефолту как?
  });


  roomNumberInput.addEventListener('input', setCapacity);
  cpacityOptionsCondition(roomNumberInput.value);
})();


