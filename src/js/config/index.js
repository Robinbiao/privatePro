var pHome = avalon.define({
  $id:'pHome',
  buyGrade:1,
  currentGrade:1,
  currentPage:'index',
  gradename:'VIP会员',
  newMsg:{},
  step1:{
    show:false,
    step2:{
      show1:false,
      show2:false
    }
  },
  step2:{
    show:false,
    step2:{
      show1:false,
      show2:false
    }
  },
  step3:{
    show:false,
    step2:{
      show1:false,
      show2:false
    }
  },
  step4:{
    show:false,
    step2:{
      show1:false,
      show2:false
    }
  },
  toggleCollect:true,
  lastMsgList:[],
  memberIntro:[],
  learnList:{
    weixin:'',
    qianliao:''
  },
  stepName1:'',
  stepName2:'',
  init:function () {
    var callback = function (data) {
        if(data.code === 1000){
            pHome.currentGrade = data.data.grade;
            pHome.memberIntro = data.data.member;
            if(data.data.collection==0){
              $('.collection').css('display','flex');
            }
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
    var initInfo = getCookie('initInfo');
    if(!initInfo){
      document.cookie = 'initInfo=true; Expires=1000';
    }else{
      $('.init-info').css('display','none');
    };
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
    var callbackLearn = function(data){
        if(data.code === 1000){
          pHome.learnList.weixin = data.wechat_learn.url;
          pHome.learnList.qianliao = data.data.url;
        }
    };
    GetData.getAjax('/home/wealth/learn',{},callbackLearn);
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
  },
  step1Tog:function(index){
    var step = 'step'+index;
    pHome.stepName1 = $(this).text();
    pHome[step].show = !pHome[step].show;
    if(pHome[step].show){
      for(var i = 1; i < 5; i++){
        var closeStep = 'step' + i;
        if(i != index){
          pHome[closeStep].show = false;
          pHome[closeStep].step2.show1 = false;
          pHome[closeStep].step2.show2 = false;
        }
      }
    }
  },
  step2Tog:function(par,index){
    pHome.stepName2 = $(this).text();
    var step = 'step' + par;
    var show = 'show' + index;
    if(index == 2){
      pHome[step].step2.show1 = false;
    }else if(index == 1){
      pHome[step].step2.show2 = false;
    };
    pHome[step].step2[show] = !pHome[step].step2[show];
  },
  nextInfo:function(){
    pHome.toggleCollect = false;
    $("#city").citySelect({
        prov:'湖南',
        nodata:"none"
    });
  },
  getUserInfo:function(){
      $('.sure .tips').css('display','block');
      if(!$('[name = "name"]').val()){
          $('.sure .tips span').text('请输入您的姓名');
          return
      }else if(!$('[name = "telphone"]').val()){
          $('.sure .tips span').text('请输入您的手机号码');
          return
      }
      if(!(/^1[34578]\d{9}$/.test($('[name = "telphone"]').val()))){
          $('.sure .tips span').text('请输入正确的手机号码');
          return
      }
      $('.sure .tips').css('display','none');
      var inform = $('#infoform').serializeArray();
      var params = {};
      $.each(inform,function(){
          params[this.name] = this.value;
      });

      params.step1 = pHome.stepName1;
      params.step2 = pHome.stepName2;
      var setback = function(data){
          if(data.code===1000){
  
              $('.collection').css('display','none'); 
          };

      }
      GetData.getAjax('/home/wealth/data_collection',params,setback,{type:'POST'});
  },
  learnShow:function(){
    $(this).find('.learn').css('display','block');
  },
  buyMember:function(index){
    if(pHome.currentGrade==1){

    }
    if(index >= pHome.currentGrade){
      window.location.href = './buydetail.html?grade='+ (index+1);
    }
  }
});
function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
    else
    return null;
}



