'use strict';
(function () {
/* шаблон для карточек которые будем вставлять */
  var similarCardTamplate = document
  .querySelector('#card')
  .content.querySelector('.map__card.popup');

  /*  создает шаблон карточки  и заполняет данными из массива */
  var createCard = function (item) {

    var cardElement = similarCardTamplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = item.offer.title;
    cardElement.querySelector('.popup__text--address').textContent =
  item.offer.address;
    cardElement.querySelector('.popup__text--price').textContent =
  item.offer.price + '$//ночь';
    cardElement.querySelector('.popup__type').textContent = addType(item.offer.kind);
    cardElement.querySelector('.popup__text--capacity').textContent =
  item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent =
  'Заезд после ' + item.offer.checkin + ' , выезд до ' + item.offer.checkout + '.';

    cardElement.querySelector('.popup__features').innerHTML = '';
    item.offer.features.forEach(function (element) {
      var blockFeatures = similarCardTamplate.querySelector('.popup__feature--' + element).cloneNode(true);
      cardElement.querySelector('.popup__features').appendChild(blockFeatures);
    });

    cardElement.querySelector('.popup__description').textContent = item.offer.description;
    cardElement.querySelector('.popup__photos').innerHTML = '';
    item.offer.photos.forEach(function (photoUrl) {
      var photoTemp = similarCardTamplate.querySelector('.popup__photo').cloneNode(true);
      photoTemp.src = photoUrl;
      cardElement.querySelector('.popup__photos').appendChild(photoTemp);
    });
    cardElement.querySelector('.popup__avatar').src = item.author.avatar;

    return cardElement;
  };
  /* проверяет значения для вставки в ".popup__type"*/
  var addType = function (obj) {
    if (obj === 'flat') {
      obj = 'Квартира';
    }
    if (obj === 'palace') {
      obj = 'Дворец';
    }
    if (obj === 'house') {
      obj = 'Дом';
    }
    if (obj === 'bung') {
      obj = 'Бунгало';
    }
    return obj;

  };
  window.createCard = createCard;
})();
