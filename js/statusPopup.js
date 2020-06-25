'use strict';

(function () {

  var successPopupNode = document.querySelector('#success').content.querySelector('.success');
  var errorPopupNode = document.querySelector('#error').content.querySelector('.error');

  var popupElement;

  var closePopup = function () {
    popupElement.remove();

    popupElement.removeEventListener('click', onClickRandomArea);
    document.removeEventListener('keydown', onPopupEscPress);
    if (popupElement.classList.contains('error')) {
      popupElement.querySelector('.error__button').removeEventListener('click', closePopup);
    }
  };

  var onClickRandomArea = function (evt) {
    if (evt.target !== popupElement.querySelector('p')) {
      closePopup();
    }
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      closePopup();
    }
  };

  window.renderPopup = function (isError) {
    popupElement = isError ? errorPopupNode.cloneNode(true) : successPopupNode.cloneNode(true);

    document.addEventListener('keydown', onPopupEscPress);
    popupElement.addEventListener('click', onClickRandomArea);
    if (isError) {
      popupElement.querySelector('.error__button').addEventListener('click', closePopup);
    }

    document.querySelector('main').appendChild(popupElement);
  };
})();
