var pHome = avalon.define({
  $id:'pHome',
  init:function () {
    var calbk1 = function (data) {
      console.log(data);
    }
    GetData.getAjax('/home/wealth/member',{},calbk1)
  },
  click:function () {
    
  },
  choiceGrad:function () {
    $(this).addClass('active');
  }
});
pHome.init();


