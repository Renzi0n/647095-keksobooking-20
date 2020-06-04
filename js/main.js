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


var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var fragment = document.createDocumentFragment();


var getRandomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var getRandomElementOfArr = function (arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
};

var getRandomLengthArr = function (arr) {
  arr.length = getRandomNumber(1, arr.length);

  return arr;
};

var getAdObj = function (i) {
  return {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    offer: {
      title: 'Заголовок',
      address: '{{location.x}}, {{location.y}}',
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

var renderMapPin = function (template, ad, i) {
  var mapElement = template.cloneNode(true);
  var mapElementImg = mapElement.querySelector('img');

  mapElementImg.src = ad[i].author.avatar;
  mapElementImg.alt = ad[i].offer.title;

  mapElement.style.left = ad[i].location.x - (mapElementImg.width / 2) + 'px';
  mapElement.style.top = ad[i].location.y - mapElementImg.height + 'px';

  return mapElement;
};


var adObjectsArr = getAdObjectsArr();


for (var i = 0; i < adObjectsArr.length; i++) {
  fragment.appendChild(renderMapPin(mapPinTemplate, adObjectsArr, i));
}

mapPins.appendChild(fragment);

map.classList.remove('map--faded');
