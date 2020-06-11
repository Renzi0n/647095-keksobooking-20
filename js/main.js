'use strict';

var NUMBER_OF_ADS = 8;
var MAP_WIDTH = 1200;
var CHECKIN_HOURS = ['12:00', '13:00', '14:00'];
var CHECKOUT_HOURS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_ADDRESSES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TYPES_MAP = {
  'palace': 'Дворец',
  'flat': 'Комната',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};
var MAIN_PIN_SIZES = {
  active: {
    width: 200,
    height: 200
  },
  inactive: {
    width: 65,
    height: 65
  }
};
var ROOMS_FOR_GUESTS_MAP = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};


var mapNode = document.querySelector('.map');
var mapPinsNode = document.querySelector('.map__pins');
var mapPinMainNode = mapPinsNode.querySelector('.map__pin--main');
var mapPinTemplateNode = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
// var mapCardTemplateNode = document.querySelector('#card')
//   .content
//   .querySelector('.popup');
var fragment = document.createDocumentFragment();
var formNode = document.querySelector('.ad-form');
var formFieldsNodes = formNode.children;
var addressInputNode = formNode.querySelector('#address');
var mapFiltersNodes = document.querySelector('.map__filters').children;
var roomsSelectNode = document.querySelector('#room_number');
var guestsSelectNode = document.querySelector('#capacity');


var getRandomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var getRandomElementOfArr = function (arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
};

var getRandomLengthArr = function (arr) {
  return arr.slice(0, getRandomNumber(1, arr.length));
};

var getAdObj = function (i) {
  return {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    offer: {
      title: 'Заголовок',
      address: getRandomNumber(0, MAP_WIDTH) + ', ' + getRandomNumber(130, 630),
      price: getRandomNumber(10000, 50000),
      type: getRandomElementOfArr(Object.keys(TYPES_MAP)),
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 10),
      checkin: getRandomElementOfArr(CHECKIN_HOURS),
      checkout: getRandomElementOfArr(CHECKOUT_HOURS),
      features: getRandomLengthArr(FEATURES),
      description: 'Описание',
      photos: getRandomLengthArr(PHOTOS_ADDRESSES)
    },
    location: {
      x: getRandomNumber(0, MAP_WIDTH),
      y: getRandomNumber(130, 630)
    }
  };
};

var getAdObjectsArr = function () {
  var adObjectsArr = [];
  for (var i = 0; i < NUMBER_OF_ADS; i++) {
    adObjectsArr.push(getAdObj(i));
  }

  return adObjectsArr;
};

var renderMapPin = function (template, ad) {
  var mapElement = template.cloneNode(true);
  var mapElementImg = mapElement.querySelector('img');

  mapElementImg.src = ad.author.avatar;
  mapElementImg.alt = ad.offer.title;

  mapElement.style.left = ad.location.x - (mapElementImg.width / 2) + 'px';
  mapElement.style.top = ad.location.y - mapElementImg.height + 'px';

  return mapElement;
};

var lockForms = function (isDisable) {
  for (var i = 0; i < formFieldsNodes.length; i++) {
    formFieldsNodes[i].disabled = isDisable;
  }

  for (i = 0; i < mapFiltersNodes.length; i++) {
    mapFiltersNodes[i].disabled = isDisable;
  }
};

var unlockPage = function (evt) {
  if (evt.button === 0 || evt.key === 'Enter') {
    for (var i = 0; i < adObjectsArr.length; i++) {
      var adObjectsArrItem = adObjectsArr[i];

      fragment.appendChild(renderMapPin(mapPinTemplateNode, adObjectsArrItem));
    }
    mapPinsNode.appendChild(fragment);

    lockForms(false);
    mapNode.classList.remove('map--faded');
    formNode.classList.remove('ad-form--disabled');

    addressInputNode.value = Math.round((parseInt(mapPinMainNode.style.left, 10) + MAIN_PIN_SIZES.active.width / 2)) + ', '
      + Math.round((parseInt(mapPinMainNode.style.top, 10) + MAIN_PIN_SIZES.active.height));

    mapPinMainNode.removeEventListener('mousedown', unlockPage);
    mapPinMainNode.removeEventListener('keydown', unlockPage);
  }
};

