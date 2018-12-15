'use strict';
(function () {
  var ESC = 27;
  var main = document.querySelector('main');
  var templateSucsess = document.querySelector('#success')
  .content.querySelector('.success');
  var templateError = document.querySelector('#error')
  .content.querySelector('.error');
  // var errorButton = document.querySelector('.error__button');

  /* создает пустой контейнер для шаблонов */
  var fragment = document.createDocumentFragment();

  /* создает обьявление успешной отправки формы на сервер*/
  var createAds = function (template, plase) {
    var ads = template.cloneNode(true);
    fragment.appendChild(ads);
    plase.appendChild(fragment);

    document.addEventListener('keydown', function (evt) {
      oncloseEscPress(ads, evt);
    }, {once: true});

    document.addEventListener('click', function () {
      oncloseClick(ads);
    }, {once: true});
  };

  /* Закрывает  обьявлениe по ESc */
  var oncloseEscPress = function (ads, evt) {
    if (evt.keyCode === ESC) {
      document.removeEventListener('keydown', oncloseEscPress);
      document.removeEventListener('click', oncloseClick);
      ads.parentNode.removeChild(ads);
    }
  };
  /* Закрывает  обьявлениt по click  на произвольную область */
  var oncloseClick = function (ads) {
    document.removeEventListener('keydown', oncloseEscPress);
    document.removeEventListener('click', oncloseClick);
    ads.parentNode.removeChild(ads);
  };

  window.main = {
    createAds: createAds,
    templateSucsess: templateSucsess,
    templateError: templateError,
    main: main
  };
})();

