'use strict';

(function () {

  var MAP_PIN_MOVE = {
    x: {
      min: window.map.MAP_SIZES.width - window.map.MAIN_PIN_SIZES.inactive.width / 2,
      max: 0 - window.map.MAIN_PIN_SIZES.inactive.width / 2
    },
    y: {
      min: window.map.MAP_SIZES.coordStart - window.map.MAIN_PIN_SIZES.inactive.height,
      max: window.map.MAP_SIZES.coordEnd
    }
  };

  window.move = function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };


      window.map.mapPinMainNode.style.left = (window.map.mapPinMainNode.offsetLeft - shift.x) + 'px';
      var mapPinMainNodeX = window.map.mapPinMainNode.offsetLeft;

      if (mapPinMainNodeX > MAP_PIN_MOVE.x.min) {
        window.map.mapPinMainNode.style.left = MAP_PIN_MOVE.x.min + 'px';
      } else if (mapPinMainNodeX < MAP_PIN_MOVE.x.max) {
        window.map.mapPinMainNode.style.left = MAP_PIN_MOVE.x.max + 'px';
      }

      window.map.mapPinMainNode.style.top = (window.map.mapPinMainNode.offsetTop - shift.y) + 'px';
      var mapPinMainNodeY = window.map.mapPinMainNode.offsetTop;

      if (mapPinMainNodeY < MAP_PIN_MOVE.y.min) {
        window.map.mapPinMainNode.style.top = MAP_PIN_MOVE.y.min + 'px';
      } else if (mapPinMainNodeY > MAP_PIN_MOVE.y.max) {
        window.map.mapPinMainNode.style.top = MAP_PIN_MOVE.y.max + 'px';
      }


      window.form.formNode.address.value = window.map.getAddressMapPinMainStr();
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

})();
