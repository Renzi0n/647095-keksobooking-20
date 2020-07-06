'use strict';

(function () {

  var MAX_PINS_ON_MAP = 5;
  var valueOfAllAds = 'any';

  var typeFilterNode = document.querySelector('#housing-type');

  var filterPinsOfType = function (dataElement) { // функция сравнения значения фильтра с типом жилья в объявлении
    if (typeFilterNode.value === dataElement.offer.type || typeFilterNode.value === valueOfAllAds) {
      return true;
    }

    return false;
  };

  window.filter = {
    typeFilterNode: typeFilterNode,
    filterMapPins: function (data) {
      return data.slice(0, MAX_PINS_ON_MAP).
      filter(filterPinsOfType);
    }
  };

})();
