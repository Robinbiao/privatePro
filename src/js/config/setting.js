var pSetting = avalon.define({
    $id:'pSetting',
    blSrc:true,
    imgurl:'',
    currentPage:'center',
    init:function(){
        var callback = function (data) {
            if(data.code === 1000){
                pSetting.imgurl = data.data.img_url;
                if(data.data.isshow){
                    pSetting.blSrc = true;
                }else{
                    pSetting.blSrc = false;
                }
                $('[name=tel]').val(data.data.phone);
                $('[name=addr]').val(data.data.address);
                $('[name=job]').val(data.data.job);
            }
        }
        GetData.getAjax('/home/wealth/personalinfo',{},callback);
    },
    save:function(){
        var saveParm = {};
        var callback = function(data){
            if(data.code === 1000){
                Modal.init({
                    callback:function(){
                        window.location.href = './center.html';
                    },
                    domstr:'恭喜您，修改成功！'
                })
                
            }
        }
        saveParm.phone = $('[name=tel]').val();
        saveParm.address = $('[name=addr]').val();
        saveParm.job = $('[name=job]').val();
        pSetting.blSrc ? saveParm.isshow = 1 : saveParm.isshow = 0 ;
        GetData.getAjax('/home/wealth/changeinfo',saveParm,callback,{type:'POST'});
    },
    toggleBl:function(){
        pSetting.blSrc = !pSetting.blSrc;
    }
});
pSetting.init();