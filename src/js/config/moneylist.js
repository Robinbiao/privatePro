var mapObj = {
    member:'mypartner',
    moneyin:'income',
    moneyout:'cashlist',
    myqrcode:'myqrcode'
}
var pMoneylist = avalon.define({
    $id:'pMoneylist',
    mainTitle:'收入明细',
    currentPage:'center',
    hash:'member',
    listData:[],
    init:function(){
        var hash = window.location.hash.replace('#','');
        pMoneylist.hash = hash;
        var mainTitle;
        if(hash === 'member'){
            mainTitle = '我的会员';
        }else if(hash === 'moneyin' || hash === 'moneyout'){
            hash === 'moneyin' ? mainTitle = '收入明细' : mainTitle = '提现记录';
        }else if(hash === 'myqrcode'){
            mainTitle = '我的赚钱二维码';
        }else if(hash === 'service'){
            mainTitle = '客服中心';
            $('.content').html('<img src="./images/qrservice.png" class="qrimg"/>');
        }
        pMoneylist.mainTitle = mainTitle;
        $('title').text(mainTitle);
        var callback = function (data) {
            if(data.code === 1000){
                if(hash === 'myqrcode'){
                    var imgurl ='//www.examples.xin/'+data.data;
                    var imgstr = '<img src="'+imgurl+'" class="qrimg"/>'
                    $('.content').html(imgstr);
                }else{
                    pMoneylist.listData = data.data;
                }
                
            }
        }
        GetData.getAjax('/home/wealth/'+ mapObj[hash],{},callback);
    }
});
pMoneylist.init();