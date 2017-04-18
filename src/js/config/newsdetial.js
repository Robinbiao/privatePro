var pArticledetial = avalon.define({
    $id:'pArticledetial',
    currentPage:'loan',
    pageId:'',
    apiMap:{
        'news':'articleinfo',//金融资讯接口
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
            }else if(data.code === 2000){
                if(type =='loannew'){  //查看文章须要权限
                    window.location.href = "./index.html";
                }
            }
        }
        var params ={
            'id':id
        }
        if(type=='loantec'){
            params.type = id;
            if(id == 12 || id ==13){//判断详情属于哪个大栏目
                pArticledetial.currentPage ='center';
            }
        }else if(type =='news'){//判断详情属于哪个大栏目
            pArticledetial.currentPage ='news';
        }
        GetData.getAjax('/home/wealth/'+pArticledetial.apiMap[type],params,callback);
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

