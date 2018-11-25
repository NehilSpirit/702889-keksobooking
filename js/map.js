'use strict';

var ARR_NUM = 8;
var PIN_HEIGHT = 40; //высота метки
var PIN_WIDTH = 40; // ширина метки

var offerPhotos = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
];

var offerFeatures = [
  "wifi",
  "dishwasher",
  "parking",
  "washer",
  "elevator",
  "conditioner"
];

var offerKind = ["palace", "flat", "house", "bung"];

var offerTitle = [
  "Большая уютная квартира",
  "Маленькая неуютная квартира",
  "Огромный прекрасный дворец",
  "Маленький ужасный дворец",
  "Красивый гостевой домик",
  "Некрасивый негостеприимный домик",
  "Уютное бунгало далеко от моря",
  "Неуютное бунгало по колено в воде"
];

var checkinCheckout = ["12:00", "13:00", "14:00"];

       // убрала класс панель не показывается((

//элемент, в который  будем вставлять похожиe метки.
var similarListElement = document.querySelector(".map__pins");

// шаблон  для меток который будем вставлять
var similarPinTemplate = document.querySelector("#pin")
.content.querySelector(".map__pin");

//элемент в который будем вставлять похожие карточки
var similarListCardElement = document.querySelector(".map");

// шаблон для карточек которые будем вставлять
var similarCardTamplate = document
  .querySelector("#card")
  .content.querySelector(".map__card.popup");

/* элемент перед которым нужно вставить карточки */
var before = document.querySelector(".map__filters-container");
/* создает пустой контейнер для шаблонов */
var fragment = document.createDocumentFragment();

/*убирает класс */
var userMap = document.querySelector(".map.map--faded");
 userMap.classList.remove(".map--faded");
 //var test=userMap.classList.contains(".map--faded"); // не работает хотя тест дал false


// Вычисляет случайное чисто в диапазоне между min - max
function getRandomNum(min, max) {
  return Math.round(Math.random() * (max - min) + min); // ну тут все ясно и так)
}

var getRandom = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};



// создаем рандомное объявление
var createInfo = function(num) {
    // можно создавать объект одновременно с присвоением его свойствам значений
    var result = {};
    result = {
        author: {
      avatar: "img/avsatars/user0" + (num + 1) + ".png"
      },
      location: {
        x: getRandomNum(640, 750),
        y: getRandomNum(640, 750)
      },
      offer: {
        title: offerTitle[num],
        price: getRandomNum(1000, 1000000),
        address: location.x + ', ' + location.y,  // эта строка не работает
        kind: getRandom(offerKind),
        rooms: getRandomNum(1, 5),
        guests: getRandomNum(1, 10),
        checkin: getRandom(checkinCheckout),
        checkout: getRandom(checkinCheckout),
        features:  offerFeatures,
        description: '',
        photos: offerPhotos
           }
     }
     return result
};
// наполнение массива
var listPins = [];//
var createInfoArray = function(num){
  for(var i=0; i<num; i++){
   listPins.push(createInfo(i));
  }
  return listPins;
};

//наполняем массив
createInfoArray(ARR_NUM);



/*  функция создает шаблон метки и заполняет данными из массива ads */

var createPin = function(item) {

  var pinElement = similarPinTemplate.cloneNode(true);
  //pinElement.querySelector('.map__pin').style.left = item.location.x + 'px';// тут тоже не работает из за строки 91
  //pinElement.querySelector('.map__pin').style.top = item.location.y + 'px';
  pinElement.querySelector('img').src = item.author.avatar;
  pinElement.querySelector('img').alt = item.offer.title;

  return pinElement;
};


//Отрисoвывает сгенерированные DOM-элементы (метки) в блок .map__pins.
var appendPin = function(item) {
  for (var i = 0; i < item.length; i++){
    fragment.appendChild(createPin(item[i]));
  }
  similarListElement.appendChild(fragment);
};

appendPin(listPins);

/* проверяет значения для вставки в ".popup__type"*/
var addType = function(obj){
 var result;
 if(obj === "flat"){
 result = "Квартира";
 }
 if(obj === "palace"){
 result = "Дворец";
}
 if(obj === "house"){
 result = "Дом";
 }
 if(obj === "bung"){
 result = "Бунгало";
 }
 return result;

};

/*  функция создает шаблон карточки  и заполняет данными из массива */
// опять функция длинной в метр, пока не приходит в голову как оптимизтровать
// очень хотелось, но было страшно сломать
var createCard = function(array) {
  var cardElement = similarCardTamplate.cloneNode(true);

  cardElement.querySelector(".popup__title").textContent = array.offer.title;
  cardElement.querySelector(".popup__text--address").textContent =
  array.offer.address;
  cardElement.querySelector(".popup__text--price").textContent =
  array.offer.price + "$//ночь";
  cardElement.querySelector(".popup__type").textContent = addType(array.offer.kind);
  cardElement.querySelector(".popup__text--capacity").textContent =
  array.offer.rooms + " комнаты для " + array.offer.guests + " гостей";
  cardElement.querySelector(".popup__text--time").textContent =
  "Заезд после " + array.offer.checkin + " , выезд до " + array.offer.checkout + ".";
  cardElement.querySelector(".popup__feature--wifi").textContent = array.offer.features[0];
  cardElement.querySelector(".popup__feature--dishwasher").textContent = array.offer.features[1];
  cardElement.querySelector(".popup__feature--parking").textContent = array.offer.features[2];
  cardElement.querySelector(".popup__feature--washer").textContent = array.offer.features[3];
  cardElement.querySelector(".popup__feature--elevator").textContent = array.offer.features[4];
  cardElement.querySelector(".popup__feature--conditioner").textContent = array.offer.features[5];
  cardElement.querySelector(".popup__description").textContent = array.offer.description;
  cardElement.querySelector(".popup__photo").src = array.offer.photos[0];


  // нужно создать еще два изображения и потожить в них в качестве src  photos[1] и photos[2] как?

// по заданию нужно добавить эту строчку, но если добавляю аватар вообще не отображается . Почему?
  //cardElement.querySelector(".popup__avatar").src = array.author.avatar;

  return cardElement;
};


//Отрисoвывает сгенерированные DOM-элементы (карточки) в блок .map__pins.
var appendCard = function(item) {
    fragment.appendChild(createCard(item));
    similarListCardElement.insertBefore(fragment, before);
};

appendCard(listPins[0]);










