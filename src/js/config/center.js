var pCenter = avalon.define({
    $id:'pCenter',
    imgurl:'',
    name:'暂无',
    money:'100.00',
    recommend:'0001',
    regtime:'2017-01-01',
    myleader:'乾坤财富',
    gradename:'VIP会员',
    currentPage:'center',
    newMsg:{},
    lastMsgList:[],
    init:function(){
        var callback = function (data) {
            if(data.code === 1000){
                console.log(data);
                pCenter.imgurl = data.data.img_url;
                pCenter.name = data.data.name;
                pCenter.money = data.data.money;
                pCenter.imgurl = data.data.img_url;
                pCenter.recommend = data.data.recommend;
                pCenter.regtime = data.data.register_time;
                pCenter.myleader = data.data.p_name;
                pCenter.gradename = data.data.grade_name;
            }
        }
        GetData.getAjax('/home/wealth/personalinfo',{},callback);
        pCenter.getMessage();
    },
    take:function(){
        var domstr = '<img src="./images/moneyservice.jpg"/>';
        Modal.init({
            title:'联系客服',
            callback:function(){
                $('.modal').on('click','.sure',function(e){
                    $('.modal').fadeOut();
                })
            },
            domstr:domstr,
            boxClass:'monqrcode',
            chancel:false
        });
    },
    getMessage:function(num){
        var newback = function (data) {
            if(data.code === 1000){
                pCenter.newMsg = data.data; 
                $('.m-message').css('display','flex');  
                $('.m-message .new').css('display','block');
                $('.m-message .last').css('display','none');
            }
        };
        
        var lastback = function (data) {
          if(data.code === 1000){
              pCenter.lastMsgList = data.data;
              $('.m-message').css('display','flex');
              $('.m-message .last').css('display','block');
              $('.m-message .new').css('display','none');
          }
        };
        if(num==1){ //右侧小tips进来
          GetData.getAjax('/home/wealth/noticelist',{},lastback);
        }else{
          GetData.getAjax('/home/wealth/getnotice',{},newback);
        };
        $('.m-message').on('click','.ft .sure',function(){
            $('.m-message').fadeOut();
        });
    }
});
pCenter.init();
