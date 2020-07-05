'use strict';

(function () {

  var MAX_PINS_ON_MAP = 5;
  var valueOfAllAds = 'any';

  var typeFilterNode = document.querySelector('#housing-type');

  var filterPinsOfType = function (dataElement) { // функция сравнения значения фильтра с типом жилья в объявлении
    switch (typeFilterNode.value) {
      case (dataElement.offer.type):
        return true;
      case (valueOfAllAds):
        return true;
      default:
        return false;
    }
  };

  window.filter = {
    typeFilterNode: typeFilterNode,
    filterMapPins: function (data) {
      return data.slice(0, MAX_PINS_ON_MAP). // Делаем копию массива для фильтрации
      filter(filterPinsOfType); // Фильтрация по типу жилья
    }
  };

})();
