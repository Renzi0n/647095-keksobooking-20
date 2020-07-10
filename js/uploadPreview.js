'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var defaultImagesSrc = 'img/muffin-grey.svg';

  var avatarPreviewNode = document.querySelector('.ad-form-header__preview img');
  var housingImgPreviewNode = document.querySelector('.ad-form__photo img');

  var onFileInputNodeChange = function (input, imgPreview) {
    var choosenFile = input.files[0];
    var choosenFileName = choosenFile.name.toLowerCase(); // название выбранного файла в нижнем регистре

    var matches = FILE_TYPES.some(function (it) { // проверяем название выбранного файла на присутствие в нем правильного расширения
      return choosenFileName.endsWith(it);
    });

    if (matches) {
      var fileReader = new FileReader(); // делаем себе копию файл ридера

      fileReader.addEventListener('load', function () { // вешаем обработчик на загрузку в него файлов
        imgPreview.src = fileReader.result; // если загрузка была, то в аватар загружаем нашу картинку
      });

      fileReader.readAsDataURL(choosenFile); // говорим файл ридеру, как читать выбранный файл
    }
  };


  window.uploadAvatarNode = document.querySelector('.ad-form__field input');
  window.uploadHousingImgNode = document.querySelector('.ad-form__upload input');

  window.onUploadAvatarNodeChange = function () {
    onFileInputNodeChange(window.uploadAvatarNode, avatarPreviewNode);
  };

  window.onUploadHousingImgNode = function () {
    onFileInputNodeChange(window.uploadHousingImgNode, housingImgPreviewNode);
  };

  window.resetImages = function () {
    avatarPreviewNode.src = defaultImagesSrc;
    housingImgPreviewNode.src = defaultImagesSrc;
  };
})();
