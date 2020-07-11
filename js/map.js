'use strict';

(function () {

  var MAIN_PIN = {
    sizes: {
      width: 65,
      height: 65
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


  window.map = {
    mapNode: mapNode,
    mapPinsNode: mapPinsNode,
    mapPinMainNode: mapPinMainNode,
    MAIN_PIN: MAIN_PIN,
    MAP_SIZES: MAP_SIZES,

    getAddressMapPinMainStr: function () {
      var сalculatedX = mapPinMainNode.offsetLeft + MAIN_PIN.sizes.width / 2;
      var сalculatedHeight = window.util.isPageDisabled ? MAIN_PIN.sizes.height / 2 : MAIN_PIN.sizes.height;
      var сalculatedY = mapPinMainNode.offsetTop + сalculatedHeight;

      return Math.round(сalculatedX) + ', ' + Math.round(сalculatedY);
    },
    clearMap: function () {
      var mapPinsAdNodes = mapPinsNode.querySelectorAll('.map__pin:not(.map__pin--main)');
      mapPinsAdNodes.forEach(function (elem) {
        elem.remove();
      });

      if (window.pin.popupNode) {
        window.card.closePopup();
      }
    }
  };

})();
