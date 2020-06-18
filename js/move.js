'use strict';

(function () {

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

      window.map.mapPinMainNode.style.top = (window.map.mapPinMainNode.offsetTop - shift.y) + 'px';

      if (parseInt(window.map.mapPinMainNode.style.top, 10) > 630) {
        window.map.mapPinMainNode.style.top = 630 + 'px';
      } else if (parseInt(window.map.mapPinMainNode.style.top, 10) < 130) {
        window.map.mapPinMainNode.style.top = 130 + 'px';
      }

      window.map.mapPinMainNode.style.left = (window.map.mapPinMainNode.offsetLeft - shift.x) + 'px';

      if (parseInt(window.map.mapPinMainNode.style.left, 10) > window.map.MAP_WIDTH - window.map.MAIN_PIN_SIZES.inactive.width) {
        window.map.mapPinMainNode.style.left = window.map.MAP_WIDTH - window.map.MAIN_PIN_SIZES.inactive.width + 'px';
      } else if (parseInt(window.map.mapPinMainNode.style.left, 10) < 0) {
        window.map.mapPinMainNode.style.left = 0 + 'px';
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
