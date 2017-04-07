var pArticledetial = avalon.define({
    $id:'pArticledetial',
    currentPage:'loan',
    pageId:'',
    newsData:'',
    init:function(){
        var type = window.location.search.toString().split('=')[1];
        var callback = function (data) {
            if(data.code === 1000){
                pArticledetial.newsData = data.data;
            }
        }
        GetData.getAjax('/home/wealth/up_card_info',{'id':type},callback,{type:'POST'});
    }
});
pArticledetial.init();