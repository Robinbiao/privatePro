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
            console.log(data.data.grade);
            if(data.data.guanzhu == 0){
                //window.location.href='weixin://profile/gh_dc395f49d95a';
                window.location.href='https://mp.weixin.qq.com/s?__biz=MzI4NzYwNzQ5NA==&mid=2247483665&idx=1&sn=edc0a579cb76f4e0e187a689db36263f&chksm=ebca5eb8dcbdd7ae30699b0a8748c568f2e1d17b9eb0f0d8a703eb1e371db9b2bf25d1fd8d4a#rd';
            }
            if(data.data.grade!=0){
              pHome.gradename = data.data.member[pHome.currentGrade-1].name;
              $('.flex .item').eq(pHome.currentGrade-1).addClass('active');
            }else{
              Modal.init({
                title:'提醒',
                boxClass:'introbox',
                domstr:'<img src="./images/intromem.jpg" alt=""/><p class="close">X</p>'
              });
            }
        }
    }
    var imgwidth = $('.banner img').width();
        setInterval(function(){
            if($('.banner').hasClass('ban1')){
                $('.banner').css('left',0);
                $('.banner').animate({'left':'-' + imgwidth + 'px'},600);
                $('.banner').removeClass('ban1');
            }else{
                $('.banner').addClass('ban1');
                $('.banner').animate({'left':'-' + imgwidth*2 + 'px'},600);
            };
        }, 4000);
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
        });
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



