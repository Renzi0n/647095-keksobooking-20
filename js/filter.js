'use strict';

(function () {

  var MAX_PINS_ON_MAP = 5;
  var VALUE_OF_ALL_ADS = 'any';
  var PRICE_MAP = {
    any: {
      min: -Infinity,
      max: Infinity
    },
    middle: {
      min: 10000,
      max: 50000
    },
    low: {
      min: 0,
      max: 10000
    },
    high: {
      min: 50000,
      max: Infinity
    }
  };

  var filterFormNode = document.querySelector('.map__filters');
  var typeFilterFormNode = filterFormNode.querySelector('[name=housing-type]');
  var priceFilterFormNode = filterFormNode.querySelector('[name=housing-price]');
  var roomsFilterFormNode = filterFormNode.querySelector('[name=housing-rooms]');
  var guestsFilterFormNode = filterFormNode.querySelector('[name=housing-guests]');
  var featureFilterFormNodesArr = Array.from(filterFormNode.querySelectorAll('[name=features]'));


  var filterPinsByType = function (dataElement) {
    return typeFilterFormNode.value === dataElement.offer.type || typeFilterFormNode.value === VALUE_OF_ALL_ADS;
  };

  var filterPinsByPrice = function (dataElement) {
    return PRICE_MAP[priceFilterFormNode.value].min < dataElement.offer.price && PRICE_MAP[priceFilterFormNode.value].max > dataElement.offer.price;
  };

  var filterPinsByRooms = function (dataElement) {
    return +roomsFilterFormNode.value === dataElement.offer.rooms || roomsFilterFormNode.value === VALUE_OF_ALL_ADS;
  };

  var filterPinsByGuests = function (dataElement) {
    return +guestsFilterFormNode.value === dataElement.offer.guests || guestsFilterFormNode.value === VALUE_OF_ALL_ADS;
  };

  var filterPinsByFeatures = function (dataElement) {
    var isShowElement;

    var checkedFeatures = featureFilterFormNodesArr.filter(function (elem) {
      return elem.checked;
    });

    if (checkedFeatures.length) {
      for (var i = 0; i < checkedFeatures.length; i++) {
        if (dataElement.offer.features.includes(checkedFeatures[i].value)) { // Проверяем входят ли эти удобства в текущее объявление
          isShowElement = true;
        } else {
          isShowElement = false; // Если какого-то удобства нет, то не показываем объявление
          break;
        }
      }
    } else {
      isShowElement = true;
    }

    return isShowElement;
  };


  window.filter = {
    filterFormNode: filterFormNode,

    filterMapPins: function (data) {
      return data.slice(0, MAX_PINS_ON_MAP).
      filter(filterPinsByType).
      filter(filterPinsByPrice).
      filter(filterPinsByRooms).
      filter(filterPinsByGuests).
      filter(filterPinsByFeatures);
    }
  };

})();
