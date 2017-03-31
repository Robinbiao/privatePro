var pLoan = avalon.define({
    $id:'pLoan',
    htmlsrc:'loanPipe',
    init:function(){
        var callback = function (data) {
            if(data.code === 1000){
                
            }
        }
        GetData.getAjax('/home/wealth/personalinfo',{},callback);
    },
    channeltog:function(src){
        pLoan.htmlsrc = 'loan' + src;
        $(this).siblings('li').removeClass('active');
        $(this).addClass('active');
    }
});
pLoan.init();