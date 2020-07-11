'use strict';

(function () {

  var ROOMS_FOR_GUESTS_MAP = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  var formNode = document.querySelector('.ad-form');
  var formFieldsNodes = formNode.children;


  var validateGuestsSelect = function () {
    var customValidityMessage = ROOMS_FOR_GUESTS_MAP[formNode.rooms.value].includes(formNode.capacity.value) === true ? '' : 'Такой вариант не подходит!';

    formNode.capacity.setCustomValidity(customValidityMessage);
  };

  var validatePriceInput = function () {
    formNode.price.placeholder = window.util.TYPES_MAP[formNode.type.value].minPrice;
    formNode.price.min = window.util.TYPES_MAP[formNode.type.value].minPrice;
  };

  var validateTimeSelects = function (evt) {
    if (evt.target === formNode.timein) {
      formNode.timeout.value = formNode.timein.value;
    } else {
      formNode.timein.value = formNode.timeout.value;
    }
  };

  var onFormNodeChange = function (evt) {
    switch (evt.target) {
      case formNode.rooms:
      case formNode.capacity:
        validateGuestsSelect();
        break;
      case formNode.timein:
      case formNode.timeout:
        validateTimeSelects(evt);
        break;
      case formNode.type:
        validatePriceInput();
        break;
    }
  };

  var onFormSubmit = function (message, isError) {
    window.renderPopup(isError);

    if (!isError) {
      window.lockPage();
      window.map.mapNode.scrollIntoView({block: 'center', behavior: 'smooth'});
    } else {
      throw new Error(message);
    }
  };


  formNode.address.value = window.map.getAddressMapPinMainStr();
  formNode.addEventListener('change', onFormNodeChange);


  formNode.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(formNode), onFormSubmit, onFormSubmit);
    evt.preventDefault();
  });

  formNode.querySelector('.ad-form__reset').addEventListener('click', function (evt) {
    evt.preventDefault();
    window.lockPage();
    window.map.mapNode.scrollIntoView({block: 'center', behavior: 'smooth'});
  });


  window.form = {
    formNode: formNode,
    formFieldsNodes: formFieldsNodes,

    getDeclForCapacityStr: function (rooms, guests) {
      var roomsDecl = rooms + window.util.getDeclOfNumb(rooms, [' комната', ' комнаты', ' комнат']);
      var guestsDecl = guests + window.util.getDeclOfNumb(guests, [' гостя', ' гостей', ' гостей']);
      return roomsDecl + ' для ' + guestsDecl;
    }
  };

})();
