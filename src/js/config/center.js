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
    modalB:false,
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
        pCenter.modalB = !pCenter.modalB;
        var domstr = '<div class="form-group clearfix">'
                     +'<p class="tips">可用余额：'+pCenter.money+'</p>'
                     +'<label for="takemoney" class="pholder">请输入提款金额:</label>'
                     +'<div class="colsm"><input  class="form-control" id="takemoney">'
                     +'</div></div><p class="warning">提示：最小提额至少100元整</p>';
        if(pCenter.modalB){
            Modal.init({
                title:'提取现金',
                boxClass:'monqrcode',
                callback:function(){
                    var takemoney = $('#takemoney').val() - 0;
                    $warning = $('.modal-box .bd .warning')
                    if(takemoney>pCenter.money){
                        $warning.text('提示：您输入的金额大于可提金额,请重新输入');
                        return;
                    }
                    if(takemoney<100){
                        $warning.text('提示：最小提额至少100元整');
                        return;
                    }
                    var cashback = function(data){
                        $warning.text(data.msg);
                        $('.modal').on('click','.sure',function(e){
                            $('.modal').fadeOut();
                        })
                        if(data.code == 1000){
                            $('.monqrcode .bd').html("<img src ='www.examples.xin/"+data.data[0].path+"/>");
                        }
                    }
                    GetData.getAjax('/home/wealth/drawcash',{'money':takemoney},cashback);
                },
                domstr:domstr
            });
        }else{
            $('.modal').css('display','flex');
        }
        
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
