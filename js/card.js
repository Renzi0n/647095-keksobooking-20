'use strict';

(function () {

  var FEATURES_CLASS_MAP = {
    wifi: 'popup__feature--wifi',
    dishwasher: 'popup__feature--dishwasher',
    parking: 'popup__feature--parking',
    washer: 'popup__feature--washer',
    elevator: 'popup__feature--elevator',
    conditioner: 'popup__feature--conditioner'
  };

  var mapCardTemplateNode = document.querySelector('#card').content.querySelector('.popup');

  window.card = {
    renderPopup: function (ad) {
      var popupElement = mapCardTemplateNode.cloneNode(true);
      var popupElementFeatures = popupElement.querySelector('.popup__features');
      var popupElementAvatar = popupElement.querySelector('.popup__avatar');
      var popupElementDescription = popupElement.querySelector('.popup__description');
      var popupElementPhotos = popupElement.querySelector('.popup__photos');
      var popupElementPhoto = popupElementPhotos.querySelector('.popup__photo');

      popupElement.querySelector('.popup__title').textContent = ad.offer.title;
      popupElement.querySelector('.popup__text--address').textContent = ad.offer.address;
      popupElement.querySelector('.popup__text--price').textContent = ad.offer.price + ' ₽/ночь';
      popupElement.querySelector('.popup__type').textContent = window.util.TYPES_MAP[ad.offer.type].name;
      popupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
      popupElement.querySelector('.popup__text--capacity').textContent = window.form.getDeclForCapacityStr(ad.offer.rooms, ad.offer.guests);

      if (ad.author.avatar && ad.author.avatar.length) {
        popupElementAvatar.classList.remove('hidden');

        popupElementAvatar.src = ad.author.avatar;
      }

      if (ad.offer.description && ad.offer.description.length) {
        popupElementDescription.classList.remove('hidden');

        popupElementDescription.textContent = ad.offer.description;
      }

      if (ad.offer.features && ad.offer.features.length) {
        popupElementFeatures.classList.remove('hidden');

        for (var i = 0; i < popupElementFeatures.children.length; i++) {
          for (var j = 0; j < ad.offer.features.length; j++) { // Проверяем каждый элемент из разметки на наличие у него класса нужной фичи из объявления
            if (popupElementFeatures.children[i].classList.contains(FEATURES_CLASS_MAP[ad.offer.features[j]])) {
              popupElementFeatures.children[i].classList.remove('hidden'); // Если такой класс есть, то показываем фичу в карточке
              break;
            }
          }
        }
      }

      if (ad.offer.photos && ad.offer.photos.length) {
        popupElementPhotos.classList.remove('hidden');

        popupElementPhoto.src = ad.offer.photos[0];
        if (ad.offer.photos.length > 1) {
          for (i = 1; i < ad.offer.photos.length; i++) {
            popupElementPhotos.appendChild(popupElementPhoto.cloneNode(true)).src = ad.offer.photos[i];
          }
        }
      }

      return popupElement;
    },

    onDocumentKeyDownEsc: function (evt) {
      if (evt.key === window.util.EVT_KEYS.esc) {
        window.card.closePopup();
      }
    },

    onPopupCloseNodeKeyDownEnter: function (evt) {
      if (evt.key === window.util.EVT_KEYS.enter) {
        window.card.closePopup();
      }
    },

    onPopupCloseNodeClick: function () {
      window.card.closePopup();
    },

    closePopup: function () {
      window.pin.popupNode.remove();

      window.pin.popupCloseNode.removeEventListener('click', window.card.onPopupCloseNodeClick);
      window.pin.popupCloseNode.removeEventListener('keydown', window.card.onPopupCloseNodeKeyDownEnter);
      document.removeEventListener('keydown', window.card.onDocumentKeyDownEsc);
    }
  };

})();
