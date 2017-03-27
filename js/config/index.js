console.log($(document).height()+':'+window.screen.height + ':'+window.devicePixelRatio);
$('.doc-height').html($(document).height()+':'+window.screen.height);
// var qrcode = new QRCode(document.getElementById("qrcode"), {
//   text: 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=js%E7%94%9F%E6%88%90%E4%BA%8C%E7%BB%B4%E7%A0%81&oq=qrcode.js',
//   width: 256,
//   height: 256,
//   colorDark : '#000000',
//   colorLight : '#ffffff',
//   correctLevel : QRCode.CorrectLevel.H
// });



function f1(){
    var n=999;
  function f2(){
   // alert(n);
  }
  return f2;
}
var result=f1();
result(); // 999
function test() {
  console.log(foo);
  console.log(bar);

  var foo = 'Hello';
  console.log(foo);
  var bar = function () {
    return 'world';
  }

  function foo() {
    return 'hello';
  }
}

test();


$("#qrcode").qrcode({
  text: 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=js%E7%94%9F%E6%88%90%E4%BA%8C%E7%BB%B4%E7%A0%81&oq=qrcode.js',
  width: 256,
  height: 256,
  colorDark : '#000000',
  colorLight : '#ffffff',
  correctLevel : QRCode.CorrectLevel.H
})
$.ajax({
  url:'views/gard1.html',
  type:'GET',
  success:function (data) {
    $('.grad-box').append(data);
  }
})