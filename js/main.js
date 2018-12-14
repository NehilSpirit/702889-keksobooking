'use strict';
(function () {
  var ESC = 27;
  var main = document.querySelector('main');
  var templateSucsess = document.querySelector('#success')
  .content.querySelector('.success');
  var templateError = document.querySelector('#error')
  .content.querySelector('.error');
  var errorButton = document.querySelector('.error__button');

  /* создает пустой контейнер для шаблонов */
  var fragment = document.createDocumentFragment();

  /* создает обьявление успешной отправки формы на сервер*/
  var createSucsess = function () {
    var sucsess = templateSucsess.cloneNode(true);
    fragment.appendChild(sucsess);
    main.appendChild(fragment);

    document.addEventListener('keydown', function (evt) {
      oncloseEscPress(sucsess, evt);
    }, {once: true});

    document.addEventListener('click', function () {
      oncloseClick(sucsess);
    }, {once: true});
  };

  /* Закрывает  обьявлениe по ESc */
  var oncloseEscPress = function (sucsess, evt) {
    if (evt.keyCode === ESC) {
      document.removeEventListener('keydown', oncloseEscPress); // тут проблема если срабатывает клик. то ломается esc
      document.removeEventListener('click', oncloseClick);// и наоборот. хотя обработчики удаляются. пробовала вешать не
      sucsess.parentNode.removeChild(sucsess);// на документ а на само обьявление. результат тот же . конфликтуют
    }
  };
  /* Закрывает  обьявлениt по click  на произвольную область */
  var oncloseClick = function (sucsess) {
    document.removeEventListener('keydown', oncloseEscPress);
    document.removeEventListener('click', oncloseClick);
    sucsess.parentNode.removeChild(sucsess);
  };
 /* Закрывает  обьявление об щшибке по click  на произвольную область */
  var oncloseErrorButtonClick = function (error) {
    error.removeEventListener('click', oncloseErrorButtonClick);
    error.parentNode.removeChild(error);
  };

  /* создает обьявление ошибочной отправки формы на сервер*/
  var createError = function () {
    var error = templateError.cloneNode(true);
    fragment.appendChild(error);
    main.appendChild(fragment);

    document.addEventListener('keydown', function (evt) {
      oncloseEscPress(error, evt);
    }, {once: true});

    document.addEventListener('click', function () {
      oncloseClick(error);
    }, {once: true});

    errorButton.addEventListener('click', function () {
      oncloseErrorButtonClick(error);
    }, {once: true});
  };
  // на этом моменте стало понятно, что уже идет просто дубляж кода, можно все засунуть в одну функцию
  // потому обработсики уже не стала вешать
  window.createError = createError;
  window.createSucsess = createSucsess;

})();

