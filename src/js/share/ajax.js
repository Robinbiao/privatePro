(function () {
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
          params:params,
          type:opt.type,
          dataType:'json',
          timeout:opt.timeout,
          success:function (data) {
             callback(data);
          }
        })
    }
  })
})();