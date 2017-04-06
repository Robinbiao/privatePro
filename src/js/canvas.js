var c = document.createElement("canvas");
c.width = 500;
c.height = 500;
var cxt2 = c.getContext("2d");
var img2 = new Image();
img2.src = "/images/common/default.jpg";
var cxt1 = c.getContext("2d");
var img1 = new Image();
img1.src = "/images/common/500.jpg";
img1.onload = function(){
  cxt2.drawImage(img2,0,0,40,40,100,100,40,40);
  cxt2.drawImage(img1,0,0,500,500,0,0,500,500);
  var image = c.toDataURL("image/png");
  var fbwImg   = document.createElement("img");
  fbwImg.src = image;
  $('.creatcanvas').append(c);
  $('.canvas-box').append(fbwImg);
}