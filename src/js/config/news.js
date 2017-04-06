var pNews = avalon.define({
    $id:'pNews',
    currentPage:'news',
    newsData:[],
    init:function(){
        var callback = function (data) {
            if(data.code === 1000){
                pNews.newsData = data.data.list;
            }
        }
        GetData.getAjax('/home/wealth/news',{},callback);
    }
});
pNews.init();