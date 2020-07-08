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
  var typeFilterFormNode = filterFormNode['housing-type'];
  var priceFilterFormNode = filterFormNode['housing-price'];
  var roomsFilterFormNode = filterFormNode['housing-rooms'];
  var guestsFilterFormNode = filterFormNode['housing-guests'];
  var featureFilterFormNodesArr = Array.from(filterFormNode.features);


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
    var isShowElement = true;

    var checkedFeatures = featureFilterFormNodesArr.filter(function (elem) {
      return elem.checked;
    });

    if (checkedFeatures.length) { // проверяем активна ли хоть одна фича
      for (var i = 0; i < checkedFeatures.length; i++) { // цикл по активным фичам
        if (!dataElement.offer.features.includes(checkedFeatures[i].value)) { // если хоть одна фича не входит в наше объявление, скрываем его
          isShowElement = false;
          break;
        }
      }
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
