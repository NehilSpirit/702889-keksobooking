'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  // var housingFeature = mapFilters.querySelectorAll('.map__feature');
  var housingFeatures = mapFilters.querySelector('#housing-features');
  var inputFeature = housingFeatures.querySelectorAll('input');

  var type;
  var price;
  var rooms;
  var guests;
  var features = [];
  var markers = [];
  console.log(markers + 'markers');


  /* получает сетевые данные и вызывает функцию фильтрации */
  var onLoad = function (data) {
    checkInfo(data);
  };
  /* сообщает об ошибке при загрузке данных*/
  var onError = function (message) {
    return message;
  };
  /* фильтрует полученные данные и вызывает отрисовку пинов */
  var checkInfo = function (info) {
    var infoFilter = info.filter(function (element) {
      if (element.offer) {
        return true;
      }
      return false;
    });
    markers = infoFilter;
    console.log(markers);
    window.appendPin(markers);
  };

  var onTypeChange = function (evt) {
    type = evt.target.value;
    console.log(type);
    window.active.removePins();
    window.active.isPopup();
    updateMarkers();
  };
  var onPriseChange = function (evt) {
    price = evt.target.value;
    console.log(price);
    window.active.removePins();
    window.active.isPopup();
    updateMarkers();
  };
  var onRoomsChange = function (evt) {
    rooms = parseInt(evt.target.value, 10);
    console.log(rooms);

    window.active.removePins();
    window.active.isPopup();
    updateMarkers();
  };
  var onGuestsChange = function (evt) {
    guests = parseInt(evt.target.value, 10);
    console.log(guests);

    window.active.removePins();
    window.active.isPopup();
    updateMarkers();
  };
  var onFeaturesChange = function (evt) {
    if (evt.target.checked) {
      features.push(evt.target.value);//
      console.log(features);
    }else {
      features.pop(evt.target.value);
    }
    window.active.removePins();
    window.active.isPopup();
    updateMarkers();
  };
  /* Обработчики для фильтров */
  housingType.addEventListener('input', onTypeChange);
  housingPrice.addEventListener('input', onPriseChange);
  housingRooms.addEventListener('input', onRoomsChange);
  housingGuests.addEventListener('input', onGuestsChange);
  inputFeature.forEach(function (elem) {
    elem.addEventListener('click', onFeaturesChange);
  });

  /* Ранжирует свойства */
  var getRank = function (marker) {
    var rank = 0;
    if (marker.offer.type === type) {
      console.log(marker.offer.type);
      rank += 5;
    }
    if (getPrice(marker.offer.price) === price) {
      console.log(marker.offer.price);
      rank += 4;
    }
    if (marker.offer.rooms === rooms) {
      console.log(marker.offer.rooms);
      rank += 3;
    }
    if (marker.offer.guests === guests) {
      console.log(marker.offer.guests);
      rank += 2;
    }
    if (marker.offer.features === features) {
      console.log(marker.offer.features);
      rank += 1;
    }
    return rank;
  };
  /* если два обьекта одинпковы по рангу, ставит по алфавиту заголовка */
  var titleComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };
  /* Сортирует по рангу обьектов*/
  var updateMarkers = function () {
    window.appendPin(markers.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = titleComparator(left.title, right.title);
      }
      return rankDiff;
    }));
  };
  /* Возвращает price в нужном формате*/
  var getPrice = function (num) {
    var res = '';
    if (num > 10000 && num < 50000) {
      res = 'middle';
    }
    if (num < 10000) {
      res = 'low';
    }
    if (num > 50000) {
      res = 'high';
    }
    return res;
  };

  window.filter = {
    onError: onError,
    onLoad: onLoad
  };

})();

// Файл debounce.js
// это надо подключить ко всем слушателям
(function () {
  var DEBOUNCE_INTERVAL = 300; // ms

  window.debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
