'use script'

var ARR_NUM = 8;
var PIN_HEIGHT = 40;  //высота метки
var PIN_WIDTH = 40;   // ширина метки
var pinX = location.x - PIN_HEIGHT;
var pinY = location.y - PIN_WIDTH;

var offerPhotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var offerKind = ['palace', 'flat', 'house','bung'];

  var offerTitle = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'];

  var checkinCheckout = ['12:00', '13:00', '14:00',];

  //временно удалили класс чтоб показать изображение
  var userMap = document.querySelector('.map');
  userMap.classList.remove('map--faded');

  //элемент, в который  будем вставлять похожиe метки.
  var similarListElement = document.querySelector('map__pins');

  // шаблон  для меток который будем вставлять
  var similarPinTemplate = document.querySelector('#pin')
    .content.querySelector('.map__pin');

  //элемент в который будем вставлять похожие карточки
  var similarListCardElement = document.querySelector('.map');

  // шаблон для карточек которые будем вставлять
  var similarCardTamplate = document.querySelector('#card')
    .content.querySelector('.map__card popup');

  var fragment = document.createDocumentFragment();

// Вычисляет случайное чисто в диапазоне между min - max
function getRandomNum(min, max) {
  return Math.round((Math.random() * (max - min)) + min); // ну тут все ясно и так)
}

var getRandom = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};
//функция для ведущего ноля
function addZeros(n, needLength) {
  needLength = needLength || 2;
  n = String(n);
  while (n.length < needLength) {
    n = "0" + n;
  }
  return n;
}

var createArray = function(num){
  var ads = [];
 for (var i = 0; i < ARR_NUM; i++){
  var author = {};
  author.avatar = 'img/avatars/user' + addZeros(i + 1, 2) +'.png';
  var location = {};
  location.x = getRandomNum(400, 130);;
  location.y = getRandomNum(130, 630);
  var offer = {};
  offer.title = offerTitle[i];
  offer.address = location.x + ',' +' '+ location.y;
  offer.price =  getRandomNum(1000, 1000000);
  offer.kind = getRandom(offerKind);
  offer.rooms = getRandomNum(1, 5);
  offer.guests = getRandomNum(1, 10);
  offer.checkin = getRandom(checkinCheckout);
  offer.checkout = getRandom(checkinCheckout);
  offer.features = offerFeatures;
  offer.description = '';
  offer.photos = offerPhotos;
  var ad = {};
  ad.author = author;
  ad.offer = offer;
  ad.location = location;
  ads.push(ad);
    }
    return ads;
  };

 var listPins = createArray(ARR_NUM);

/*  функция создает шаблон метки и заполняет данными из массива ads */

var createPin = function(array){
var pinElement = similarPinTemplate.cloneNode(true);
pinElement.querySelector('.map__pin').style.positionLeft = array.pinX + 'px';
pinElement.querySelector('.map__pin').style.top = array.pinY + 'px';
pinElement.querySelector('img').src = array.author.avatar;
pinElement.querySelector('img').alt = array.offer.title;

 return pinElement;
};
createPin(listPins[0]);

//Отрисoвывает сгенерированные DOM-элементы в блок .map__pins.
var appendPin = function(array){
var templateAds = array;
for (var i = 0; i < templateAds.length; i++) {
  fragment.appendChild(createPin(templateAds[i]));
  }
  //similarListElement.appendChild(fragment);
};

appendPin(listPins);


var createCard = function(array){
  var cardElement = similarCardTamplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = array.offer.title; // здесь такая же фигня пишет что textContent null
  cardElement.querySelector('.popup__text--address').textContent = array.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = array.offer.price + '$//ночь';тут не закончила , еще кучу всего добавить надо
  // тут не закончила , еще кучу всего добавить надо
}
createCard(listPins[0]);












