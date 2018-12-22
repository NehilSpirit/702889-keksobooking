
'use strict';
(function () {
  var mapPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map__pins');
  var inputAddress = document.querySelector('#address');
  var MAX_X = map.offsetWidth;
  var MAX_Y = 630;
  var MIN_X = 0;
  var MIN_Y = 130;
  var PIN_HEIGHT = 66;
  var PIN_WIDTH = 66;
  var startCoords = {};
  var dragged = '';

  mapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    dragged = false;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  var onMouseMove = function (evt) {
    var moveEvt = evt;
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var mapPinStyleLeft = mapPin.offsetLeft - shift.x;
    var mapPinStyleTop = mapPin.offsetTop - shift.y;


    if (mapPin.offsetLeft - shift.x + PIN_WIDTH / 2 <= MIN_X) {
      mapPin.style.left = MIN_X - PIN_WIDTH / 2 + 'px';
    } else if (mapPin.offsetLeft - shift.x + PIN_WIDTH / 2 >= MAX_X) {
      mapPin.style.left = (MAX_X - PIN_WIDTH / 2) + 'px';
    } else {
      mapPin.style.left = mapPinStyleLeft + 'px';
    }

    if ((mapPin.offsetTop - shift.y + PIN_HEIGHT) <= MIN_Y) {
      mapPin.style.top = MIN_Y - PIN_HEIGHT + 'px';
    } else if (mapPin.offsetTop - shift.y >= MAX_Y) {
      mapPin.style.top = MAX_Y + 'px';
    } else {
      mapPin.style.top = mapPinStyleTop + 'px';
    }
    inputAddress.value = (mapPin.offsetTop + PIN_HEIGHT) + ',' + (mapPin.offsetLeft - shift.x + PIN_WIDTH / 2);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    if (dragged) {
      var onClickPreventDefault = function (evt) {
        evt.preventDefault();
        inputAddress.value = (upEvt.clientY + PIN_HEIGHT) + ', ' + (upEvt.clientX + PIN_WIDTH / 2);
        mapPin.removeEventListener('click', onClickPreventDefault);
      };
      mapPin.addEventListener('click', onClickPreventDefault);
    }

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  window.inputAddress = inputAddress;
})();

