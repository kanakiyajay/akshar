$.fn.textWidth = function(){
  var html_org = $(this).html();
  var html_calc = '<span>' + html_org + '</span>';
  $(this).html(html_calc);
  var width = $(this).find('span:first').width();
  $(this).html(html_org);
  return width;
};

function gridOverlay ($elem) {

  var supported = true;

  if (!!!document.getCSSCanvasContext) {
    supported = false;
  }

  var computedStyle = window.getComputedStyle($('#dabblet')[0]);
  var WIDTH = parseInt(computedStyle.width);
  var HEIGHT = parseInt(computedStyle.height);

  if (supported) {
    var ctx = document.getCSSCanvasContext('2d', 'animation', WIDTH, HEIGHT);
    var canvas = ctx.canvas;

    var ratio = correctPixelRatio(ctx);

    WIDTH = ctx.canvas.width;
    HEIGHT = ctx.canvas.height;

    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    /* For Background Lines */

    var topOffset = $elem.offset().top - $elem.parent().offset().top ;
    var leftOffset = $elem.offset().left - $elem.parent().offset().left ;

    var bottomOffset = topOffset + $elem.height() ;
    var rightOffset = leftOffset + $elem.textWidth() ;

    // Lines from top to bottom

    ctx.beginPath();
    ctx.moveTo(leftOffset, 0);
    ctx.lineTo(leftOffset, HEIGHT);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(rightOffset, 0);
    ctx.lineTo(rightOffset, HEIGHT);
    ctx.stroke();

    // Lines from Left to Right

    ctx.beginPath();
    ctx.moveTo(0, topOffset);
    ctx.lineTo(WIDTH, topOffset);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, bottomOffset);
    ctx.lineTo(WIDTH, bottomOffset);
    ctx.stroke();

    /* End Backgronud Lines */
  }

  function correctPixelRatio(ctx, container) {
    var canvas = ctx.canvas;
    var ratio =  window.devicePixelRatio / ctx.webkitBackingStorePixelRatio;

    var oldWidth = canvas.width;
    var oldHeight = canvas.height;

    canvas.width = oldWidth * ratio;
    canvas.height = oldHeight * ratio;

    canvas.style.width = oldWidth + 'px';
    canvas.style.height = oldHeight + 'px';

    return ratio;
  }
}