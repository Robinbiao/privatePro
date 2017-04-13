var pHome = avalon.define({
  $id:'pHome',
  buyGrade:1,
  currentGrade:1,
  currentPage:'index',
  gradename:'钻石会员',
  init:function () {
    var callback = function (data) {
        if(data.code === 1000){
            pHome.currentGrade = data.data.grade;
            pHome.gradename = data.data.member[pHome.currentGrade-1].name;
            addActive('.flex .item',pHome.currentGrade);
        }
    }
    GetData.getAjax('/home/wealth/member',{},callback);
  },
  next:function () {

    if(pHome.buyGrade<=pHome.currentGrade){
      var domstr = '您已是 '+pHome.gradename+'，请购买更高等级会员喔！！！'
      Modal.init({
        title:'提醒',
        domstr:domstr
      })
    }else{
      if(pHome.currentGrade == 3){
        Modal.init({
          title:'提醒',
          domstr:'恭喜您已成为顶级会员，去发展更多的会员喔！'
        })
      }else{
        window.location.href = './buydetail.html?grade='+pHome.buyGrade;
      }
    }
    
    
  },
  choiceGrade:function (grade) {
    if(grade<pHome.currentGrade) return;
    pHome.buyGrade = grade;
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


