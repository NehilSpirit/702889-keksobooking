/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-invalid-this */
'use strict';
(function () {
  var ESC = 27;

  /* элемент, в который  будем вставлять похожиe метки. */
  var similarListElement = document.querySelector('.map__pins');

  /* элемент в который будем вставлять похожие карточки */
  var similarListCardElement = document.querySelector('.map');

  /* элемент перед которым нужно вставить карточки */
  var before = document.querySelector('.map__filters-container');

  /* создает пустой контейнер для шаблонов */
  var fragment = document.createDocumentFragment();


  var listPins = [];
  /* наполнение массива */
  window.createInfoArray = function (num) {
    for (var i = 0; i < num; i++) {
      listPins.push(window.createInfo(i));
    }
    // eslint-disable-next-line no-return-assign
    return window.listPins = listPins;
  };

  /* отрисовывает метки по клику на кекс */
  window.appendPin = function (item) {
    item.forEach(function (elem) {
    // создаем элемент пин
      var pin = window.createPin(elem);

      pin.addEventListener('click', onCreatePopupPinClin.bind(elem));

      fragment.appendChild(pin);
    });
    similarListElement.appendChild(fragment);

  };

  // Отрисoвывает сгенерированные DOM-элементы (карточки) в блок .map__pins.
  var appendCard = function (item) {
    var popup = document.querySelector('.map__card.popup');
    if (popup) {
      popup.parentNode.removeChild(popup);
    }
    fragment.appendChild(window.createCard(item));
    similarListCardElement.insertBefore(fragment, before);

    var closeButton = similarListCardElement.querySelector('.popup__close');
    var mapPopup = similarListCardElement.querySelector('.map__card.popup');

    closeButton.addEventListener('click', oncloseMapPopupClick.bind(mapPopup, closeButton), {once: true});
    mapPopup.addEventListener('keydown', onclosePopupEscPress.bind(mapPopup, closeButton), {once: true});

  };
  var onCreatePopupPinClin = function (elem) {
    appendCard(this);
  };

  /* Закрывает карточку обьявления по ESc */
  var onclosePopupEscPress = function (closeButton, evt) {
    if (evt.keyCode === ESC) {
      closeButton.removeEventListener('click', oncloseMapPopupClick);
      this.removeEventListener('keydown', onclosePopupEscPress);
      this.parentNode.removeChild(this);
    }
  };
  /* Закрывает карточку обьявления по клику*/
  // eslint-disable-next-line no-unused-vars
  var oncloseMapPopupClick = function (closeButton, evt) {
    closeButton.removeEventListener('click', oncloseMapPopupClick);
    this.removeEventListener('keydown', onclosePopupEscPress);
    this.parentNode.removeChild(this);
  };

  window.map = {
    createInfoArray: createInfoArray,
    appendPin: appendPin
  };
})();