var getSelectedOptionValue = function (selectNode) {
  for (var i = 0; i < selectNode.options.length; i++) {
    if (selectNode.options[i].selected) {
      var selectedOption = selectNode.options[i];
    }
  }

  return selectedOption.value;
};

var validateGuestsSelect = function (selectedRoomsValue, selectedGuestsValue) {
  if (ROOMS_FOR_GUESTS_MAP[String(selectedRoomsValue)].includes(String(selectedGuestsValue))) {
    guestsSelectNode.setCustomValidity('');
  } else {
    guestsSelectNode.setCustomValidity('Такой вариант не подходит!');
  }
};


var adObjectsArr = getAdObjectsArr();

var selectedGuestsValue = getSelectedOptionValue(guestsSelectNode);
var selectedRoomsValue = getSelectedOptionValue(roomsSelectNode);


validateGuestsSelect(selectedRoomsValue, selectedGuestsValue);

roomsSelectNode.addEventListener('change', function (evt) {
  selectedRoomsValue = evt.target.value;
  selectedGuestsValue = getSelectedOptionValue(guestsSelectNode);

  validateGuestsSelect(selectedRoomsValue, selectedGuestsValue);
});

guestsSelectNode.addEventListener('change', function (evt) {
  selectedGuestsValue = evt.target.value;
  selectedRoomsValue = getSelectedOptionValue(roomsSelectNode);

  validateGuestsSelect(selectedRoomsValue, selectedGuestsValue);
});

lockForms(true);
addressInputNode.value = Math.round((parseInt(mapPinMainNode.style.left, 10) + MAIN_PIN_SIZES.inactive.width / 2)) + ', '
  + Math.round((parseInt(mapPinMainNode.style.top, 10) + MAIN_PIN_SIZES.inactive.height / 2));

mapPinMainNode.addEventListener('mousedown', unlockPage);
mapPinMainNode.addEventListener('keydown', unlockPage);

// var getDeclOfNumb = function (number, titles) {
//   var cases = [2, 0, 1, 1, 1, 2];

//   return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
// };

// var renderPopup = function (template, ad) {
//   var popupElement = template.cloneNode(true);
//   var popupElementFeatures = popupElement.querySelector('.popup__features').children;
//   var popupElementPhoto = popupElement.querySelector('.popup__photo');

//   popupElement.querySelector('.popup__avatar').src = ad.author.avatar;
//   popupElement.querySelector('.popup__title').textContent = ad.offer.title;
//   popupElement.querySelector('.popup__text--address').textContent = ad.offer.address;
//   popupElement.querySelector('.popup__text--price').textContent = ad.offer.price + ' ₽/ночь';
//   popupElement.querySelector('.popup__type').textContent = TYPES_MAP[ad.offer.type];
//   popupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
//   popupElement.querySelector('.popup__description').textContent = ad.offer.description;

//   popupElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms +
//     getDeclOfNumb(ad.offer.rooms, [' комната', ' комнаты', ' комнат']) + ' для ' +
//     ad.offer.guests + getDeclOfNumb(ad.offer.guests, [' гостя', ' гостей', ' гостей']);

//   for (var i = 0; i < popupElementFeatures.length - ad.offer.features.length; i++) {
//     popupElementFeatures[popupElementFeatures.length - 1 - i].style.display = 'none';
//   }

//   popupElementPhoto.src = ad.offer.photos[0];
//   if (ad.offer.photos.length > 1) {
//     for (i = 1; i < ad.offer.photos.length; i++) {
//       popupElement.querySelector('.popup__photos').appendChild(popupElementPhoto.cloneNode(true)).src = ad.offer.photos[i];
//     }
//   }

//   return popupElement;
// };

// mapPinsNode.insertAdjacentElement('afterEnd', renderPopup(mapCardTemplateNode, adObjectsArr[0]));


