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
    if (evt.button === 0 || evt.key === 'Enter') {
      window.util.isPageDisabled = false;

      for (var i = 0; i < window.data.adObjectsArr.length; i++) {
        var adObjectsArrItem = window.data.adObjectsArr[i];

        fragment.appendChild(window.pin.renderMapPin(adObjectsArrItem));
      }
      window.map.mapPinsNode.appendChild(fragment);

      toggleDisabledOnFormNodes();
      window.map.mapNode.classList.remove('map--faded');
      window.form.formNode.classList.remove('ad-form--disabled');

      window.form.formNode.address.value = window.map.getAddressMapPinMainStr();

      window.map.mapPinMainNode.removeEventListener('mousedown', unlockPage);
      window.map.mapPinMainNode.removeEventListener('keydown', unlockPage);
    }
  };

  window.map.mapPinMainNode.addEventListener('mousedown', unlockPage);
  window.map.mapPinMainNode.addEventListener('keydown', unlockPage);

  toggleDisabledOnFormNodes();

})();
