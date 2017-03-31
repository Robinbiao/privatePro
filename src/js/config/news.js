var pNews = avalon.define({
    $id:'pNews',
    init:function(){
        var callback = function (data) {
            if(data.code === 1000){
                
            }
        }
        GetData.getAjax('/home/wealth/personalinfo',{},callback);
    }
});
pNews.init();