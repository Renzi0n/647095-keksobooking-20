'use strict';

var NUMBER_OF_ADS = 8;
var MAP_SIZES.width = 1200;
var CHECKIN_HOURS = ['12:00', '13:00', '14:00'];
var CHECKOUT_HOURS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_ADDRESSES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TYPES_MAP = {
  'palace': {
    name: 'Дворец',
    minPrice: '10000'
  },
  'flat': {
    name: 'Комната',
    minPrice: '1000'
  },
  'house': {
    name: 'Дом',
    minPrice: '5000'
  },
  'bungalo': {
    name: 'Бунгало',
    minPrice: '0'
  }
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
var mapPinsNode = mapNode.querySelector('.map__pins');
var mapPinMainNode = mapPinsNode.querySelector('.map__pin--main');
var mapFiltersNodes = mapNode.querySelector('.map__filters').children;

var formNode = document.querySelector('.ad-form');
var formFieldsNodes = formNode.children;

var mapPinTemplateNode = document.querySelector('#pin').content.querySelector('.map__pin');
var mapCardTemplateNode = document.querySelector('#card').content.querySelector('.popup');
var fragment = document.createDocumentFragment();

var isPageDisabled = true;
var popupNode;
var popupCloseNode;


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
      address: getRandomNumber(0, MAP_SIZES.width) + ', ' + getRandomNumber(130, 630),
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
      x: getRandomNumber(0, MAP_SIZES.width),
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

var adObjectsArr = getAdObjectsArr();

var renderMapPin = function (template, ad) {
  var mapElement = template.cloneNode(true);
  var mapElementImg = mapElement.querySelector('img');

  mapElementImg.src = ad.author.avatar;
  mapElementImg.alt = ad.offer.title;

  mapElement.style.left = ad.location.x - (mapElementImg.width / 2) + 'px';
  mapElement.style.top = ad.location.y - mapElementImg.height + 'px';

  mapElement.addEventListener('click', function () {
    onMapPinAdClick(ad);
  });

  return mapElement;
};

var getDeclOfNumb = function (number, titles) {
  var cases = [2, 0, 1, 1, 1, 2];

  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

var getDeclForCapacityStr = function (rooms, guests) {
  var roomsDecl = rooms + getDeclOfNumb(rooms, [' комната', ' комнаты', ' комнат']);
  var guestsDecl = guests + getDeclOfNumb(guests, [' гостя', ' гостей', ' гостей']);
  return roomsDecl + ' для ' + guestsDecl;
};

var renderPopup = function (template, ad) {
  var popupElement = template.cloneNode(true);
  var popupElementFeatures = popupElement.querySelector('.popup__features').children;
  var popupElementPhoto = popupElement.querySelector('.popup__photo');

  popupElement.querySelector('.popup__avatar').src = ad.author.avatar;
  popupElement.querySelector('.popup__title').textContent = ad.offer.title;
  popupElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  popupElement.querySelector('.popup__text--price').textContent = ad.offer.price + ' ₽/ночь';
  popupElement.querySelector('.popup__type').textContent = TYPES_MAP[ad.offer.type].name;
  popupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  popupElement.querySelector('.popup__description').textContent = ad.offer.description;

  popupElement.querySelector('.popup__text--capacity').textContent = getDeclForCapacityStr(ad.offer.rooms, ad.offer.guests);

  for (var i = 0; i < popupElementFeatures.length - ad.offer.features.length; i++) {
    popupElementFeatures[popupElementFeatures.length - 1 - i].style.display = 'none';
  }

  popupElementPhoto.src = ad.offer.photos[0];
  if (ad.offer.photos.length > 1) {
    for (i = 1; i < ad.offer.photos.length; i++) {
      popupElement.querySelector('.popup__photos').appendChild(popupElementPhoto.cloneNode(true)).src = ad.offer.photos[i];
    }
  }

  return popupElement;
};

var getAddressMapPinMainStr = function () {
  var сalculatedX = parseInt(mapPinMainNode.style.left, 10) + MAIN_PIN_SIZES.active.width / 2;
  var сalculatedHeight = isPageDisabled ? MAIN_PIN_SIZES.active.height / 2 : MAIN_PIN_SIZES.active.height;
  var сalculatedY = parseInt(mapPinMainNode.style.top, 10) + сalculatedHeight;

  return Math.round(сalculatedX) + ', ' + Math.round(сalculatedY);
};

var toggleDisabledOnFormNodes = function () {
  var pointerEventsValue = isPageDisabled ? 'none' : 'auto';

  for (var i = 0; i < formFieldsNodes.length; i++) {
    formFieldsNodes[i].disabled = isPageDisabled;
    formFieldsNodes[i].style.pointerEvents = pointerEventsValue;
  }

  for (i = 0; i < mapFiltersNodes.length; i++) {
    mapFiltersNodes[i].disabled = isPageDisabled;
    mapFiltersNodes[i].style.pointerEvents = pointerEventsValue;
  }
};

var closePopup = function () {
  popupNode.remove();

  popupCloseNode.removeEventListener('click', closePopup);
  popupCloseNode.removeEventListener('keydown', onPopupCloseNodeEnterPress);
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
};

var onPopupCloseNodeEnterPress = function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
};

var onMapPinAdClick = function (ad) {
  if (popupNode) {
    closePopup();
  }

  popupNode = mapPinsNode.insertAdjacentElement('afterEnd', renderPopup(mapCardTemplateNode, ad));
  popupCloseNode = popupNode.querySelector('.popup__close');

  popupCloseNode.addEventListener('click', closePopup);
  popupCloseNode.addEventListener('keydown', onPopupCloseNodeEnterPress);
  document.addEventListener('keydown', onPopupEscPress);
};

var unlockPage = function (evt) {
  if (evt.button === 0 || evt.key === 'Enter') {
    isPageDisabled = false;

    for (var i = 0; i < adObjectsArr.length; i++) {
      var adObjectsArrItem = adObjectsArr[i];

      fragment.appendChild(renderMapPin(mapPinTemplateNode, adObjectsArrItem));
    }
    mapPinsNode.appendChild(fragment);

    toggleDisabledOnFormNodes();
    mapNode.classList.remove('map--faded');
    formNode.classList.remove('ad-form--disabled');

    formNode.address.value = getAddressMapPinMainStr();

    mapPinMainNode.removeEventListener('mousedown', unlockPage);
    mapPinMainNode.removeEventListener('keydown', unlockPage);
  }
};

var validateGuestsSelect = function () {
  var customValidityMessage = ROOMS_FOR_GUESTS_MAP[formNode.rooms.value].includes(formNode.capacity.value) === true ? '' : 'Такой вариант не подходит!';

  formNode.capacity.setCustomValidity(customValidityMessage);
};

var validatePriceInput = function () {
  formNode.price.placeholder = TYPES_MAP[formNode.type.value].minPrice;
  formNode.price.min = TYPES_MAP[formNode.type.value].minPrice;
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

mapPinMainNode.addEventListener('mousedown', unlockPage);
mapPinMainNode.addEventListener('keydown', unlockPage);

formNode.addEventListener('change', onFormNodeChange);

toggleDisabledOnFormNodes();
formNode.address.value = getAddressMapPinMainStr();
