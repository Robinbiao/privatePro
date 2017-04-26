var pArticledetial = avalon.define({
    $id:'pArticledetial',
    currentPage:'loan',
    pageId:'',
    apiMap:{
        'news':'articleinfo',//技术指导接口
        'loannew':'passagewayinfo',//最新通道接口
        'loancredit':'up_card_info',//信用卡提额接口
        'loantec':'guidance',//贷款中心技术专区
        'loanstrategy':'loaninfo'//贷款中心查看攻略
    },
    newsData:'',
    newMsg:{},
    lastMsgList:[],    
    init:function(){
        var id = getUrlParam('id');
        var type = getUrlParam('type');
        var callback = function (data) {
            if(data.code === 1000){
                pArticledetial.newsData = data.data;
                 if(type == 'copration'){
                    var imgurl = '//www.examples.xin/'+data.data;
                    if(id ==12){
                        mainTitle ='提额神器';
                        $('body .content').html("<img src='"+imgurl+"' />");
                    }else if(id == 14){
                        mainTitle ='代理合作';
                        //改成图片
                        $('body .content').html("<img src='"+imgurl+"' />");       
                    }
                 }
            }else if(data.code === 2000){
                if(type =='loannew' || type == 'news'){  //查看文章须要权限
                    window.location.href = "./index.html";
                }
            }
        }
        var params ={
            'id':id
        }
        var mainTitle ='';
        if(type=='loantec' ||type =='copration'){
            params.type = id;
            mainTitle ='技术指南图文详情';
        }else if(type =='news'){//判断详情属于哪个大栏目
            pArticledetial.currentPage ='news';
            mainTitle ='技术指导图文详情';
        };
        
        if(type == 'copration'){
            if(id == 12 ||id==14){//判断详情属于哪个大栏目
                pArticledetial.currentPage ='center';
                if(id ==12){
                    GetData.getAjax('/home/wealth/getpicture/type/3',params,callback);
                }else if(id == 14){
                    GetData.getAjax('/home/wealth/getpicture/type/4',params,callback);     
                }
                $('body').addClass('pic-body');
                $('title').text(mainTitle);
            }else{
                GetData.getAjax('/home/wealth/guidance/type/14',params,callback);
            }
        }else{
            GetData.getAjax('/home/wealth/'+pArticledetial.apiMap[type],params,callback);
        };
        $('title').text(mainTitle);
        var imgwidth = $('.banner img').width();
        setInterval(function(){
            if($('.banner').hasClass('ban1')){
                $('.banner').css('left',-imgwidth);
                $('.banner').removeClass('ban1');
            }else{
                $('.banner').addClass('ban1');
                $('.banner').css('left',0);
            };
        }, 4000);
        pArticledetial.getMessage();
    },
    getMessage:function(num){
        var newback = function (data) {
            if(data.code === 1000){
                pArticledetial.newMsg = data.data; 
                $('.m-message').css('display','flex');  
                $('.m-message .new').css('display','block');
                $('.m-message .last').css('display','none');
            }
        };
        
        var lastback = function (data) {
          if(data.code === 1000){
              pArticledetial.lastMsgList = data.data;
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

