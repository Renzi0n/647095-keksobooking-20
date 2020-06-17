'use strict';

(function () {

  var NUMBER_OF_ADS = 8;
  var MAP_WIDTH = 1200;
  var CHECKIN_HOURS = ['12:00', '13:00', '14:00'];
  var CHECKOUT_HOURS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS_ADDRESSES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


  var getAdObj = function (i) {
    return {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: 'Заголовок',
        address: window.util.getRandomNumber(0, MAP_WIDTH) + ', ' + window.util.getRandomNumber(130, 630),
        price: window.util.getRandomNumber(10000, 50000),
        type: window.util.getRandomElementOfArr(Object.keys(window.util.TYPES_MAP)),
        rooms: window.util.getRandomNumber(1, 5),
        guests: window.util.getRandomNumber(1, 10),
        checkin: window.util.getRandomElementOfArr(CHECKIN_HOURS),
        checkout: window.util.getRandomElementOfArr(CHECKOUT_HOURS),
        features: window.util.getRandomLengthArr(FEATURES),
        description: 'Описание',
        photos: window.util.getRandomLengthArr(PHOTOS_ADDRESSES)
      },
      location: {
        x: window.util.getRandomNumber(0, MAP_WIDTH),
        y: window.util.getRandomNumber(130, 630)
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

  window.data = {
    adObjectsArr: getAdObjectsArr()
  };

})();
