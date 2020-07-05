'use strict';

(function () {

  var MAIN_PIN = {
    sizes: {
      active: {
        width: 200,
        height: 200
      },
      inactive: {
        width: 65,
        height: 65
      }
    },
    coords: {
      x: '570px',
      y: '375px'
    }
  };
  var MAP_SIZES = {
    width: 1200,
    coordStart: 130,
    coordEnd: 630
  };

  var mapNode = document.querySelector('.map');
  var mapPinsNode = mapNode.querySelector('.map__pins');
  var mapPinMainNode = mapPinsNode.querySelector('.map__pin--main');
  var mapFiltersNode = mapNode.querySelector('.map__filters');
  var mapFiltersNodes = mapFiltersNode.children;


  window.map = {
    mapNode: mapNode,
    mapPinsNode: mapPinsNode,
    mapPinMainNode: mapPinMainNode,
    mapFiltersNode: mapFiltersNode,
    mapFiltersNodes: mapFiltersNodes,
    MAIN_PIN: MAIN_PIN,
    MAP_SIZES: MAP_SIZES,

    getAddressMapPinMainStr: function () {
      var сalculatedX = parseInt(mapPinMainNode.style.left, 10) + MAIN_PIN.sizes.active.width / 2;
      var сalculatedHeight = window.util.isPageDisabled ? MAIN_PIN.sizes.active.height / 2 : MAIN_PIN.sizes.active.height;
      var сalculatedY = parseInt(mapPinMainNode.style.top, 10) + сalculatedHeight;

      return Math.round(сalculatedX) + ', ' + Math.round(сalculatedY);
    },
    clearMap: function () {
      var mapPinsAdNodes = mapPinsNode.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < mapPinsAdNodes.length; i++) {
        mapPinsAdNodes[i].remove();
      }

      if (window.pin.popupNode) {
        window.card.closePopup();
      }
    }
  };

})();
