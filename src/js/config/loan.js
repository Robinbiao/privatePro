var pLoan = avalon.define({
    $id:'pLoan',
    htmlsrc:'loanPipe',
    currentPage:'loan',
    pipeDataList:[],
    cardDataList:[],
    newDataList:[],
    init:function(){
        var callback = function (data) {
            if(data.code === 1000){
                pLoan.pipeDataList = data.data;
            }
        }
        GetData.getAjax('/home/wealth/loanlist',{},callback);
        var callbackCard = function (data) {
            if(data.code === 1000){
                pLoan.cardDataList = data.data;
            }
        }
        GetData.getAjax('/home/wealth/creditlist',{},callbackCard);
        var callbackNew = function (data) {
            if(data.code === 1000){
                pLoan.newDataList = data.data;
            }
        }
        GetData.getAjax('/home/wealth/passageway',{},callbackNew);
    },
    channeltog:function(src){
        pLoan.htmlsrc = 'loan' + src;
        $(this).siblings('li').removeClass('active');
        $(this).addClass('active');
    }
});
pLoan.$watch('htmlsrc',function(aft,bef){
  console.log(bef);
  console.log(aft);
})
pLoan.init();