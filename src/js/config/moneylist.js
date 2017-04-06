var mapObj = {
    member:'mypartner',
    moneyin:'mypartner',
    moneyout:'mypartner'
}
var pMoneylist = avalon.define({
    $id:'pMoneylist',
    mainTitle:'收入明细',
    currentPage:'center',
    hash:'member',
    listData:[],
    init:function(){
        var hash = window.location.hash.replace('#','');
        var mainTitle;
        if(hash === 'member'){
            mainTitle = '我的会员';
            $('.m-orderlist .order').css('display','none');
            $('.m-orderlist .member').css('display','block');
        }else if(hash === 'moneyin' || hash === 'moneyout'){
            mainTitle = '收入明细';
            $('.m-orderlist .order').css('display','block');
            $('.m-orderlist .member').css('display','none');
            hash === 'moneyin' ? mainTitle = '收入明细' : mainTitle = '提现记录';
        }
        pMoneylist.mainTitle = mainTitle;
        var callback = function (data) {
            if(data.code === 1000){
                pMoneylist.listData = data.data.list;
            }
        }
        GetData.getAjax('/home/wealth/'+ mapObj[hash],{},callback);
    }
});
pMoneylist.init();