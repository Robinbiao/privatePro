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

var obj =
{    code:1000,
    message:'success',
    data:{
      grade:1,
      price:99,
      memberlist:[
        {},{},{}
      ]
    }
}



