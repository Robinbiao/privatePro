var pArticledetial = avalon.define({
    $id:'pArticledetial',
    currentPage:'loan',
    pageId:'',
    newsData:'',
    init:function(){
        var pageId = window.location.search.toString().split('=')[1];
        var callback = function (data) {
            if(data.code === 1000){
                pArticledetial.newsData = data.data;
            }
        }
        GetData.getAjax('/home/wealth/passagewayinfo',{'id':pageId},callback);
    }
});
pArticledetial.init();