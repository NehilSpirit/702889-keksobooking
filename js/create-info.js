'use strict';
(function () {
  var similarListCardElement = document.querySelector('.map');

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
  window.createInfo = createInfo;
})();

