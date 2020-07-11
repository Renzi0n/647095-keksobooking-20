'use strict';

(function () {

  var successPopupNode = document.querySelector('#success').content.querySelector('.success');
  var errorPopupNode = document.querySelector('#error').content.querySelector('.error');

  var popupElement;

  var closePopup = function () {
    popupElement.remove();

    document.removeEventListener('keydown', onDocumentKeyDownEsc);
    document.removeEventListener('click', onDocumentClick);
  };

  var onDocumentKeyDownEsc = function (evt) {
    if (evt.key === window.util.EVT_KEYS.esc) {
      closePopup();
    }
  };

  var onDocumentClick = function (evt) {
    if (evt.target !== popupElement.querySelector('p')) {
      closePopup();
    }
  };


  window.renderPopup = function (isError) {
    popupElement = isError ? errorPopupNode.cloneNode(true) : successPopupNode.cloneNode(true);

    document.addEventListener('keydown', onDocumentKeyDownEsc);
    document.addEventListener('click', onDocumentClick);

    document.querySelector('main').appendChild(popupElement);
  };
})();
