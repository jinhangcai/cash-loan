'use strict';

setTimeout(function () {
  var html = document.querySelector('html');
  var body = document.body;

  function getWidth() {
    return document.body.getBoundingClientRect().width;
  }

  function setWidth() {
    var width = getWidth() / 10;
    // if (width > 54) width = 54
    html.style.fontSize = width + 'px';
    body.style.fontSize = '16px';
  }

  setTimeout(setWidth);

  window.addEventListener('resize', setWidth);
});
