var pHome = avalon.define({
  $id:'pHome',
  buyGrade:1,
  init:function () {
    
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




