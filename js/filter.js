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
    return !featureFilterFormNodesArr.some(function (elem) {
      return elem.checked && !dataElement.offer.features.includes(elem.value);
    });
  };


  window.filter = {
    filterFormNode: filterFormNode,

    filterMapPins: function (data) {
      return data.
      filter(filterPinsByType).
      filter(filterPinsByPrice).
      filter(filterPinsByRooms).
      filter(filterPinsByGuests).
      filter(filterPinsByFeatures).
      slice(0, MAX_PINS_ON_MAP);
    }
  };

})();
