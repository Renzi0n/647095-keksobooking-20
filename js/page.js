'use strict';

(function () {

  var fragment = document.createDocumentFragment();


  var toggleDisabledOnFormNodes = function () {
    var pointerEventsValue = window.util.isPageDisabled ? 'none' : 'auto';

    for (var i = 0; i < window.form.formFieldsNodes.length; i++) {
      window.form.formFieldsNodes[i].disabled = window.util.isPageDisabled;
      window.form.formFieldsNodes[i].style.pointerEvents = pointerEventsValue;
    }

    for (i = 0; i < window.map.mapFiltersNodes.length; i++) {
      window.map.mapFiltersNodes[i].disabled = window.util.isPageDisabled;
      window.map.mapFiltersNodes[i].style.pointerEvents = pointerEventsValue;
    }
  };

  var unlockPage = function (evt) {
    var onDataLoad = function (adObjectsArr) {
      if (evt.button === 0 || evt.key === 'Enter') {
        window.util.isPageDisabled = false;

        for (var i = 0; i < adObjectsArr.length; i++) {
          var adObjectsArrItem = adObjectsArr[i];

          if (Object.keys(adObjectsArrItem).includes('offer')) {
            fragment.appendChild(window.pin.renderMapPin(adObjectsArrItem));
          }
        }
        window.map.mapPinsNode.appendChild(fragment);

        toggleDisabledOnFormNodes();
        window.map.mapNode.classList.remove('map--faded');
        window.form.formNode.classList.remove('ad-form--disabled');

        window.form.formNode.address.value = window.map.getAddressMapPinMainStr();

        window.map.mapPinMainNode.removeEventListener('mousedown', unlockPage);
        window.map.mapPinMainNode.removeEventListener('keydown', unlockPage);

        window.map.mapPinMainNode.addEventListener('mousedown', window.move);
        if (evt.button === 0) {
          window.move(evt);
          window.map.mapPinMainNode.addEventListener('mouseup', window.move.onMouseUp, {once: true});
        }
      }
    };

    var onDataError = function (message) {
      throw new Error(message);
    };

    window.backend.load(onDataLoad, onDataError);
  };

  toggleDisabledOnFormNodes();

  window.map.mapPinMainNode.addEventListener('mousedown', unlockPage);
  window.map.mapPinMainNode.addEventListener('keydown', unlockPage);


  window.lockPage = function () {
    window.util.isPageDisabled = true;

    toggleDisabledOnFormNodes();
    window.map.mapNode.classList.add('map--faded');
    window.form.formNode.classList.add('ad-form--disabled');
    window.form.formNode.reset();
    window.map.mapFiltersNode.reset();

    var mapPinsAdNodes = window.map.mapPinsNode.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < mapPinsAdNodes.length; i++) {
      mapPinsAdNodes[i].remove();
    }

    window.map.mapPinMainNode.style.top = window.map.MAIN_PIN.coords.y;
    window.map.mapPinMainNode.style.left = window.map.MAIN_PIN.coords.x;
    window.form.formNode.address.value = window.map.getAddressMapPinMainStr();

    window.map.mapPinMainNode.removeEventListener('mousedown', window.move);
    window.map.mapPinMainNode.addEventListener('mousedown', unlockPage);
    window.map.mapPinMainNode.addEventListener('keydown', unlockPage);
  };

})();
