var pLoan = avalon.define({
    $id:'pLoan',
    htmlsrc:'loanPipe',
    currentPage:'loan',
    currentGrade:'',
    pipeDataList:[],
    cardDataList:[],
    newDataList:[],
    page:0,
    study:{},
    newMsg:{},
    lastMsgList:[],
    init:function(){
        if(getCookie('currentroter')){
            pLoan.htmlsrc = getCookie('currentroter');
        }
        var callbackPipe = function (data) {
            if(data.code === 1000){
                pLoan.pipeDataList = data.data;
            }else{
                var domstr = '请升级会员！';
                Modal.init({
                    callback:function(){
                        window.location.href = './index.html';
                    },
                    domstr:domstr
                })
            }
        }
        GetData.getAjax('/home/wealth/loanlist',{},callbackPipe);
        var callbackCard = function (data) {
            if(data.code === 1000){
                pLoan.cardDataList = data.data;
            }else{
                var domstr = '请升级会员！';
                Modal.init({
                    callback:function(){
                        window.location.href = './index.html';
                    },
                    domstr:domstr
                })
            }
        }
        GetData.getAjax('/home/wealth/creditlist',{},callbackCard);
        var callbackStudy = function (data) {
            if(data.code === 1000){
                pLoan.study = data.data;
            }else{
                var domstr = '请升级会员！';
                Modal.init({
                    callback:function(){
                        window.location.href = './index.html';
                    },
                    domstr:domstr
                })
            }
        }
        GetData.getAjax('/home/wealth/learn',{},callbackStudy);
        var callbackGrade = function (data) {
            if(data.code === 1000){
                pLoan.currentGrade = data.data.grade;
            }
        }
        GetData.getAjax('/home/wealth/member',{},callbackGrade);
        var imgwidth = $('.banner img').width();
        var timer;
        if(!timer){
            timer=setInterval(function(){
                    if($('.banner').hasClass('ban1')){
                        $('.banner').css('left',0);
                        $('.banner').animate({'left':'-' + imgwidth + 'px'},600);
                        $('.banner').removeClass('ban1');
                    }else{
                        $('.banner').addClass('ban1');
                        $('.banner').animate({'left':'-' + imgwidth*2 + 'px'},600);
                    };
                }, 4000);
        }
        
       pLoan.getMessage();
    },
    newmore:function(){
        if(pLoan.htmlsrc =='loanNew'){
            $('.morebox').dropload({
                scrollArea : window,
                loadDownFn : function(me){
                    pLoan.page ++
                    var callbackNew = function (data) {
                        if(data.code === 1000){
                            pLoan.newDataList =pLoan.newDataList.concat(data.data.list) ;
                        }else if(data.code === 2000){
                            var domstr = '请升级会员！';
                            Modal.init({
                                callback:function(){
                                    window.location.href = './index.html';
                                },
                                domstr:domstr
                            })
                        }else if(data.code === 1001) {
                            alert('没有更多数据了！');
                        }
                        setTimeout(function(){
                            me.resetload();
                        },1000);
                    }
                    GetData.getAjax('/home/wealth/passageway',{page:pLoan.page},callbackNew);
                }
            });
        }
    },
    channeltog:function(src){
        pLoan.htmlsrc = 'loan' + src;
        // $(this).siblings('li').removeClass('active');
        // $(this).addClass('active');
    },
    toDetail:function(id,rules,gradename){
        if(!gradename) gradename ='钻石会员';
        if((pLoan.currentGrade-0)<(rules-0)){
            var domstr = '该文章仅 <b>' +gradename+'</b> 查看，去会员中心购买喔！'
            Modal.init({
                callback:function(){
                    window.location.href = './index.html';
                },
                domstr:domstr
            })
        }else{
            window.location.href = './newsdetial.html?id='+ id+'&type=loannew';
        }
        
    },
    getMessage:function(num){
        var newback = function (data) {
            if(data.code === 1000){
                pLoan.newMsg = data.data; 
                $('.m-message').css('display','flex');  
                $('.m-message .new').css('display','block');
                $('.m-message .last').css('display','none');
            }else if(data.code==1111){
                window.location.href = './center.html';
            }
        };
        
        var lastback = function (data) {
          if(data.code === 1000){
              pLoan.lastMsgList = data.data;
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
pLoan.$watch('htmlsrc',function(aft,bef){
  document.cookie = 'currentroter='+ aft;
});
function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
    else
    return null;
}