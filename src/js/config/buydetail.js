var pBuydetail = avalon.define({
    $id:'pBuydetail',
    gradeTo:3,
    name:'VIP会员',
    spec:'',
    price:98,
    init:function(){
        var gradeTo = getUrlParam('grade');
        pBuydetail.gradeTo = gradeTo;
        var callback = function (data) {
            if(data.code === 1000){
                var currentGrade = data.data.grade;
                var gradelist = data.data.member;
                pBuydetail.spec = gradelist[pBuydetail.gradeTo-1].spec;
                pBuydetail.name = gradelist[pBuydetail.gradeTo-1].name;
                pBuydetail.price = gradelist[pBuydetail.gradeTo-1].price-gradelist[currentGrade-1].price; 
            }
        }
        GetData.getAjax('/home/wealth/member',{},callback);
    },
    readProtocol:function(){
        //console.log(111);
        Modal.init({
            title:'用户使用服务协议',
            domstr:'这是我司相关用户使用协议这是我司相关用户使用协议这是我司相关用户使协'
        })
    },
    buy:function(){
        if(!$("[name='agree']").is(':checked')){
            Modal.init({
                domstr:'用户使用服务协议未勾选',
                callback:function(){
                    $('.modal').fadeOut();
                }
            });
            return;
        }
        var params ={
            grade:pBuydetail.gradeTo,
            money:pBuydetail.price
        }
        var payback = function(data){
            var modalParams ={
                domstr:data.msg
            }
            if(data.code===1000){
                modalParams.callback=function(){
                    window.location.href = './center.html';
                }  
            };
            Modal.init(modalParams);
        }
        GetData.getAjax('/home/wealth/paymoney',params,payback,{type:'POST'});
    }
})
pBuydetail.init();