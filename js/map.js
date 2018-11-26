
'use strict';

var ARR_NUM = 8;
var PIN_HEIGHT = 40;
var PIN_WIDTH = 40;

var offerPhotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var offerFeatures = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var offerKind = ['palace', 'flat', 'house', 'bung'];

var offerTitle = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var checkinCheckout = ['12:00', '13:00', '14:00'];


/* элемент, в который  будем вставлять похожиe метки. */
var similarListElement = document.querySelector('.map__pins');

/* шаблон  для меток который будем вставлять */
var similarPinTemplate = document.querySelector('#pin')
.content.querySelector('.map__pin');

/* элемент в который будем вставлять похожие карточки */
var similarListCardElement = document.querySelector('.map');

/* шаблон для карточек которые будем вставлять */
var similarCardTamplate = document
  .querySelector('#card')
  .content.querySelector('.map__card.popup');

/* элемент перед которым нужно вставить карточки */
var before = document.querySelector('.map__filters-container');

/* создает пустой контейнер для шаблонов */
var fragment = document.createDocumentFragment();

/* убирает класс */
document.querySelector('.map.map--faded').classList.remove('map--faded');

/* Вычисляет случайное чисто в диапазоне между min - max */
function getRandomNum(min, max) {
  return Math.round(Math.random() * (max - min) + min); // ну тут все ясно и так)
}
/* Вычисляет случайное чисто в пределах массива */
var getRandomElem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

/* перемешивание Фишер-Йетс */
var shuffle = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var randomNumber = getRandomNum(0, i);
    var getRandomElement = array[randomNumber];
    array[randomNumber] = array[i];
    array[i] = getRandomElement;
  }
  return array;
};

// создаем рандомное объявление
var createInfo = function (num) {

  var location = {
    x: getRandomNum(0, similarListCardElement.offsetWidth),
    y: getRandomNum(130, 630)
  };

  return {
    author: {
      avatar: 'img/avatars/user0' + (num + 1) + '.png'
    },
    location: {
      x: location.x,
      y: location.y
    },
    offer: {
      title: offerTitle[num],
      price: getRandomNum(1000, 1000000),
      address: location.x + ', ' + location.y,
      kind: getRandomElem(offerKind),
      rooms: getRandomNum(1, 5),
      guests: getRandomNum(1, 10),
      checkin: getRandomElem(checkinCheckout),
      checkout: getRandomElem(checkinCheckout),
      features: offerFeatures.slice(0, getRandomNum(1, offerFeatures.length)),
      description: '',
      photos: shuffle(offerPhotos)
    }
  };
};

var listPins = [];

/* наполнение массива */
var createInfoArray = function (num) {
  for (var i = 0; i < num; i++) {
    listPins.push(createInfo(i));
  }
};

/* наполняем массив */
createInfoArray(ARR_NUM);


/*  функция создает шаблон метки и заполняет данными из массива ads */
var createPin = function (item) {

  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.style.left = item.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = item.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = item.author.avatar;
  pinElement.querySelector('img').alt = item.offer.title;

  return pinElement;
};
/* отрисовывает метки */
var appendPin = function (item) {
  item.forEach(function (elem) {
    fragment.appendChild(createPin(elem));
  });
  similarListElement.appendChild(fragment);

};

appendPin(listPins);

/* проверяет значения для вставки в ".popup__type"*/
var addType = function (obj) {
  var result;
  if (obj === 'flat') {
    result = 'Квартира';
  }
  if (obj === 'palace') {
    result = 'Дворец';
  }
  if (obj === 'house') {
    result = 'Дом';
  }
  if (obj === 'bung') {
    result = 'Бунгало';
  }
  return result;

};

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


// Отрисoвывает сгенерированные DOM-элементы (карточки) в блок .map__pins.
var appendCard = function (item) {
  fragment.appendChild(createCard(item));
  similarListCardElement.insertBefore(fragment, before);
};

appendCard(listPins[0]);
