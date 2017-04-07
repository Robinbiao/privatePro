var pArticledetial = avalon.define({
    $id:'pArticledetial',
    currentPage:'news',
    pageId:'',
    apiMap:{
        'news':'articleinfo',
        'loannew':'passagewayinfo',
        'loancredit':'up_card_info',
        'loantec':'guidance'
    },
    newsData:'',
    init:function(){
        var id = getUrlParam('id');
        var type = getUrlParam('type');
        var callback = function (data) {
            if(data.code === 1000){
                pArticledetial.newsData = data.data;
            }
        }
        var params ={
            'id':id
        }
        if(type=='loantec'){
            params.type = id;
        }
        GetData.getAjax('/home/wealth/'+pArticledetial.apiMap[type],params,callback);
    }
});
pArticledetial.init();
//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}