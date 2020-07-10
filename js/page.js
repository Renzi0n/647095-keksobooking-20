'use strict';

(function () {

  var fragment = document.createDocumentFragment();


  var toggleDisabledOnFormNodes = function () {
    var pointerEventsValue = window.util.isPageDisabled ? 'none' : 'auto';

    for (var i = 0; i < window.form.formFieldsNodes.length; i++) {
      window.form.formFieldsNodes[i].disabled = window.util.isPageDisabled;
      window.form.formFieldsNodes[i].style.pointerEvents = pointerEventsValue;
    }

    var filtersNodes = window.filter.filterFormNode.children;
    for (i = 0; i < filtersNodes.length; i++) {
      filtersNodes[i].disabled = window.util.isPageDisabled;
      filtersNodes[i].style.pointerEvents = pointerEventsValue;
    }
  };

  var renderMapPins = function (filteredAdObjectsArr) { // отрисовка пинов
    for (var i = 0; i < filteredAdObjectsArr.length; i++) {
      var adObjectsArrItem = filteredAdObjectsArr[i];

      if (Object.keys(adObjectsArrItem).includes('offer')) { // проверяем на существования поля с основными данными у объявления
        fragment.appendChild(window.pin.renderMapPin(adObjectsArrItem));
      }
    }

    window.map.mapPinsNode.appendChild(fragment);
  };

  var unlockPage = function (evt) {
    var onDataLoad = function (adObjectsArr) {
      if (evt.button === 0 || evt.key === 'Enter') {
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

        window.uploadAvatarNode.addEventListener('change', window.onUploadAvatarNodeChange); // добавляем обработчик загрузки аватара
        window.uploadHousingImgNode.addEventListener('change', window.onUploadHousingImgNode); // добавляем обработчик загрузки фото жилья

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
    window.filter.filterFormNode.reset();
    window.resetImages();
    window.map.clearMap();

    window.map.mapPinMainNode.style.top = window.map.MAIN_PIN.coords.y; // возращаем главный пин в изначальное положение
    window.map.mapPinMainNode.style.left = window.map.MAIN_PIN.coords.x;
    window.form.formNode.address.value = window.map.getAddressMapPinMainStr();

    window.uploadAvatarNode.removeEventListener('change', window.onUploadAvatarNodeChange); // удаляем обработчик загрузки аватара
    window.uploadHousingImgNode.removeEventListener('change', window.onUploadHousingImgNode); // удаляем обработчик загрузки фото жилья

    window.filter.filterFormNode.removeEventListener('change', window.onFilterFormNodeChange); // удаляем обработчик для фильтров

    window.map.mapPinMainNode.addEventListener('mousedown', unlockPage);
    window.map.mapPinMainNode.addEventListener('keydown', unlockPage);
  };

})();
