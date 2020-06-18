'use strict';

(function () {

  var MAIN_PIN_SIZES = {
    active: {
      width: 200,
      height: 200
    },
    inactive: {
      width: 65,
      height: 65
    }
  };
  var MAP_WIDTH = 1200;

  var mapNode = document.querySelector('.map');
  var mapPinsNode = mapNode.querySelector('.map__pins');
  var mapPinMainNode = mapPinsNode.querySelector('.map__pin--main');
  var mapFiltersNodes = mapNode.querySelector('.map__filters').children;


  window.map = {
    mapNode: mapNode,
    mapPinsNode: mapPinsNode,
    mapPinMainNode: mapPinMainNode,
    mapFiltersNodes: mapFiltersNodes,
    MAIN_PIN_SIZES: MAIN_PIN_SIZES,
    MAP_WIDTH: MAP_WIDTH,

    getAddressMapPinMainStr: function () {
      var сalculatedX = parseInt(mapPinMainNode.style.left, 10) + MAIN_PIN_SIZES.active.width / 2;
      var сalculatedHeight = window.util.isPageDisabled ? MAIN_PIN_SIZES.active.height / 2 : MAIN_PIN_SIZES.active.height;
      var сalculatedY = parseInt(mapPinMainNode.style.top, 10) + сalculatedHeight;

      return Math.round(сalculatedX) + ', ' + Math.round(сalculatedY);
    }
  };

})();
