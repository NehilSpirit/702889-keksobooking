'use strict';
(function () {
  var typeMap = {
    flat: 'Квартира',
    palace: 'Дворец',
    house: 'Дом',
    bung: 'Бунгало'
  };
  var PIN_HEIGHT = 65;
  var PIN_WIDTH = 65;

  /* шаблон  для меток который будем вставлять */
  var similarPinTemplate = document.querySelector('#pin')
.content.querySelector('.map__pin');

  /* шаблон для карточек которые будем вставлять */
  var similarCardTamplate = document
    .querySelector('#card')
    .content.querySelector('.map__card.popup');
  // querySelector затратная операция лучше выполнить обин раз.
  var cardElement = similarCardTamplate.cloneNode(true);
  var popupTitle = cardElement.querySelector('.popup__title');
  var popupTextAddress = cardElement.querySelector('.popup__text--address');
  var popupTextPrice = cardElement.querySelector('.popup__text--price');
  var popupTextCapacity = cardElement.querySelector('.popup__text--capacity');
  var popupType = cardElement.querySelector('.popup__type');
  var popupTextTime = cardElement.querySelector('.popup__text--time');
  var popupFeatures = cardElement.querySelector('.popup__features');
  var popupDescription = cardElement.querySelector('.popup__description');
  var popupPhotos = cardElement.querySelector('.popup__photos');
  var popupAvatar = cardElement.querySelector('.popup__avatar');

  /*  создает шаблон карточки  и заполняет данными из массива */
  var createCard = function (item) {
    popupTitle.textContent = item.offer.title;
    popupTextAddress.textContent = item.offer.address;
    popupTextPrice.textContent = item.offer.price + '$//ночь';
    popupType.textContent = typeMap[item.offer.type];
    popupTextCapacity.textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
    popupTextTime.textContent = 'Заезд после ' + item.offer.checkin + ' , выезд до ' + item.offer.checkout + '.';
    popupFeatures.innerHTML = '';
    item.offer.features.forEach(function (element) {
      var blockFeatures = similarCardTamplate
        .querySelector('.popup__feature--' + element)
        .cloneNode(true);
      cardElement.querySelector('.popup__features').appendChild(blockFeatures);
    });
    popupDescription.textContent = item.offer.description;
    popupPhotos.innerHTML = '';
    item.offer.photos.forEach(function (photoUrl) {
      var photoTemp = similarCardTamplate
        .querySelector('.popup__photo')
        .cloneNode(true);
      photoTemp.src = photoUrl;
      cardElement.querySelector('.popup__photos').appendChild(photoTemp);
    });
    popupAvatar.src = item.author.avatar;

    return cardElement;
  };

  /*  функция создает шаблон метки и заполняет данными из массива ads */
  var createPin = function (item) {
    var pinElement = similarPinTemplate.cloneNode(true);
    var img = pinElement.querySelector('img');
    pinElement.style.left = item.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = item.location.y - PIN_HEIGHT + 'px';
    img.src = item.author.avatar;
    img.alt = item.offer.title;

    return pinElement;
  };
  window.template = {
    createPin: createPin,
    createCard: createCard
  };
})();
