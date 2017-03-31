var pHome = avalon.define({
  $id:'pHome',
  buyGrade:1,
  init:function () {
    var callback = function (data) {
        if(data.code === 1000){
            
        }
    }
    GetData.getAjax('/home/wealth/member',{},callback);
  },
  next:function () {
    window.location.href = './views/buydetail.html?grade='+pHome.buyGrade;
  },
  choiceGrad:function (grade) {
    pHome.buyGrade = grade;
    $(this).siblings('p').removeClass('active');
    $(this).addClass('active');
  }
});
pHome.init();




