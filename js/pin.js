'use strict';

(function () {

  var mapPinTemplateNode = document.querySelector('#pin').content.querySelector('.map__pin');


  var onMapPinAdClick = function (ad) {
    if (window.pin.popupNode) {
      window.card.closePopup();
    }

    window.pin.popupNode = window.map.mapPinsNode.insertAdjacentElement('afterEnd', window.card.renderPopup(ad));
    window.pin.popupCloseNode = window.pin.popupNode.querySelector('.popup__close');

    window.pin.popupCloseNode.addEventListener('click', window.card.closePopup);
    window.pin.popupCloseNode.addEventListener('keydown', window.card.onPopupCloseNodeEnterPress);
    document.addEventListener('keydown', window.card.onPopupEscPress);
  };

  window.pin = {
    renderMapPin: function (ad) {
      var mapElement = mapPinTemplateNode.cloneNode(true);
      var mapElementImg = mapElement.querySelector('img');

      mapElementImg.src = ad.author.avatar;
      mapElementImg.alt = ad.offer.title;

      mapElement.style.left = ad.location.x - (mapElementImg.width / 2) + 'px';
      mapElement.style.top = ad.location.y - mapElementImg.height + 'px';

      mapElement.addEventListener('click', function () {
        onMapPinAdClick(ad);
      });

      return mapElement;
    }
  };

})();
