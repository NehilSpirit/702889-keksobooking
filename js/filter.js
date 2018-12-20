'use strict';
(function () {
  var FILTER_INITIAL = 'any';
  var Price = {
    LOW: 10000,
    MIDDLE: 50000
  };
  var filtersElement = document.querySelector('.map__filters');
  var filterTypeInput = filtersElement.querySelector('#housing-type');
  var filterPriceInput = filtersElement.querySelector('#housing-price');
  var filterRoomInput = filtersElement.querySelector('#housing-rooms');
  var filterGuestInput = filtersElement.querySelector('#housing-guests');
  var filterFeatureCheckbox = filtersElement.querySelectorAll('.map__feature');
  var markers = [];
  /* получает сетевые данные и вызывает функцию фильтрации */
  var onLoad = function (data) {
    checkInfo(data);
    return data;
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
    window.appendPin(markers);
  };
  /* Слушатели для фильтров */
  var onTypeChange = function () {
    forFilterChange();
  };
  var onPriseChange = function () {
    forFilterChange();
  };
  var onRoomsChange = function () {
    forFilterChange();
  };
  var onGuestsChange = function () {
    forFilterChange();
  };
  var onFeaturesChange = function () {
    forFilterChange();
  };
  var forFilterChange = function () {
    window.active.removePins();
    window.active.isPopup();
    window.appendPin(getFilters(markers));
  };
  /* Обработчики для фильтров */
  filterTypeInput.addEventListener('input', window.debounce(onTypeChange));
  filterPriceInput.addEventListener('input', window.debounce(onPriseChange));
  filterRoomInput.addEventListener('input', window.debounce(onRoomsChange));
  filterGuestInput.addEventListener('input', window.debounce(onGuestsChange));
  filterFeatureCheckbox.forEach(function (elem) {
    elem.addEventListener('click', window.debounce(onFeaturesChange));
  });

  /* Фильтры для каждого импута */
  var filterType = function (pin) {
    return filterTypeInput.value === FILTER_INITIAL ? true :
      pin.offer.type === filterTypeInput.value;
  };

  var filterPrice = function (pin) {
    switch (filterPriceInput.value) {
      case 'low':
        return pin.offer.price < Price.LOW;
      case 'middle':
        return pin.offer.price >= Price.LOW && pin.offer.price <= Price.MIDDLE;
      case 'high':
        return pin.offer.price > Price.MIDDLE;
      default:
        return true;
    }
  };
  var filterRoom = function (pin) {
    return filterRoomInput.value === FILTER_INITIAL ? true :
      pin.offer.rooms === parseInt(filterRoomInput.value, 10);
  };

  var filterGuest = function (pin) {
    return filterGuestInput.value === FILTER_INITIAL ? true :
      pin.offer.guests === parseInt(filterGuestInput.value, 10);
  };

  var filterFeature = function (pin) {
    var features = Array.from(filtersElement.querySelectorAll('.map__checkbox:checked'));
    return features.every(function (feature) {
      return pin.offer.features.includes(feature.value);
    });
  };

  var getFilters = function (items) {
    return items.filter(function (item) {
      return filterType(item) && filterPrice(item) && filterRoom(item) &&
        filterGuest(item) && filterFeature(item);
    });
  };
  var defaultFilters = function () {
    filterTypeInput.options[0].selected = true;
    filterPriceInput.options[0].selected = true;
    filterRoomInput.options[0].selected = true;
    filterGuestInput.options[0].selected = true;
    filtersElement.querySelectorAll('.map__checkbox').forEach(function (elem) {
      elem.checked = false;
    });
  };
  window.filter = {
    onLoad: onLoad,
    onError: onError,
    defaultFilters: defaultFilters
  };
})();
