'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500; // ms

  var lastTimeout;

  window.debounce = function (cb) {
    return function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout); // очищаем предыдущий интервал, если он есть
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(); // вызов переданной функции
      }, DEBOUNCE_INTERVAL);
    };
  };

})();
