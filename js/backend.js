
'use strict';
(function () {
/* сообщает об ошибке при загрузке или отправке данных*/
  var onError = function (message) {
    return message;
  };
  /* получает сетевые данные и вызывает функцию фильтрации( даже звучит плохо*/
  var onLoad = function (data) {
    // console.log(data);
    checkInfo(data);
    return data;
  };
  /* сообщает об успешной отправке формы*/
  var onSucsess = function (message) {
    return message;
  };

  /* фильтрует полученные данные и вызывает отрисовку пинов
  при этом что то гдето барахлит ибо отрисовывается и центральная метка*/
  var checkInfo = function (info) {
    var infoFilter = info.filter(function (element) {
      if (element.offer) { // проверяем содержит ли обьект ключ offer
        return (element);
      }
    });
    window.appendPin(infoFilter);
  };

  /* выполняет запрос на сервер */
  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json'; // тут наверное надо бросить исключение? вдруг придет не json
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          onError('Неверный запрос');
          break;
        case 401:
          onError('Пользователь не авторизован');
          break;
        case 404:
          onError('Ваш запрос не найден');
          break;

        default:
          onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Oшибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 2000;
    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
    xhr.send();
  };
  /* отправляет данные формы на сервер*/
  var save = function (data, onSucsess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onSucsess(xhr.response);
          break;
        default:
          onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 20000;
    xhr.open('POST', 'https://js.dump.academy/keksobooking');
    xhr.send(data);

  };

  /* по идее функции будут на экспорт*/
  window.backend = {
    load: load,
    save: save,
  };
  /* эти точно тут быть не должны и потому просто window
  понятия не имею где им логическое место*/
  window.onSucsess = onSucsess;
  window.onLoad = onLoad;
  window.onError = onError;
})();
