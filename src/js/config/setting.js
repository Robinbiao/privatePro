var pSetting = avalon.define({
    $id:'pSetting',
    blSrc:true,
    imgurl:'',
    currentPage:'center',
    init:function(){
        var callback = function (data) {
            if(data.code === 1000){
                pSetting.imgurl = data.data.img_url;
            }
        }
        GetData.getAjax('/home/wealth/personalinfo',{},callback);
    },
    save:function(){
        var saveParm = {};
        var callback = function(data){
            if(data.code === 1000){
                window.location.href = './center.html'
            }
        }
        saveParm.phone = $('[name=tel]').val();
        saveParm.address = $('[name=addr]').val();
        saveParm.job = $('[name=job]').val();
        pSetting.blSrc ? saveParm.isShow = 1 : saveParm.isShow = 0 ;
        GetData.getAjax('/home/wealth/changeinfo',saveParm,callback,{type:'POST'});
    },
    toggleBl:function(){
        pSetting.blSrc = !pSetting.blSrc;
    }
});
pSetting.init();