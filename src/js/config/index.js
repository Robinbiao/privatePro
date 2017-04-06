var pHome = avalon.define({
  $id:'pHome',
  buyGrade:1,
  currentGrade:1,
  init:function () {
    var callback = function (data) {
        if(data.code === 1000){
            //pHome.currentGrade = data.data.grade;
            addActive('.flex .item',pHome.currentGrade);
        }
    }
    GetData.getAjax('/home/wealth/member',{},callback);
  },
  next:function () {
    window.location.href = './views/buydetail.html?grade='+pHome.buyGrade;
  },
  choiceGrad:function (grade) {
    pHome.buyGrade = grade;
    if(grade<pHome.currentGrade) return;
    $(this).siblings('p').removeClass('active');
    addActive('.flex .item',grade);
  }
});
pHome.init();

function addActive(dom,grade){
  $dom = $(dom);
  if(grade === 1){
    $dom.eq(0).addClass('active');
  }else if(grade === 2){
    $dom.eq(0).addClass('active');
    $dom.eq(1).addClass('active');
  }else if(grade === 3){
    $dom.eq(0).addClass('active');
    $dom.eq(1).addClass('active');
    $dom.eq(2).addClass('active');
  }else{
    console.log('best')
  }
}


