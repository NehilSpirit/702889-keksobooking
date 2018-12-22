
'use strict';
(function () {
  var ESC = 27;
  var ARR_NUM = 5;

  /* элемент, в который  будем вставлять похожиe метки. */
  var similarListElement = document.querySelector('.map__pins');

  /* элемент в который будем вставлять похожие карточки */
  var similarListCardElement = document.querySelector('.map');

  /* элемент перед которым нужно вставить карточки */
  var before = document.querySelector('.map__filters-container');

  /* создает пустой контейнер для шаблонов */
  var fragment = document.createDocumentFragment();

  /* отрисовывает метки по клику на кекс */
  var appendPin = function (item) {
    item.slice(0, ARR_NUM)
    .forEach(function (elem) {
    // создаем элемент пин
      var pin = window.template.createPin(elem);
      pin.addEventListener('click', function () {
        onCreatePopupPinClin(elem);
      });
      fragment.appendChild(pin);
    });
    similarListElement.appendChild(fragment);

  };
  // Отрисoвывает сгенерированные DOM-элементы (карточки) в блок .map__pins.
  var appendCard = function (item) {
    window.active.isPopup();
    var mapPopup = window.template.createCard(item);
    var closeButton = mapPopup.querySelector('.popup__close');
    closeButton.addEventListener('click', oncloseMapPopupClick, {once: true});
    document.addEventListener('keydown', onclosePopupEscPress, {once: true});
    similarListCardElement.insertBefore(mapPopup, before);
  };
  var onCreatePopupPinClin = function (elem) {
    appendCard(elem);
  };

  var closePopup = function () {
    window.active.isPopup();
  };

  /* Удаляет карточку обьявления по ESc */
  var onclosePopupEscPress = function (evt) {
    if (evt.keyCode === ESC) {
      closePopup();
    }
  };
  /* Удаляет карточку обьявления по клику*/
  var oncloseMapPopupClick = function () {
    closePopup();
  };
  window.appendPin = appendPin;

})();
