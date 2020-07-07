'use strict';

(function () {

  var MAX_PINS_ON_MAP = 5;
  var VALUE_OF_ALL_ADS = 'any';
  var PRICE_MAP = {
    'any': {
      min: -Infinity,
      max: Infinity
    },
    'middle': {
      min: 10000,
      max: 50000
    },
    'low': {
      min: 0,
      max: 10000
    },
    'high': {
      min: 50000,
      max: Infinity
    }
  };

  var filterNode = document.querySelector('.map__filters');
  var typeFilterNode = filterNode.querySelector('#housing-type');
  var priceFilterNode = filterNode.querySelector('#housing-price');
  var roomsFilterNode = filterNode.querySelector('#housing-rooms');
  var guestsFilterNode = filterNode.querySelector('#housing-guests');
  var featureFilterNodesArr = Array.from(filterNode.querySelectorAll('.map__checkbox'));

  var filterPinsOfType = function (dataElement) {
    if (typeFilterNode.value === dataElement.offer.type || typeFilterNode.value === VALUE_OF_ALL_ADS) {
      return true;
    }

    return false;
  };

  var filterPinsOfPrice = function (dataElement) {
    if (PRICE_MAP[priceFilterNode.value].min < dataElement.offer.price && PRICE_MAP[priceFilterNode.value].max > dataElement.offer.price) {
      return true;
    }

    return false;
  };

  var filterPinsOfRooms = function (dataElement) {
    if (Number(roomsFilterNode.value) === dataElement.offer.rooms || roomsFilterNode.value === VALUE_OF_ALL_ADS) {
      return true;
    }

    return false;
  };

  var filterPinsOfGuests = function (dataElement) {
    if (Number(guestsFilterNode.value) === dataElement.offer.guests || guestsFilterNode.value === VALUE_OF_ALL_ADS) {
      return true;
    }

    return false;
  };

  var filterPinsOfFeatures = function (dataElement) {
    var featuresFilterResult;

    var checkedFeatures = featureFilterNodesArr.filter(function (elem) {
      return elem.checked;
    });

    featuresFilterResult = !checkedFeatures.length ? true : false; // Проверяем есть ли вообще вкл. удобства

    if (!featuresFilterResult) {
      for (var i = 0; i < checkedFeatures.length; i++) {
        if (dataElement.offer.features.includes(checkedFeatures[i].value)) { // Проверяем входят ли эти удобства в текущее объявление
          featuresFilterResult = true;
        } else {
          featuresFilterResult = false; // Если какого-то удобства нет, то не показываем объявление
          break;
        }
      }
    }

    return featuresFilterResult;
  };

  window.filter = {
    filterNode: filterNode,

    filterMapPins: function (data) {
      return data.slice(0, MAX_PINS_ON_MAP).
      filter(filterPinsOfType).
      filter(filterPinsOfPrice).
      filter(filterPinsOfRooms).
      filter(filterPinsOfGuests).
      filter(filterPinsOfFeatures);
    }
  };

})();
