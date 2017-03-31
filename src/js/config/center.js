var pCenter = avalon.define({
    $id:'pCenter',
    imgurl:'',
    name:'暂无',
    money:'100.00',
    reccode:'0001',
    regtime:'2017-01-01',
    myleader:'乾坤财富',
    gradename:'VIP会员',
    currentPage:'center',
    init:function(){
        var callback = function (data) {
            if(data.code === 1000){
                console.log(data);
                pCenter.imgurl = data.data.img_url;
                pCenter.name = data.data.name;
                pCenter.money = data.data.money;
                pCenter.imgurl = data.data.img_url;
                pCenter.regtime = data.data.register_time;
                pCenter.myleader = data.data.p_name;
                pCenter.gradename = data.data.grade_name;
            }
        }
        GetData.getAjax('/home/wealth/personalinfo',{},callback);
    }
});
pCenter.init();