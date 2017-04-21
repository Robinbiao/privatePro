var pHome = avalon.define({
  $id:'pHome',
  buyGrade:1,
  currentGrade:1,
  currentPage:'index',
  gradename:'VIP会员',
  newMsg:{},
  lastMsgList:[],
  init:function () {
    var callback = function (data) {
        if(data.code === 1000){
            pHome.currentGrade = data.data.grade;
            pHome.gradename = data.data.member[pHome.currentGrade-1].name;
            $('.flex .item').eq(pHome.currentGrade-1).addClass('active');
        }
    }
    GetData.getAjax('/home/wealth/member',{},callback);
    if(pHome.currentGrade ==3){
      Modal.init({
        domstr:'恭喜您已成为顶级会员，去发展更多的会员喔！',
        callback:function(){
          window.location.href = './center.html';
        }
      })
    };
    
    pHome.getMessage();
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
    $(this).addClass('active');
    //addActive('.flex .item',grade);
  },
  getMessage:function(num){
    
    var newback = function (data) {
        if(data.code === 1000){
            pHome.newMsg = data.data; 
            $('.m-message').css('display','flex');  
            $('.m-message .new').css('display','block');
            $('.m-message .last').css('display','none');
        }
    };
    
    var lastback = function (data) {
      if(data.code === 1000){
          pHome.lastMsgList = data.data;
          $('.m-message').css('display','flex');
          $('.m-message .last').css('display','block');
          $('.m-message .new').css('display','none');
      }
    };
    if(num==1){ //右侧小tips进来
      GetData.getAjax('/home/wealth/noticelist',{},lastback);
    }else{
      GetData.getAjax('/home/wealth/getnotice',{},newback);
    };
    $('.m-message').on('click','.ft .sure',function(){
        $('.m-message').fadeOut();
    });
  }
});



