'use strict';

(function () {

  var URL = 'https://javascript.pages.academy/keksobooking';
  var STATUS_CODES = {
    ok: 200
  };
  var XHR_TIMEOUT = 10000;

  var setErrorListeners = function (xhr, onError) {
    xhr.timeout = XHR_TIMEOUT;

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения', true);
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс', true);
    });
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === STATUS_CODES.ok) {
          onLoad(xhr.response);
        } else {
          onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      setErrorListeners(xhr, onError);

      xhr.open('GET', URL + '/data');
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === STATUS_CODES.ok) {
          onLoad(false);
        } else {
          onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText, true);
        }
      });
      setErrorListeners(xhr, onError);

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };

})();
