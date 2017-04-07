var pArticledetial = avalon.define({
    $id:'pArticledetial',
    currentPage:'news',
    pageId:'',
    newsData:'',
    init:function(){
        var pageId = window.location.search.toString().split('=')[1];
        var callback = function (data) {
            if(data.code === 1000){
                pArticledetial.newsData = data.data;
            }
        }
        var pragams = {'id':pageId};
        GetData.getAjax('/home/wealth/articleinfo/id/'+pageId,{},callback);
    }
});
pArticledetial.init();