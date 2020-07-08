'use strict';

(function () {

  window.util = {
    isPageDisabled: true,
    TYPES_MAP: {
      palace: {
        name: 'Дворец',
        minPrice: '10000'
      },
      flat: {
        name: 'Комната',
        minPrice: '1000'
      },
      house: {
        name: 'Дом',
        minPrice: '5000'
      },
      bungalo: {
        name: 'Бунгало',
        minPrice: '0'
      }
    },

    getRandomNumber: function (min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    },
    getRandomElementOfArr: function (arr) {
      return arr[window.util.getRandomNumber(0, arr.length - 1)];
    },
    getRandomLengthArr: function (arr) {
      return arr.slice(0, window.util.getRandomNumber(1, arr.length));
    },
    getDeclOfNumb: function (number, titles) {
      var cases = [2, 0, 1, 1, 1, 2];

      return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }
  };

})();
