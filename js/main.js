'use strict';
(function () {
  var ESC = 27;
  var main = document.querySelector('main');
  var templateSucsess = document.querySelector('#success')
  .content.querySelector('.success');
  var templateError = document.querySelector('#error')
  .content.querySelector('.error');

  /* создает пустой контейнер для шаблонов */
  var fragment = document.createDocumentFragment();
  var ads = '';

  /* создает обьявление успешной отправки формы на сервер*/
  var createAds = function (template, plase) {
    ads = template.cloneNode(true);
    fragment.appendChild(ads);
    plase.appendChild(fragment);
    document.addEventListener('keydown', oncloseEscPress, {once: true});
    ads.addEventListener('click', oncloseClick, {once: true});
  };
  /* Закрывает  обьявлениe по ESc */
  var oncloseEscPress = function (evt) {
    if (evt.keyCode === ESC) {
      document.removeEventListener('keydown', oncloseEscPress);
      ads.removeEventListener('click', oncloseClick);
      ads.parentNode.removeChild(ads);
    }
  };
  /* Закрывает  обьявлениt по click  на произвольную область */
  var oncloseClick = function () {
    document.removeEventListener('keydown', oncloseEscPress);
    ads.removeEventListener('click', oncloseClick);
    ads.parentNode.removeChild(ads);
  };
  window.main = {
    createAds: createAds,
    templateSucsess: templateSucsess,
    templateError: templateError,
    main: main
  };
})();

