'use strict';

(function () {

  var toggleDisabledOnFormNodes = function () {
    var pointerEventsValue = window.util.isPageDisabled ? 'none' : 'auto';

    Array.from(window.form.formFieldsNodes).forEach(function (elem) {
      elem.disabled = window.util.isPageDisabled;
      elem.style.pointerEvents = pointerEventsValue;
    });

    Array.from(window.filter.filterFormNode.children).forEach(function (elem) {
      elem.disabled = window.util.isPageDisabled;
      elem.style.pointerEvents = pointerEventsValue;
    });
  };

  var renderMapPins = function (filteredAdObjectsArr) { // отрисовка пинов
    var fragment = document.createDocumentFragment();

    filteredAdObjectsArr.forEach(function (elem) {
      if (Object.keys(elem).includes('offer')) { // проверяем на существования поля с основными данными у объявления
        fragment.appendChild(window.pin.renderMapPin(elem));
      }
    });

    window.map.mapPinsNode.appendChild(fragment);
  };

  var unlockPage = function () {
    var onDataLoad = function (adObjectsArr) {
      window.util.isPageDisabled = false;

      window.onFilterFormNodeChange = function () { // очищаем карту и вызываем отрисовку отфильтрованных по типу пинов через дебаунс
        var updateMapPins = window.debounce(function () {
          window.map.clearMap();
          renderMapPins(window.filter.filterMapPins(adObjectsArr));
        });

        updateMapPins();
      };

      renderMapPins(window.filter.filterMapPins(adObjectsArr)); // отрисовываем пины при фильтрах по умолчанию

      window.filter.filterFormNode.addEventListener('change', window.onFilterFormNodeChange); // обработчик изменения формы

      window.form.formNode.avatar.addEventListener('change', window.onUploadAvatarNodeChange); // добавляем обработчик загрузки аватара
      window.form.formNode.images.addEventListener('change', window.onUploadHousingImgNode); // добавляем обработчик загрузки фото жилья

      toggleDisabledOnFormNodes();
      window.map.mapNode.classList.remove('map--faded');
      window.form.formNode.classList.remove('ad-form--disabled');

      window.form.formNode.address.value = window.map.getAddressMapPinMainStr();

      window.map.mapPinMainNode.removeEventListener('keydown', onMapPinMainNodeKeyDownEnter);
      window.map.mapPinMainNode.removeEventListener('mousedown', onMapPinMainNodeMouseDownLeft);
    };

    var onDataError = function (message) {
      throw new Error(message);
    };

    window.backend.load(onDataLoad, onDataError);
  };

  var onMapPinMainNodeKeyDownEnter = function (evt) {
    if (evt.key === window.util.EVT_KEYS.enter) {
      unlockPage();
    }
  };

  var onMapPinMainNodeMouseDownLeft = function (evt) {
    if (evt.button === window.util.EVT_KEYS.leftBtn) {
      unlockPage();
    }
  };

  toggleDisabledOnFormNodes();

  window.map.mapPinMainNode.addEventListener('keydown', onMapPinMainNodeKeyDownEnter);
  window.map.mapPinMainNode.addEventListener('mousedown', window.onMapPinMainNodeMouseDownLeft);
  window.map.mapPinMainNode.addEventListener('mousedown', onMapPinMainNodeMouseDownLeft);


  window.lockPage = function () {
    window.util.isPageDisabled = true;

    toggleDisabledOnFormNodes();
    window.map.mapNode.classList.add('map--faded');
    window.form.formNode.classList.add('ad-form--disabled');
    window.form.formNode.reset();
    window.filter.filterFormNode.reset();
    window.resetImages();
    window.map.clearMap();

    window.map.mapPinMainNode.style.top = window.map.MAIN_PIN.coords.y; // возращаем главный пин в изначальное положение
    window.map.mapPinMainNode.style.left = window.map.MAIN_PIN.coords.x;
    window.form.formNode.address.value = window.map.getAddressMapPinMainStr();

    window.form.formNode.avatar.removeEventListener('change', window.onUploadAvatarNodeChange); // удаляем обработчик загрузки аватара
    window.form.formNode.images.removeEventListener('change', window.onUploadHousingImgNode); // удаляем обработчик загрузки фото жилья

    window.filter.filterFormNode.removeEventListener('change', window.onFilterFormNodeChange); // удаляем обработчик для фильтров

    window.map.mapPinMainNode.addEventListener('keydown', onMapPinMainNodeKeyDownEnter);
    window.map.mapPinMainNode.addEventListener('mousedown', onMapPinMainNodeMouseDownLeft);
  };

})();
