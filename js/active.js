'use strict';
/* Для активации полей форм и меток */
(function () {
  var mapFilters = document.querySelector('.map__filters');
  var mapFilter = document.querySelectorAll('.map__filter');
  var adFormElement = document.querySelectorAll('.ad-form__element');
  var adForm = document.querySelector('.ad-form.ad-form--disabled');
  var mapFaded = document.querySelector('.map.map--faded');
  var activeButton = document.querySelector('.map__pin--main');
  var housingFeatures = mapFilters.querySelector('#housing-features');
  console.log(housingFeatures);

  /* возвращает центральный пин на место по умолчанию */
  var backInPlase = function (variab, left, top) {
    variab.style.left = left + 'px';
    variab.style.top = top + 'px';
  };
  /* удаляет карточку обьявления, если она есть*/
  var isPopup = function () {
    var popup = document.querySelector('.map__card.popup');
    if (popup) {
      popup.parentNode.removeChild(popup);
    }
  };
  /* Удaляет атрибут disabled*/
  var removeDisabled = function (element) {
    element.removeAttribute('disabled');
  };
  /* Добавляет атрибут disabled*/
  var addDisabled = function (elem) {
    elem.setAttribute('disabled', 'disabled');
  };

  var removePins = function () {
    Array.prototype.slice.call(document.querySelectorAll('.map__pin'), 1)
    .forEach(function (e) {
      e.parentNode.removeChild(e);
    });
  };


  /* По клику активирует форму и пины */
  var onActiveButtonMouseup = function () {
    mapFaded.classList.remove('map--faded');
    mapFilters.removeAttribute('disabled');
    adForm.classList.remove('ad-form--disabled');
    removeDisabled(adForm);
    removeDisabled(housingFeatures);

    mapFilter.forEach(function (elem) {
      removeDisabled(elem);
    });
    adFormElement.forEach(function (elem) {
      removeDisabled(elem);
    });
    window.backend.load(window.filter.onLoad, window.filter.onError);
  };

  activeButton.addEventListener('mouseup', onActiveButtonMouseup, {once: true});

  /* выполняет деактивацию страницы */
  var deactivatePage = function () {
    removePins();
    isPopup();
    backInPlase(activeButton, 570, 375);
    mapFaded.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    addDisabled(mapFilters);
    addDisabled(adForm);
    addDisabled(housingFeatures);
    mapFilter.forEach(function (elem) {
      addDisabled(elem);
    });
    adFormElement.forEach(function (elem) {
      addDisabled(elem);
    });
    activeButton.addEventListener('mouseup', onActiveButtonMouseup, {once: true});
  };
  window.active = {
    deactivatePage: deactivatePage,
    backInPlase: backInPlase,
    isPopup: isPopup,
    removePins: removePins
   
  };
})();

