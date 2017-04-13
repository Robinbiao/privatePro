var pLoan = avalon.define({
    $id:'pLoan',
    htmlsrc:'loanPipe',
    currentPage:'loan',
    currentGrade:'',
    pipeDataList:[],
    cardDataList:[],
    newDataList:[],
    init:function(){
        if(getCookie('currentroter')){
            pLoan.htmlsrc = getCookie('currentroter');
        }
        var callbackPipe = function (data) {
            if(data.code === 1000){
                pLoan.pipeDataList = data.data;
            }
        }
        GetData.getAjax('/home/wealth/loanlist',{},callbackPipe);
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
        var callbackGrade = function (data) {
            if(data.code === 1000){
                pLoan.currentGrade = data.data.grade;
            }
        }
        GetData.getAjax('/home/wealth/member',{},callbackGrade);

    },
    channeltog:function(src){
        pLoan.htmlsrc = 'loan' + src;
        // $(this).siblings('li').removeClass('active');
        // $(this).addClass('active');
    },
    toDetail:function(id,rules,gradename){
        if(!gradename) gradename ='钻石会员';
        if((pLoan.currentGrade-0)<(rules-0)){
            var domstr = '该文章仅 <b>' +gradename+'</b> 查看，去会员中心购买喔！'
            Modal.init({
                callback:function(){
                    window.location.href = './index.html';
                },
                domstr:domstr
            })
        }else{
            window.location.href = './newsdetial.html?id='+ id+'&type=loannew';
        }
        
    }
});
pLoan.$watch('htmlsrc',function(aft,bef){
  console.log(bef);
  console.log(aft);
  document.cookie = 'currentroter='+ aft;
})
pLoan.init();
function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
    else
    return null;
}