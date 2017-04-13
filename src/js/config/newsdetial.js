var pArticledetial = avalon.define({
    $id:'pArticledetial',
    currentPage:'loan',
    pageId:'',
    apiMap:{
        'news':'articleinfo',//金融资讯接口
        'loannew':'passagewayinfo',//最新通道接口
        'loancredit':'up_card_info',//信用卡提额接口
        'loantec':'guidance'//贷款中心技术专区
    },
    newsData:'',
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
    }
});
pArticledetial.init();
