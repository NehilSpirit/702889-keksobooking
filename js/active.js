'use strict';
/* Для активации полей форм и меток */
(function () {
  var mapFilters = document.querySelector('.map__filters');

  var mapFilter = document.querySelectorAll('.map__filter');

  var adFormElement = document.querySelectorAll('.ad-form__element');

  var adForm = document.querySelector('.ad-form.ad-form--disabled');

  var mapFaded = document.querySelector('.map.map--faded');


  /* для активации главной метки*/

  var activeButton = document.querySelector('.map__pin--main');

  /* Удaляет атрибут disabled*/
  var removeDisabled = function (element) {
    element.removeAttribute('disabled');
  };


  /* По клику активирует форму и пины */
  var onActiveButtonMouseup = function () {
    mapFaded.classList.remove('map--faded');
    mapFilters.removeAttribute('disabled');
    adForm.classList.remove('ad-form--disabled');
    removeDisabled(adForm);

    mapFilter.forEach(function (elem) {
      removeDisabled(elem);
    });
    adFormElement.forEach(function (elem) {
      removeDisabled(elem);
    });
    window.backend.load(window.onLoad, window.onError);
  };

  activeButton.addEventListener('mouseup', onActiveButtonMouseup, {once: true});
})();

