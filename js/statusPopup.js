'use strict';

(function () {

  var successPopupNode = document.querySelector('#success').content.querySelector('.success');
  var errorPopupNode = document.querySelector('#error').content.querySelector('.error');

  var popupElement;

  var closePopup = function () {
    popupElement.remove();

    document.removeEventListener('click', closePopup);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      closePopup();
    }
  };

  window.renderPopup = function (isError) {
    popupElement = isError ? errorPopupNode.cloneNode(true) : successPopupNode.cloneNode(true);

    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('click', closePopup);

    document.querySelector('main').appendChild(popupElement);
  };
})();
