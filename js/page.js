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

        var renderMapPins = function (filteredAdObjectsArr) { // отрисовка пинов
          for (var i = 0; i < filteredAdObjectsArr.length; i++) {
            var adObjectsArrItem = filteredAdObjectsArr[i];

            if (Object.keys(adObjectsArrItem).includes('offer')) { // проверяем на существования поля с основными данными у объявления
              fragment.appendChild(window.pin.renderMapPin(adObjectsArrItem));
            }
          }

          window.map.mapPinsNode.appendChild(fragment);
        };

        window.onChangeTypeFilterNode = function () { // очищаем карту и вызываем отрисовку отфильтрованных по типу пинов
          window.map.clearMap();
          renderMapPins(window.filter.filterMapPins(adObjectsArr));
        };

        renderMapPins(window.filter.filterMapPins(adObjectsArr)); // отрисовываем пины при фильтрах по умолчанию

        window.filter.typeFilterNode.addEventListener('change', window.onChangeTypeFilterNode); // добавляем обработчик для фильтра по типу

        toggleDisabledOnFormNodes();
        window.map.mapNode.classList.remove('map--faded');
        window.form.formNode.classList.remove('ad-form--disabled');

        window.form.formNode.address.value = window.map.getAddressMapPinMainStr();

        window.map.mapPinMainNode.removeEventListener('mousedown', unlockPage);
        window.map.mapPinMainNode.removeEventListener('keydown', unlockPage);
      }
    };

    var onDataError = function (message) {
      throw new Error(message);
    };

    window.backend.load(onDataLoad, onDataError);
  };

  toggleDisabledOnFormNodes();

  window.map.mapPinMainNode.addEventListener('keydown', unlockPage);
  window.map.mapPinMainNode.addEventListener('mousedown', window.move);
  window.map.mapPinMainNode.addEventListener('mousedown', unlockPage);


  window.lockPage = function () {
    window.util.isPageDisabled = true;

    toggleDisabledOnFormNodes();
    window.map.mapNode.classList.add('map--faded');
    window.form.formNode.classList.add('ad-form--disabled');
    window.form.formNode.reset();
    window.map.mapFiltersNode.reset();
    window.map.clearMap();

    window.map.mapPinMainNode.style.top = window.map.MAIN_PIN.coords.y; // возращаем главный пин в изначальное положение
    window.map.mapPinMainNode.style.left = window.map.MAIN_PIN.coords.x;
    window.form.formNode.address.value = window.map.getAddressMapPinMainStr();

    window.filter.typeFilterNode.removeEventListener('change', window.onChangeTypeFilterNode); // удаляем обработчик для фильтра по типу

    window.map.mapPinMainNode.addEventListener('mousedown', unlockPage);
    window.map.mapPinMainNode.addEventListener('keydown', unlockPage);
  };

})();
