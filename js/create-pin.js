'use strict';
(function () {
  var PIN_HEIGHT = 40;
  var PIN_WIDTH = 40;

  /* шаблон  для меток который будем вставлять */
  var similarPinTemplate = document.querySelector('#pin')
.content.querySelector('.map__pin');

  /*  функция создает шаблон метки и заполняет данными из массива ads */
  var createPin = function (item) {

    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.style.left = item.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = item.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = item.author.avatar;
    pinElement.querySelector('img').alt = item.offer.title;

    return pinElement;
  };
  window.createPin = createPin;
})();
