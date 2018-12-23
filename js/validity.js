
'use strict';
(function () {
  var MAX_ROOM_NUM = 100;
  var adFormReset = document.querySelector('.ad-form__reset');
  var form = document.querySelector('.ad-form');
  var title = form.querySelector('#title');
  var desciption = form.querySelector('#description');
  var feature = form.querySelectorAll('.feature__checkbox');
  var priceInput = form.querySelector('#price');
  var typeInput = form.querySelector('#type');
  var roomNumberInput = form.querySelector('#room_number');
  var capacityInput = form.querySelector('#capacity');
  var timeinInput = form.querySelector('#timein');
  var timeoutInput = form.querySelector('#timeout');

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
  /* возврыщает форме значения по умолчанию*/
  var backFormDefoalt = function () {
    title.value = '';
    desciption.value = '';
    priceInput.value = '';
    typeInput.options[1].selected = 'true';
    timeinInput.options[0].selected = 'true';
    timeoutInput.options[0].selected = 'true';
    roomNumberInput.options[0].selected = 'true';
    capacityInput.options[0].selected = 'true';
    feature.forEach(function (elem) {
      elem.checked = false;
    });
    cpacityOptionsCondition(roomNumberInput.value);
  };
  /* сообщает об успешной отправке формы*/
  var onSucsess = function () {
    window.main.createAds(window.main.templateSucsess, window.main.main);
    window.active.deactivatePage();
    backFormDefoalt();
  };
  /* сообщает об ошибке отправки  формы*/
  var onError = function () {
    window.main.createAds(window.main.templateError, window.main.main);
  };

  /* отправляет данные формы на сервер  */
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(form);
    window.backend.save(formData, onSucsess, onError);
  });
  /* переводит страницу в неактивное состояние по нажатию на кнопку "очистить" */
  adFormReset.addEventListener('keypress', function () {
    backFormDefoalt();
    window.active.deactivatePage();
  });
  /* переводит страницу в неактивное состояние по клику на кнопку "очистить" */
  adFormReset.addEventListener('click', function () {
    backFormDefoalt();
    window.active.deactivatePage();
  });
  roomNumberInput.addEventListener('input', setCapacity);
  cpacityOptionsCondition(roomNumberInput.value);
})();


