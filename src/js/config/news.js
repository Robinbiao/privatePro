var pNews = avalon.define({
    $id:'pNews',
    currentPage:'news',
    newsData:[],
    newMsg:{},
    currentGrade:'',
    lastMsgList:[],
    init:function(){
        var callback = function (data) {
            if(data.code === 1000){
                pNews.newsData = data.data.list;
            }
        }
        GetData.getAjax('/home/wealth/news',{},callback);
        var callbackGrade = function (data) {
            if(data.code === 1000){
                pNews.currentGrade = data.data.grade;
            }
        }
        GetData.getAjax('/home/wealth/member',{},callbackGrade);
        pNews.getMessage();
    },
    toDetail:function(id,rules,gradename){
        if(!gradename) gradename ='钻石会员';
        if((pNews.currentGrade-0)<(rules-0)){
            var domstr = '该文章仅 <b>' +gradename+'</b> 查看，去会员中心购买喔！'
            Modal.init({
                callback:function(){
                    window.location.href = './index.html';
                },
                domstr:domstr
            })
        }else{
            window.location.href = './newsdetial.html?id='+ id+'&type=news';
        }
        
    },
    getMessage:function(num){
        var newback = function (data) {
            if(data.code === 1000){
                pNews.newMsg = data.data; 
                $('.m-message').css('display','flex');  
                $('.m-message .new').css('display','block');
                $('.m-message .last').css('display','none');
            }
        };
        
        var lastback = function (data) {
          if(data.code === 1000){
              pNews.lastMsgList = data.data;
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