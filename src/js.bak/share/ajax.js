(function ($) {
  window.GetData = function () {};
  GetData.extend = jQuery.extend;
  GetData.extend({
    server:'http://www.examples.xin',
    getAjax:function (url,params,callback,options) {
        var df = {
          type:'GET',
          timeout:10000
        };
        var opt = jQuery.extend({},df,options);
        $.ajax({
          url:GetData.server + url,
          data:params,
          type:opt.type,
          dataType:'json',
          timeout:opt.timeout,
          success:function (data) {
             callback(data);
          }
        })
    }
  });
//模态框开始 
  window.Modal = function () {};
  Modal.extend = jQuery.extend;
  Modal.extend({
      init:function(opts){
          var df = {
            'title':'提醒',
            callback:function(){
              $('.modal').fadeOut('slow', function() {    
              });
            }
          }
          var options = $.extend({},df,opts); 
          var $parent = $('.modal');
          $parent.fadeIn();
          $parent.css('display','flex');
          var $modalBox = $('.modal .modal-box');
          if(options.boxClass){
                $modalBox.addClass(options.boxClass);
          };
          if(!options.chancel){
              $modalBox.find('.chancel').css('display','none');
          };
          $parent.on('click','.close,.chancel',function(e){
              e.preventDefault;
              $parent.fadeOut('slow', function() {    
              });
          });
          $parent.on('click','.sure',function(e){
              e.preventDefault;
              options.callback();
              
          });
          $modalBox.find('.title1').text(options.title);
          $modalBox.find('.bd').html(options.domstr);
      }
  })
})(jQuery);


//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}