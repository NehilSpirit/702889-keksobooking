
'use strict';
(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_SAVE = ' https://js.dump.academy/keksobooking';
  var RESPONSE_TYPE = 'json';
  var STATUS_OK = 200;
  var TIMEOUT = 10000;

  // функции  запроса на сервер
  var serverRequest = function (url, method, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
    xhr.open(method, url);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    serverRequest(URL_LOAD, 'GET', onLoad, onError);
  };
  var save = function (data, onLoad, onError) {
    serverRequest(URL_SAVE, 'POST', onLoad, onError, data);
  };

  window.backend = {
    load: load,
    save: save,
  };
})();
