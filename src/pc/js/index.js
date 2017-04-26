var pHome = avalon.define({
  $id:'pHome',
  websiteInfo:{
    banks:[]
  },
  init:function () {
    
  }
});
//pHome.init();

$.ajax({
  url:'http://www.examples.xin/home/website/index',
  type:'GET',
  dataType:'json',
  success:function (data) {
    if(data.code==1000){
      pHome.websiteInfo = data.data;
      $('title').text(data.data.seo.title);
      $("meta[name='keywords']").attr('content',data.data.seo.keywords);
      $("meta[name='description']").attr('content',data.data.seo.description);
    };
    setTimeout(function(){bannerInit()},100);
  }
});
function bannerInit(){
  var width = $(window).width();
  $('.banner li').css('width',width);
  var imgNum = $('.banner li').length;
  var current=0;
  $('.banner .box').append($('.banner li').eq(0).clone());
  setInterval(function(){
    current++;
    if(current>imgNum){
      current =1;
      $('.banner .box').css('left',0);
    }
    $('.banner .box').animate({'left':-current*width+'px'}, 800);
  },4000)
}



