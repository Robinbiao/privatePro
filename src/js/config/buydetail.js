var pBuydetail = avalon.define({
    $id:'pBuydetail',
    grade:1,
    name:'VIP会员',
    spec:'',
    price:98,
    init:function(){
        pBuydetail.grade = window.location.search.toString().split('=')[1];
        console.log(pBuydetail.grade);
        var callback = function (data) {
            if(data.code === 1000){
                pBuydetail.spec = data.data.member[pBuydetail.grade-1].spec;
                pBuydetail.price = data.data.member[pBuydetail.grade-1].price;
            }
        }
        GetData.getAjax('/home/wealth/member',{},callback);
    }
})
pBuydetail.init();