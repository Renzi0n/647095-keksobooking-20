'use strict';

var NUMBER_OF_ADS = 8;
var MAP_WIDTH = 1200;
var TYPES_OF_ROOM = ['palace', 'flat', 'house', 'bungalo'];
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


var mapNode = document.querySelector('.map');
var mapPinsNode = document.querySelector('.map__pins');
var mapPinTemplateNode = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var mapCardTemplateNode = document.querySelector('#card')
  .content
  .querySelector('.popup');
var fragment = document.createDocumentFragment();


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
      type: getRandomElementOfArr(TYPES_OF_ROOM),
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

var renderPopup = function (template, ad) {
  var popupElement = template.cloneNode(true);
  var popupElementImg = popupElement.querySelector('.popup__avatar');
  var popupElementTitle = popupElement.querySelector('.popup__title');
  var popupElementAddress = popupElement.querySelector('.popup__text--address');
  var popupElementPrice = popupElement.querySelector('.popup__text--price');
  var popupElementType = popupElement.querySelector('.popup__type');
  var popupElementCapacity = popupElement.querySelector('.popup__text--capacity');
  var popupElementTime = popupElement.querySelector('.popup__text--time');
  var popupElementFeatures = popupElement.querySelector('.popup__features').children;
  var popupElementDescription = popupElement.querySelector('.popup__description');
  var popupElementPhotos = popupElement.querySelector('.popup__photos');
  var popupElementPhoto = popupElement.querySelector('.popup__photo');

  popupElementImg.src = ad.author.avatar;
  popupElementTitle.textContent = ad.offer.title;
  popupElementAddress.textContent = ad.offer.address;
  popupElementPrice.textContent = ad.offer.price + ' ₽/ночь';
  popupElementType.textContent = TYPES_MAP[ad.offer.type];
  popupElementCapacity.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  popupElementTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  for (var i = 0; i < popupElementFeatures.length - ad.offer.features.length; i++) {
    popupElementFeatures[popupElementFeatures.length - 1 - i].style.display = 'none';
  }
  popupElementDescription.textContent = ad.offer.description;
  popupElementPhoto.src = ad.offer.photos[0];
  if (ad.offer.photos.length > 1) {
    for (i = 1; i < ad.offer.photos.length; i++) {
      popupElementPhotos.appendChild(popupElementPhoto.cloneNode(true)).src = ad.offer.photos[i];
    }
  }

  return popupElement;
};


var adObjectsArr = getAdObjectsArr();


for (var i = 0; i < adObjectsArr.length; i++) {
  var adObjectsArrItem = adObjectsArr[i];

  fragment.appendChild(renderMapPin(mapPinTemplateNode, adObjectsArrItem));
}

mapPinsNode.appendChild(fragment);

mapPinsNode.insertAdjacentElement('afterEnd', renderPopup(mapCardTemplateNode, adObjectsArr[0]));

mapNode.classList.remove('map--faded');
