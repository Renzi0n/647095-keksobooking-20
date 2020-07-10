'use strict';

(function () {

  var successPopupNode = document.querySelector('#success').content.querySelector('.success');
  var errorPopupNode = document.querySelector('#error').content.querySelector('.error');

  var popupElement;

  var closePopup = function () {
    popupElement.remove();

    document.removeEventListener('keydown', onPopupEscPress);
    document.removeEventListener('click', onRandomAreaClick);
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      closePopup();
    }
  };

  var onRandomAreaClick = function (evt) {
    if (evt.target !== popupElement.querySelector('p')) {
      closePopup();
    }
  };


  window.renderPopup = function (isError) {
    popupElement = isError ? errorPopupNode.cloneNode(true) : successPopupNode.cloneNode(true);

    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('click', onRandomAreaClick);

    document.querySelector('main').appendChild(popupElement);
  };
})();
